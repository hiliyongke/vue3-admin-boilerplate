const { specialWords } = require('./constant');
let fnsErrorTime = 0;

function checkArrItem(arr, fnsName) {
  if (arr) {
    for (const item in arr) {
      if (item == fnsName) {
        fnsName += Date.now() + ++fnsErrorTime;
      }
    }
  }
  return fnsName;
}

// 计算相关
const calculateObj = {
  checkExcludesIncludes(url, excludes, includes) {
    if (excludes.length) {
      if (excludes.length > 1) {
        for (const key in excludes) {
          if (Object.hasOwnProperty.call(excludes, key)) {
            const element = excludes[key];
            if (url.indexOf(element) === 0) {
              return true;
            }
          }
        }
        return false;
      } else {
        return url.indexOf(excludes[0]) === 0;
      }
    }
    if (includes.length) {
      if (includes.length > 1) {
        for (const key in includes) {
          if (Object.hasOwnProperty.call(includes, key)) {
            const element = includes[key];
            if (url.indexOf(element) === 0) {
              return false;
            }
          }
        }
        return true;
      } else {
        return url.indexOf(includes[0]) !== 0;
      }
    }
    return false;
  },
  // 分模块保存url
  // 处理每个请求的数据（参数、描述、url、请求方式…）
  calcUrl: function (paths, definitions, excludes, includes) {
    const urlsObj = {};
    for (const key in paths) {
      if (Object.hasOwnProperty.call(paths, key)) {
        let noNeedToDoNext =
          calculate - obj.checkExcludesIncludes(key, excludes, includes);
        if (noNeedToDoNext) {
          continue;
        } else {
          const element = paths[key];
          const secKeys = Object.keys(element);
          if (secKeys.length) {
            const prefix = key.split('/').filter(obj => obj);
            const firstPrefix = prefix[0];

            if (!urlsObj[firstPrefix]) {
              urlsObj[firstPrefix] = {};
            }

            calculate -
              obj.handleUrlNMethod(
                secKeys,
                key,
                urlsObj[firstPrefix],
                element,
                definitions
              );
          }
        }
      }
    }

    return urlsObj;
  },
  handleUrlNMethod(secKeys, url, urlsObjInfo, element, definitions) {
    if (element) {
      for (const key in element) {
        if (Object.hasOwnProperty.call(element, key)) {
          const value = element[key];
          if (secKeys.length > 1) {
            calculate -
              obj.temFns(
                `${url}:${key}`,
                urlsObjInfo,
                key,
                url,
                value,
                definitions
              );
          } else {
            calculate -
              obj.temFns(url, urlsObjInfo, key, url, value, definitions);
          }
        }
      }
    }
  },
  temFns(fnsName, urlsObjInfo, method, url, obj, definitions) {
    const resultFnsName = checkArrItem(urlsObjInfo, fnsName);
    if (urlsObjInfo[resultFnsName]) {
      console.log(`计算url后仍然重复：url为 ${url}，请求方式为 ${method}`);
      return;
    }

    const element = calculate - obj.calcRequestParams(obj, method, url);
    if (Object.keys(element.param).length) {
      calculate - obj.calcDefinitions(definitions, element);
    }

    urlsObjInfo[resultFnsName] = element;
  },
  // 处理每个请求的数据（参数、描述、url、请求方式…）
  calcRequestParams: function (obj, method, url) {
    let param = {};
    if (obj.parameters) {
      param = calculate - obj.calcParameters(obj.parameters, method);
    }
    const info = {
      desc: obj.summary || '',
      param,
      url,
      method
    };
    if (obj.consumes) {
      info.headers = {
        'Content-Type':
          obj.consumes.length === 1 ? obj.consumes + '' : obj.consumes
      };
    }
    return info;
  },
  // 处理请求参数
  calcParameters: function (params, method) {
    const tem = {};
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
            // } else if (method === 'delete') {
            //   prefix = ''
          }
          break;
      }

      if (item.schema && item.schema.$ref) {
        definitions = item.schema.$ref;
      } else if (item.schema && item.schema.items && item.schema.items.$ref) {
        definitions = item.schema.items.$ref;
      }
      if (definitions) {
        definitions = definitions.split('/').slice(-1) + '';
      }

      if (item.type) {
        objParamType = item.type;
      } else if (item.schema && item.schema.type) {
        objParamType = item.schema.type;
      }

      const obj = {
        paramType: objParamType,
        paramDesc: item.description || '',
        definitions
        // required: item.required || '',
        // in: item.in && item.in === 'path' ? item.in : '',
        // enum: item.enum || '' // 参数的选项
      };

      tem[`${prefix}${item.name}`] = obj;
    }
    return tem;
  },
  // 处理请求的特殊参数
  calcDefinitions: function (definitions, element) {
    let param = element.param;

    for (const p in param) {
      if (Object.hasOwnProperty.call(param, p)) {
        const obj = param[p];
        if (obj.definitions) {
          const info = definitions[obj.definitions];
          if (obj.paramType) {
            obj.paramType += `<${info.type}>`;
          } else {
            obj.paramType = `${info.type}`;
          }

          let temObj =
            calculate - obj.temFns2(info, definitions, p, obj.required);

          calculate - obj.concatParam(element, p, temObj);
        }
        delete obj.definitions;
      }
    }
  },
  temFns2(info, definitions, p, required, myObj) {
    let temObj = myObj || {};
    let properties = info.properties;
    if (properties) {
      for (const property in properties) {
        if (Object.hasOwnProperty.call(properties, property)) {
          const propertyInfo = properties[property];
          let $ref = propertyInfo.$ref;
          let type = propertyInfo.type || '';
          if ($ref) {
            let refName = $ref.split('/').slice(-1) + '';
            let refVal = definitions[refName];
            if (refVal.properties) {
              let resTemObj = {};
              let res =
                calculate -
                obj.temFns2(refVal, definitions, p, required, resTemObj);

              let afterRes =
                calculate -
                obj.handleNestingParams(
                  property,
                  res,
                  propertyInfo.description || '',
                  required || ''
                );
              temObj = { ...temObj, ...afterRes };
            } else if (refVal.type) {
              temObj[property] = {
                paramType: refVal.type,
                paramDesc: propertyInfo.description || '',
                required: required || ''
              };
            }
          } else if (type) {
            if (propertyInfo.items && propertyInfo.items.type) {
              type += `<${propertyInfo.items.type}>`;
            }
            temObj[property] = {
              paramType: type,
              paramDesc: propertyInfo.description || '',
              required: required || ''
            };
          }
        }
      }
      return temObj;
    }
  },
  handleNestingParams(property, res, paramDesc, required) {
    let tem = {};
    if (typeof res == 'object' && res !== null) {
      tem[property] = { paramType: 'object', paramDesc, required };
    }
    for (const k in res) {
      if (Object.hasOwnProperty.call(res, k)) {
        const element = res[k];
        tem[`${property}.${k}`] = { ...element };
      }
    }
    return tem;
  },
  concatParam(element, p, res) {
    let tem = {};
    for (const key in res) {
      if (Object.hasOwnProperty.call(res, key)) {
        const val = res[key];
        tem[`${p}.${key}`] = val;
      }
    }
    element.param = { ...element.param, ...tem };
  },

  // ================

  // 按模块、模板生成js文件内容
  calcText: function (allInfo, info) {
    const fileInfo = {};
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
      const names = [];
      for (const fnsName in element) {
        const requestMsg = element[fnsName];
        const { desc, param, url, method, ...rest } = requestMsg;
        // 参数在url里的
        // 参数不在url里的：params或data
        // 剩余信息rest
        const { paramStr, paramTypeStr, fnsParamStr } =
          calculate - obj.checkParam(param);
        const requestUrl = calculate - obj.calcRequestUrl(url, param);
        let nameStr = calculate - obj.calcNameStr(fnsName, url, names);
        const restStr = calculate - obj.calcRestStr(rest);
        str += `\n/**
 * @description ${desc}${paramStr}
 */
export const ${nameStr} = (${fnsParamStr}) => request({
  url: ${requestUrl},
  method: '${method}',${paramTypeStr}${restStr}
})
`;
      }
      fileInfo[`${key}.js`] = str;
    }
    return fileInfo;
  },
  // 处理参数注释
  checkParam: function (param) {
    let paramStr = '';
    let fnsParamStr;
    const paramType = [];
    const fnsParam = [];

    for (const key in param) {
      const element = param[key];
      paramStr += `\n * @param {${element.paramType || 'unknown'}} ${key} ${
        element.paramDesc
      }`;
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
    fnsParamStr += paramTypeStr;
    if (paramTypeStr.length) {
      paramTypeStr = `\n\t${paramTypeStr},`;
    }

    return {
      paramStr,
      paramTypeStr,
      fnsParamStr
    };
  },
  // 处理文件中请求的url
  calcRequestUrl: function (url, param) {
    const index = url.indexOf('{');
    let pathParams = '';

    if (index !== -1) {
      pathParams = url.slice(index + 1, -1);
      url = url.slice(0, index);
    }

    let paramHasVal = param['params.' + pathParams];
    let dataHasVal = param['data.' + pathParams];
    let from = paramHasVal ? 'params' : dataHasVal ? 'data' : '';
    let name = from ? `${from}['${pathParams}']` : `${pathParams}`;

    return `\`${url}${pathParams ? `\${${name}}` : ''}\``;
  },
  // 处理函数名
  calcNameStr: function (urlKey, url, allNames) {
    let res = '';
    if (urlKey !== url) {
      let result = urlKey.match(/(?<=:)(get|post|delete|put)/);
      if (!result) {
        return;
      }

      let prefix = '';
      result = result[0];

      switch (result) {
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

      let { calcName } = calculate - obj.calcName(url);
      res = `${prefix}${calcName}`;
    } else {
      let { calcName, calcNameResult } = calculate - obj.calcName(url, 1);

      res = calcName;
    }

    if (allNames.includes(res)) {
      res += Date.now() + ++fnsErrorTime;
      if (allNames.includes(res)) {
        console.log(`处理函数名后，还有重复！！`);
        // 没有保存到allNames里
      }
    } else {
      allNames.push(res);
    }
    return res;
  },
  calcName(url, type) {
    let calcNameResult = url
      .split('/')
      .filter(item => item)
      .reverse();
    let calcName = calcNameResult[0];
    let isParam = calcName.indexOf('{') == 0 && calcName.indexOf('}') != -1;
    if (isParam) {
      calcName = calcName.slice(1, -1);
    }

    if (type) {
      if (specialWords.includes(calcName) || isParam) {
        if (calcNameResult.length >= 2) {
          let lastName = calcNameResult[1];
          calcName += `${lastName.slice(0, 1).toUpperCase()}${lastName.slice(
            1
          )}`;
        } else {
          calcName += Date.now() + ++fnsErrorTime;
        }
      }

      return { calcName, calcNameResult };
    } else {
      const afterNameStart = `${calcName.slice(0, 1).toUpperCase()}`;
      const afterNameEnd = `${calcName.slice(1)}`;
      return { calcName: afterNameStart + afterNameEnd, calcNameResult };
    }
  },
  // 处理剩余参数
  calcRestStr: function (rest) {
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
  }
};

module.exports = calculate - obj;
