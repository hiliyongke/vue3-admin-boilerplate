import { specialWords } from './constant';

let fnsErrorTime = 0;

interface UrlsInfo {
  [key: string]: any;
}

interface RequestElement {
  desc: string;
  param: Record<string, any>;
  url: string;
  method: string;
  headers?: Record<string, any>;
}

function checkArrItem(arr: Record<string, any> | null, fnsName: string): string {
  if (arr) {
    for (const item in arr) {
      if (item === fnsName) {
        fnsName += Date.now() + ++fnsErrorTime;
      }
    }
  }
  return fnsName;
}

// 计算相关
const calculateObj = {
  checkExcludesIncludes(url: string, excludes: string[], includes: string[]): boolean {
    if (excludes.length) {
      for (const key of excludes) {
        if (url.startsWith(key)) {
          return true;
        }
      }
      return false;
    }
    if (includes.length) {
      for (const key of includes) {
        if (url.startsWith(key)) {
          return false;
        }
      }
      return true;
    }
    return false;
  },

  // 分模块保存url
  // 处理每个请求的数据（参数、描述、url、请求方式…）
  calcUrl(
    paths: Record<string, any>,
    definitions: Record<string, any>,
    excludes: string[],
    includes: string[]
  ): Record<string, UrlsInfo> {
    const urlsObj: Record<string, UrlsInfo> = {};
    for (const key in paths) {
      if (Object.prototype.hasOwnProperty.call(paths, key)) {
        const noNeedToDoNext = this.checkExcludesIncludes(key, excludes, includes);
        if (noNeedToDoNext) {
          continue;
        } else {
          const element = paths[key];
          const secKeys = Object.keys(element);
          if (secKeys.length) {
            const prefix = key.split('/').filter((obj) => obj);
            const firstPrefix = prefix[0];

            if (!urlsObj[firstPrefix]) {
              urlsObj[firstPrefix] = {};
            }

            this.handleUrlNMethod(secKeys, key, urlsObj[firstPrefix], element, definitions);
          }
        }
      }
    }
    return urlsObj;
  },

  handleUrlNMethod(
    secKeys: string[],
    url: string,
    urlsObjInfo: UrlsInfo,
    element: Record<string, any>,
    definitions: Record<string, any>
  ) {
    if (element) {
      for (const key in element) {
        if (Object.prototype.hasOwnProperty.call(element, key)) {
          const value = element[key];
          if (secKeys.length > 1) {
            this.temFns(`${url}:${key}`, urlsObjInfo, key, url, value, definitions);
          } else {
            this.temFns(url, urlsObjInfo, key, url, value, definitions);
          }
        }
      }
    }
  },

  temFns(
    fnsName: string,
    urlsObjInfo: UrlsInfo,
    method: string,
    url: string,
    obj: Record<string, any>,
    definitions: Record<string, any>
  ) {
    const resultFnsName = checkArrItem(urlsObjInfo, fnsName);
    if (urlsObjInfo[resultFnsName]) {
      console.log(`计算url后仍然重复：url为 ${url}，请求方式为 ${method}`);
      return;
    }

    const element = this.calcRequestParams(obj, method, url);
    if (Object.keys(element.param).length) {
      this.calcDefinitions(definitions, element);
    }

    urlsObjInfo[resultFnsName] = element;
  },

  // 处理每个请求的数据（参数、描述、url、请求方式…）
  calcRequestParams(obj: Record<string, any>, method: string, url: string): RequestElement {
    let param = {};
    if (obj.parameters) {
      param = this.calcParameters(obj.parameters, method);
    }
    const info: RequestElement = {
      desc: obj.summary || '',
      param,
      url,
      method,
    };
    if (obj.consumes) {
      info.headers = {
        'Content-Type': obj.consumes.length === 1 ? obj.consumes.join('') : obj.consumes,
      };
    }
    return info;
  },

  // 处理请求参数
  calcParameters(params: Record<string, any>[], method: string): Record<string, any> {
    const tem: Record<string, any> = {};
    for (const item of params) {
      let prefix = '';
      let definitions = '';
      let objParamType = '';

      switch (item.in) {
        case 'query':
          prefix = 'params.';
          break;
        case 'body':
        case 'formData':
          prefix = 'data.';
          break;
        case 'path':
        case 'header':
          prefix = 'params.';
          break;
        default:
          if (method === 'get') {
            prefix = 'params.';
          } else if (method === 'post' || method === 'put') {
            prefix = 'data.';
          }
          break;
      }

      if (item.schema && item.schema.$ref) {
        definitions = item.schema.$ref;
      } else if (item.schema && item.schema.items && item.schema.items.$ref) {
        definitions = item.schema.items.$ref;
      }
      if (definitions) {
        definitions = definitions.split('/').pop() || '';
      }

      if (item.type) {
        objParamType = item.type;
      } else if (item.schema && item.schema.type) {
        objParamType = item.schema.type;
      }

      const obj = {
        paramType: objParamType,
        paramDesc: item.description || '',
        definitions,
      };

      tem[`${prefix}${item.name}`] = obj;
    }
    return tem;
  },

  // 处理请求的特殊参数
  calcDefinitions(definitions: Record<string, any>, element: RequestElement): void {
    const { param } = element;

    for (const p in param) {
      if (Object.prototype.hasOwnProperty.call(param, p)) {
        const obj = param[p];
        if (obj.definitions) {
          const info = definitions[obj.definitions];
          if (obj.paramType) {
            obj.paramType += `<${info.type}>`;
          } else {
            obj.paramType = `${info.type}`;
          }

          const temObj = this.temFns2(info, definitions, p, obj.required);
          this.concatParam(element, p, temObj);
        }
        delete obj.definitions;
      }
    }
  },

  temFns2(
    info: Record<string, any>,
    definitions: Record<string, any>,
    p: string,
    required: boolean,
    myObj?: Record<string, any>
  ): Record<string, any> {
    const temObj = myObj || {};
    const { properties } = info;
    if (properties) {
      for (const property in properties) {
        if (Object.prototype.hasOwnProperty.call(properties, property)) {
          const propertyInfo = properties[property];
          const { $ref } = propertyInfo;
          let type = propertyInfo.type || '';
          if ($ref) {
            const refName = $ref.split('/').pop() || '';
            const refVal = definitions[refName];
            if (refVal.properties) {
              const resTemObj = {};
              const res = this.temFns2(refVal, definitions, p, required, resTemObj);
              const afterRes = this.handleNestingParams(
                property,
                res,
                propertyInfo.description || '',
                required || false
              );
              Object.assign(temObj, afterRes);
            } else if (refVal.type) {
              temObj[property] = {
                paramType: refVal.type,
                paramDesc: propertyInfo.description || '',
                required: required || false,
              };
            }
          } else if (type) {
            if (propertyInfo.items && propertyInfo.items.type) {
              type += `<${propertyInfo.items.type}>`;
            }
            temObj[property] = {
              paramType: type,
              paramDesc: propertyInfo.description || '',
              required: required || false,
            };
          }
        }
      }
      return temObj;
    }
    return {};
  },

  handleNestingParams(
    property: string,
    res: Record<string, any>,
    paramDesc: string,
    required: boolean
  ): Record<string, any> {
    const tem: Record<string, any> = {};
    if (typeof res === 'object' && res !== null) {
      tem[property] = { paramType: 'object', paramDesc, required };
    }
    for (const k in res) {
      if (Object.prototype.hasOwnProperty.call(res, k)) {
        const element = res[k];
        tem[`${property}.${k}`] = { ...element };
      }
    }
    return tem;
  },

  concatParam(element: RequestElement, p: string, res: Record<string, any>): void {
    const tem: Record<string, any> = {};
    for (const key in res) {
      if (Object.prototype.hasOwnProperty.call(res, key)) {
        const val = res[key];
        tem[`${p}.${key}`] = val;
      }
    }
    element.param = { ...element.param, ...tem };
  },

  // ================

  // 按模块、模板生成js文件内容
  calcText(allInfo: Record<string, UrlsInfo>, info: Record<string, any>): Record<string, string> {
    const fileInfo: Record<string, string> = {};
    for (const key in allInfo) {
      // key是模块，element是该模块下所有链接
      const element = allInfo[key];
      let str = `/**
 * ${info.title}
 * ${key}模块
 * ${info.host}/swagger-ui.html
 */
import request from '@/utils/request'
`;
      const names: string[] = [];
      for (const fnsName in element) {
        const requestMsg = element[fnsName];
        const { desc, param, url, method, ...rest } = requestMsg;
        const { paramStr, paramTypeStr, fnsParamStr } = this.checkParam(param);
        const requestUrl = this.calcRequestUrl(url, param);
        const nameStr = this.calcNameStr(fnsName, url, names);
        const restStr = this.calcRestStr(rest);
        str += `\n/**
 * @description ${desc}${paramStr}
 */
export const ${nameStr} = (${fnsParamStr}) => request({
  url: ${requestUrl},
  method: '${method}',${paramTypeStr}${restStr}
})
`;
      }
      fileInfo[`${key}.ts`] = str;
    }
    return fileInfo;
  },

  // 处理参数注释
  checkParam(param: Record<string, any>): { paramStr: string; paramTypeStr: string; fnsParamStr: string } {
    let paramStr = '';
    let fnsParamStr: string;
    const paramType: string[] = [];
    const fnsParam: string[] = [];

    for (const key in param) {
      const element = param[key];
      paramStr += `\n * @param {${element.paramType || 'unknown'}} ${key} ${element.paramDesc}`;
      const res = key.match(/(data|params)(?=\.)/);
      if (res) {
        const result = res[0];
        if (!paramType.includes(result)) {
          paramType.push(result);
        }
      } else {
        fnsParam.push(key);
      }
    }

    fnsParamStr = fnsParam.join(', ');
    let paramTypeStr = paramType.join(',\n\t');
    if (fnsParamStr && paramTypeStr) {
      fnsParamStr += ', ';
    }
    fnsParamStr += paramTypeStr;
    if (paramTypeStr.length) {
      paramTypeStr = `\n\t${paramTypeStr},`;
    }

    return {
      paramStr,
      paramTypeStr,
      fnsParamStr,
    };
  },

  // 处理文件中请求的url
  calcRequestUrl(url: string, param: Record<string, any>): string {
    const index = url.indexOf('{');
    let pathParams = '';

    if (index !== -1) {
      pathParams = url.slice(index + 1, -1);
      url = url.slice(0, index);
    }

    const paramHasVal = param[`params.${pathParams}`];
    const dataHasVal = param[`data.${pathParams}`];
    const from = paramHasVal ? 'params' : dataHasVal ? 'data' : '';
    const name = from ? `${from}['${pathParams}']` : `${pathParams}`;

    return `\`${url}${pathParams ? `\${${name}}` : ''}\``;
  },

  // 处理函数名
  calcNameStr(urlKey: string, url: string, allNames: string[]): string {
    let res = '';
    if (urlKey !== url) {
      const result = urlKey.match(/(?<=:)(get|post|delete|put)/);
      if (!result) {
        return '';
      }

      let prefix = '';
      const method = result[0];

      switch (method) {
        case 'get':
          prefix = 'search';
          break;
        case 'post':
          prefix = 'create';
          break;
        case 'put':
          prefix = 'update';
          break;
        case 'delete':
          prefix = 'remove';
          break;
        default:
          break;
      }

      const { calcName } = this.calcName(url);
      res = `${prefix}${calcName}`;
    } else {
      const { calcName } = this.calcName(url, 1);
      res = calcName;
    }

    if (allNames.includes(res)) {
      res += Date.now() + ++fnsErrorTime;
      if (allNames.includes(res)) {
        console.log(`处理函数名后，还有重复！！`);
      }
    } else {
      allNames.push(res);
    }
    return res;
  },

  calcName(url: string, type?: number): { calcName: string; calcNameResult: string[] } {
    const calcNameResult = url
      .split('/')
      .filter((item) => item)
      .reverse();
    let calcName = calcNameResult[0];
    const isParam = calcName.startsWith('{') && calcName.endsWith('}');
    if (isParam) {
      calcName = calcName.slice(1, -1);
    }

    if (type) {
      if (specialWords.includes(calcName) || isParam) {
        if (calcNameResult.length >= 2) {
          const lastName = calcNameResult[1];
          calcName += `${lastName.slice(0, 1).toUpperCase()}${lastName.slice(1)}`;
        } else {
          calcName += Date.now() + ++fnsErrorTime;
        }
      }
      return { calcName, calcNameResult };
    } else {
      const afterNameStart = `${calcName.slice(0, 1).toUpperCase()}`;
      const afterNameEnd = `${calcName.slice(1)}`;
      return {
        calcName: afterNameStart + afterNameEnd,
        calcNameResult,
      };
    }
  },

  // 处理剩余参数
  calcRestStr(rest: Record<string, any>): string {
    let restStr = '';

    for (const key in rest) {
      const element = rest[key];
      restStr += `${key}: `;
      if (Object.keys(element).length) {
        restStr += `{ `;
        for (const left in element) {
          const right = element[left];
          restStr += `'${left}': '${right}'`;
        }
        restStr += ` },`;
      } else {
        restStr += `${element},`;
      }
    }

    if (restStr.length) {
      restStr = `\n\t${restStr}`;
    }

    return restStr;
  },
};

export default calculateObj;
