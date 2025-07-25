import { urlRegexp1, urlRegexp2 } from './constant';

interface CheckArgvResult {
  ips: string[];
  excludes: string[] | null;
  includes: string[] | null;
}

// 检查执行该文件的参数
export function checkArgv(arg: string[]): CheckArgvResult {
  if (!arg.length) {
    throw new Error(
      '出现该错误是因为没有传参，传参例子（多个ip/域名使用,分割）：\n\t--ip=http://255.255.255.255:3000,http://225.225.225.255:300\n\n'
    );
  }

  let ips: string[] = [];
  let excludes: string[] | null = null;
  let includes: string[] | null = null;

  checkingFn(arg, 'ip', (state, res) => {
    if (!state || !res) {
      throw new Error(
        '参数有误，ip的传参例子（多个ip/域名使用,分割）：\n\t--ip=http://255.255.255.255:3000,http://225.225.225.255:300\n\n'
      );
    } else {
      ips = checkIps(res);
    }
  });

  checkingFn(arg, 'excludes', (state, res) => {
    if (state && !res) {
      throw new Error(
        '参数有误，excludes传参例子（多个url使用,分割）：\n\t--excludes=/gen,/test\n\n'
      );
    } else if (res) {
      excludes = Array.from(new Set(res));
    }
  });

  checkingFn(arg, 'includes', (state, res) => {
    if (state && !res) {
      throw new Error(
        '参数有误，includes传参例子（多个url使用,分割）：\n\t--includes=/gen,/test\n\n'
      );
    } else if (res) {
      includes = Array.from(new Set(res));
    }
  });

  return { ips, excludes, includes };
}

function checkingFn(
  arg: string[],
  name: string,
  cb: (state: boolean, res: string[] | null) => void
): void {
  let res: string[] | null = null;
  let state = false;
  const argName = '--' + name + '=';
  const argNameLen = argName.length;
  for (const item of arg) {
    state = item.slice(0, argNameLen) === argName;
    if (state) {
      res = item.slice(argNameLen).split(',');
      break;
    }
  }
  if (cb) {
    cb(state, res);
  }
}

// 检查ip/域名
function checkIps(ips: string[]): string[] {
  let ips2: string[] = [];
  for (let ip of ips) {
    ip = ip.trim();
    if (ip.slice(-1).charCodeAt(0) === 47) {
      // 移除末尾的 '/'
      ip = ip.slice(0, -1);
    }
    const result1 = ip.match(urlRegexp1);
    const result2 = ip.match(urlRegexp2);
    if (result1) {
      ips2.push(result1[0]);
    } else if (result2) {
      ips2.push(result2[0]);
    } else {
      throw new Error('ip 有误: ' + ip);
    }
  }
  ips2 = Array.from(new Set(ips2));
  return ips2;
}

// 判断是否是https协议
export function isHttps(url: string): boolean {
  return url.split(':')[0] === 'https';
}
