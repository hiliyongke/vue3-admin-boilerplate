/**
 * @description Axios请求配置文件
 * @author 优化版本
 *
 * 主要功能：
 * 1. 配置请求和响应拦截器
 * 2. 统一处理请求参数和响应数据
 * 3. 集成token认证机制
 * 4. 提供错误处理和重试机制
 * 5. 支持请求取消和防重复请求
 */

import { isString, merge } from 'lodash-es';
import type { AxiosTransform, CreateAxiosOptions } from './transform';
import { VAxios } from './axios';
import { joinTimestamp, formatRequestDate, setObjToUrlParams } from './util';
import { TOKEN_NAME } from '@/config/global';
import { handleError } from './handle-error';

/**
 * 请求和响应数据转换配置
 */
const transform: AxiosTransform = {
  /**
   * 响应数据处理钩子
   * @param res 响应对象
   * @param options 请求选项
   * @returns 处理后的数据
   */
  transformRequestHook: (res, options) => {
    const { isTransformResponse, isReturnNativeResponse } = options;

    // 处理无内容响应（204状态码或PUT/PATCH请求）
    const method = res.config.method?.toLowerCase();
    if (res.status === 204 || method === 'put' || method === 'patch') {
      return res;
    }

    // 返回原生响应对象（包含响应头等完整信息）
    if (isReturnNativeResponse) {
      return res;
    }

    // 不进行数据转换，直接返回响应数据
    if (!isTransformResponse) {
      return res.data;
    }

    // 验证响应数据格式
    const { data } = res;
    if (!data) {
      throw new Error('服务器响应数据为空');
    }

    // 解构响应数据（根据后端API格式调整）
    const { code, msg, message } = data as any;
    const errorMessage = msg || message || '未知错误';

    // 判断请求是否成功（根据业务约定调整成功状态码）
    const isSuccess = data && (code === 0 || code === 200);
    if (isSuccess) {
      return data.data || data;
    }

    // 抛出业务错误
    throw new Error(`请求失败: [${code}] ${errorMessage}`);
  },

  // 请求前处理配置
  beforeRequestHook: (config, options) => {
    const { apiUrl, isJoinPrefix, urlPrefix, joinParamsToUrl, formatDate, joinTime = true } = options;

    // 添加接口前缀
    if (isJoinPrefix && urlPrefix && isString(urlPrefix)) {
      config.url = `${urlPrefix}${config.url}`;
    }

    // 将baseUrl拼接
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;

    if (formatDate && data && !isString(data)) {
      formatRequestDate(data);
    }
    if (config.method?.toUpperCase() === 'GET') {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else if (!isString(params)) {
      if (formatDate) {
        formatRequestDate(params);
      }
      if (
        Reflect.has(config, 'data') &&
        config.data &&
        (Object.keys(config.data).length > 0 || data instanceof FormData)
      ) {
        config.data = data;
        config.params = params;
      } else {
        // 非GET请求如果没有提供data，则将params视为data
        config.data = params;
        config.params = undefined;
      }
      if (joinParamsToUrl) {
        config.url = setObjToUrlParams(config.url as string, {
          ...config.params,
          ...config.data,
        });
      }
    } else {
      // 兼容restful风格
      config.url += params;
      config.params = undefined;
    }
    return config;
  },

  // 请求拦截器处理
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token = localStorage.getItem(TOKEN_NAME);
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },

  // 响应拦截器处理
  responseInterceptors: (res) => {
    return res;
  },

  // 响应错误处理
  responseInterceptorsCatch: (error: any) => {
    const { config } = error;
    handleError(error);
    if (!config || !config.requestOptions.retry) {
      return Promise.reject(error);
    }

    config.retryCount = config.retryCount || 0;

    if (config.retryCount >= config.requestOptions.retry.count) {
      return Promise.reject(error);
    }

    config.retryCount += 1;

    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve(config);
      }, config.requestOptions.retry.delay || 1);
    });

    return backoff.then((config) => request.request(config as any));
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    merge(
      <CreateAxiosOptions>{
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // 例如: authenticationScheme: 'Bearer'
        authenticationScheme: '',
        // 超时
        timeout: 10 * 1000,
        // 携带Cookie
        withCredentials: true,
        // 头信息
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 接口地址
          // 是否自动添加接口前缀
          isJoinPrefix: true,
          // 接口前缀
          // 例如: https://www.baidu.com/api
          // urlPrefix: '/api'
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreRepeatRequest: true,
          // 是否携带token
          withToken: true,
          // 重试
          retry: {
            count: 3,
            delay: 1000,
          },
          // 显示错误信息
          showErrorMessage: true,
        },
      },
      opt || {}
    )
  );
}

const request = createAxios();
export default request;
