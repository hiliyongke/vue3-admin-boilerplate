/*
 * @Author: littleHiuman
 * @Date: 2020-11-27 12:06:50
 * @LastEditTime: 2022-03-27 20:01:04
 * @LastEditors: littleHiuman
 * @Description: 根据swagger生成配置文件
 */
import http from 'http';
import https from 'https';
import utils from './utils';

const argv = process.argv.slice(2);
const { checkArgv, isHttps, calculateObj, folderObj } = utils;

interface SuccessCallbackResult {
  url: string;
  parsedData: any;
}

// 处理返回
function requestHandle(
  url: string,
  res: http.IncomingMessage,
  successCb?: (result: SuccessCallbackResult) => void,
  errorCb?: () => void
): void {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];
  let error: Error | undefined;
  let rawData = '';

  // 任何 2xx 状态码都表示成功的响应，但是这里只检查 200。
  if (statusCode !== 200) {
    error = new Error(`请求失败\n状态码: ${statusCode}`);
  } else if (!contentType || !/^application\/json/.test(contentType)) {
    error = new Error(
      '无效的 content-type.\n' +
        `期望的是 application/json 但接收到的是 ${contentType}`
    );
  }
  if (error) {
    if (errorCb) {
      errorCb();
    } else {
      console.error(`出现错误: ${error.message}`);
      // 消费响应的数据来释放内存。
      res.resume();
    }
    return;
  }

  res.setEncoding('utf8');
  res.on('data', chunk => {
    rawData += chunk;
  });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      if (successCb) {
        successCb({ url, parsedData });
      }
    } catch (e: any) {
      console.error(`出现错误: ${e.message}`);
    }
  });
}

// 发起请求
function httpGet(
  url: string,
  sussCb: (result: SuccessCallbackResult) => void,
  errorCb?: () => void
): void {
  const isHttpsRes = isHttps(url);
  const requestModule = isHttpsRes ? https : http;

  requestModule
    .get(url, res => {
      requestHandle(url, res, sussCb, errorCb);
    })
    .on('error', (e: Error) => {
      console.error(`出现错误: ${e.message}`);
    });
}

// 开始~
const { ips, excludes, includes } = checkArgv(argv);

// 计算入口
function calculatePaths(parsedData: any, url: string, i: number): void {
  const allInfo = calculateObj.calcUrl(
    parsedData.paths,
    parsedData.definitions,
    excludes || [],
    includes || []
  );
  let infoTitle = '';

  if (parsedData.info && parsedData.info.title) {
    infoTitle = parsedData.info.title;
  }
  const info = { title: infoTitle, host: url };

  const fileInfo = calculateObj.calcText(allInfo, info);

  folderObj.writeFile(fileInfo, info, i);
}

// 开始获取资源
function getResources(url: string, i: number, errorCallback?: () => void): void {
  httpGet(
    url,
    res => {
      const { parsedData: data } = res;
      if (typeof data === 'object' && data !== null) {
        calculatePaths(data, url, i);
      } else if (Array.isArray(data) && data.length) {
        for (const element of data) {
          if (element.location) {
            const secUrl = `${url}${element.location}`;
            httpGet(secUrl, ({ parsedData }) => {
              calculatePaths(parsedData, url, i);
            });
          }
        }
      }
    },
    errorCallback
  );
}

for (let i = 0; i < ips.length; i++) {
  const ip = ips[i];
  const url = `${ip}/swagger-resources`;
  const url2 = `${ip}/api/swagger.json`;

  getResources(url, i, () => {
    getResources(url2, i);
  });
}
