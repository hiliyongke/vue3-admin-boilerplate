import * as path from 'path';
import * as fs from 'fs';
import { PlopGeneratorConfig, Actions, ActionType } from 'plop';

function getFolder(dir: string): string[] {
  const components: string[] = [];
  const files = fs.readdirSync(dir);
  files.forEach(function (item) {
    const stat = fs.lstatSync(path.join(dir, item));
    if (stat.isDirectory() === true && item !== 'components') {
      const fullPath = path.join(dir, item);
      components.push(fullPath);
      components.push(...getFolder(fullPath));
    }
  });
  return components;
}

const config: PlopGeneratorConfig = {
  description: '创建页面',
  prompts: [
    {
      type: 'list',
      name: 'path',
      message: '请选择页面创建目录',
      choices: getFolder('src/pages')
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入文件名',
      validate: (v: string) => {
        if (!v || v.trim() === '') {
          return '文件名不能为空';
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
    const relativePath = path.relative('src/pages', data.path);
    const actions: ActionType[] = [];
    actions.push({
      type: 'add',
      path: `${data.path}/{{kebabCase name}}/index.vue`,
      templateFile: 'plop-tpls/page/index.hbs',
      data: {
        componentName: `${relativePath} ${data.name}`
      }
    });
    return actions;
  }
};

export = config;
