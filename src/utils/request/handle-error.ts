import axios, { AxiosError } from 'axios';
import { MessagePlugin } from 'tdesign-vue-next';

export const ERROR_MESSAGES: Record<string | number, string> = {
  400: '错误请求!',
  401: '登录失效，请尝试重新登录!',
  403: '暂无该操作权限',
  404: '资源不存在',
  500: '服务异常',
  NetworkError: '网络异常，请检查您的网络连接是否正常!',
  TimeoutError: '请求超时，请刷新页面重试!',
  CancelToken: '请求已取消'
};

export enum ErrorStatus {
  NetworkError = 'NetworkError',
  TimeoutError = 'TimeoutError',
  CancelToken = 'CancelToken'
}

export function handleError(error: AxiosError) {
  let errorStatus: string | number = 'Unknown';

  const { response, message, code, config } = error || {};
  if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
    error.message = ERROR_MESSAGES.TimeoutError;
    errorStatus = ErrorStatus.TimeoutError;
  }

  if (message === 'Network Error') {
    error.message = ERROR_MESSAGES.NetworkError;
    errorStatus = ErrorStatus.NetworkError;
  }

  if (response?.status && ERROR_MESSAGES[response.status]) {
    error.message = ERROR_MESSAGES[response.status];
    errorStatus = response.status;
  }

  if (axios.isCancel(error)) {
    error.message = ERROR_MESSAGES.CancelToken;
    errorStatus = ErrorStatus.CancelToken;
  }

  const configWithOptions = config as any;
  if (configWithOptions?.requestOptions?.showErrorMessage) {
    MessagePlugin.closeAll();
    MessagePlugin.error(`接口异常：${errorStatus} - ${error.message}`);
  }

  return error;
}
