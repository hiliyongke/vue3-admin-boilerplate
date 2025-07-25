import * as fs from 'fs';
import * as path from 'path';
import { PlopGeneratorConfig, Actions, ActionType } from 'plop';

function getFolder(dir: string): string[] {
  const components: string[] = [];
  const files = fs.readdirSync(dir);
  files.forEach(function (item) {
    const fullPath = path.join(dir, item);
    const stat = fs.lstatSync(fullPath);
    if (stat.isDirectory() === true && item !== 'components') {
      components.push(fullPath);
      components.push(...getFolder(fullPath));
    }
  });
  return components;
}

const config: PlopGeneratorConfig = {
  description: '创建全局模块化状态',
  prompts: [
    {
      type: 'list',
      name: 'path',
      message: '请选择模块创建目录',
      choices: getFolder('src/store')
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入模块名称',
      validate: (v: string) => {
        if (!v || v.trim() === '') {
          return '模块名称不能为空';
        } else {
          return true;
        }
      }
    }
  ],
  actions: (data): Actions => {
    if (!data) {
      return [];
    }
    const actions: ActionType[] = [
      {
        type: 'add',
        path: `${data.path}/{{camelCase name}}/index.ts`,
        templateFile: 'plop-tpls/store/index.hbs'
      },
      {
        type: 'add',
        path: `${data.path}/{{camelCase name}}/types.ts`
      }
    ];
    return actions;
  }
};

export = config;
