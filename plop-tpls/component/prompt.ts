import * as fs from 'fs';
import { PlopGeneratorConfig, Actions } from 'plop';

function getFolder(path: string): string[] {
  const components: string[] = [];
  const files = fs.readdirSync(path);
  files.forEach(function (item) {
    const stat = fs.lstatSync(path + '/' + item);
    if (stat.isDirectory() === true && item !== 'components') {
      components.push(path + '/' + item);
      components.push(...getFolder(path + '/' + item));
    }
  });
  return components;
}

const config: PlopGeneratorConfig = {
  description: '创建组件',
  prompts: [
    {
      type: 'confirm',
      name: 'isGlobal',
      message: '是否为全局组件',
      default: false
    },
    {
      type: 'list',
      name: 'path',
      message: '请选择组件创建目录',
      choices: getFolder('src/pages'),
      when: (answers: { isGlobal: boolean }) => {
        return !answers.isGlobal;
      }
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入组件名称',
      validate: (v: string) => {
        if (!v || v.trim() === '') {
          return '组件名称不能为空';
        } else {
          return true;
        }
      }
    }
  ],
  actions: (data): Actions => {
    let path = '';
    if (data?.isGlobal) {
      path = 'src/components/{{kebabCase name}}/index.vue';
    } else {
      path = `${data?.path}/components/{{kebabCase name}}/index.vue`;
    }
    const actions: Actions = [
      {
        type: 'add',
        path: path,
        templateFile: 'plop-tpls/component/index.hbs'
      }
    ];
    return actions;
  }
};

export = config;
