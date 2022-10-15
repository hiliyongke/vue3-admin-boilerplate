import axios, {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

interface Interceptor {
  request: AxiosInterceptorManager<AxiosRequestConfig>;
  response: AxiosInterceptorManager<AxiosResponse>;
}

export function InitInterceptor(interceptors: Interceptor) {
  // Add a request interceptor
  interceptors.request.use(
    function (config) {
      // Do something before request is sent

      const token = GetToken();
      config.headers = config.headers || {};

      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }

      return config;
    },
    function (error) {
      // Do something with request error

      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  interceptors.response.use(
    function (response) {
      const rsp = response.data;
      const config: any = response.config;

      if (rsp.code === 401 && config['IgnoreAuth'] !== true) {
        const url = window.location.pathname + window.location.search;
        throw new Error();
      }

      // Do something with response data

      return response;
    },
    function (error) {
      // Do something with response error

      return Promise.reject(error);
    }
  );
}

export function GetToken(): string {
  console.log('getToken');
  const token = 'token';
  return token;
}

export function SetToken(token: string): void {
  console.log('setToken', token);
}
