// 根据 swagger.json 生成 api
const { generateApi } = require('swagger-typescript-api');
const path = require('path');

interface SwaggerConfig {
  moduleName: string;
  input?: string;
  url?: string;
}

const swagger: SwaggerConfig[] = [
  // {
  //   moduleName: 'xx2',
  //   url: ''
  // },
  {
    moduleName: 'xx1',
    input: './src/utils/api-gen/swagger1.json'
  }
];

for (let i = 0; i < swagger.length; i++) {
  const item: any = swagger[i];
  const cfg: any = {
    modular: true,
    templates: path.resolve(process.cwd(), './src/utils/api-gen/templates'),
    httpClientType: 'axios', // or "fetch"
    defaultResponseAsSuccess: false,
    unwrapResponseData: true,
    generateRouteTypes: false,
    generateResponses: true,
    toJS: false,
    extractRequestParams: false,
    extractRequestBody: false,
    moduleNameIndex: 1,
    prettier: {
      printWidth: 80,
      tabWidth: 2,
      trailingComma: 'all',
      parser: 'typescript'
    },
    defaultResponseType: 'void',
    singleHttpClient: true,
    cleanOutput: false,
    enumNamesAsValues: true,
    moduleNameFirstTag: true,
    generateUnionEnums: false,
    generateClient: true,
    output: path.resolve(
      process.cwd(),
      `./src/api/modules/${item.moduleName}`
    ) // 输出目录
  };

  // url 跟 input只能出现其一
  if (item.url) {
    cfg.url = item.url; // swagger url地址
  }
  if (item.input) {
    cfg.input = item.input; // swagger.json 文件地址
  }
  generateApi(cfg);
}
