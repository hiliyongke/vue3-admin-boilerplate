import { HttpClient } from './modules/http-client';

interface keyObj {
  [key: string]: any;
}

export function getApi() {
  // 这里可以配置 baseURL
  const http = new HttpClient({ baseURL: '' });
  const modulesFiles = import.meta.globEager('./modules/**/*.ts');
  const modules = Object.keys(modulesFiles).reduce(
    (modules: keyObj, modulePath) => {
      const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1');
      if (!['data-contracts', 'http-client'].includes(moduleName)) {
        const value = modulesFiles[modulePath];
        const key = moduleName.toLowerCase();
        modules[key] = new value[moduleName](http);
      }
      return modules;
    },
    {}
  );
  return modules;
}
const myApi = getApi();
export default myApi;
