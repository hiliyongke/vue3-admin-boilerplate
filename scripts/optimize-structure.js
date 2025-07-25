/**
 * @description 项目结构优化脚本
 * @author 优化版本
 */

const fs = require('fs');
const path = require('path');

/**
 * 创建目录结构
 */
const createDirectories = () => {
  const directories = [
    // 核心目录
    'src/components/common',
    'src/components/business',
    'src/components/layout',

    // 工具目录
    'src/utils/common',
    'src/utils/business',
    'src/utils/validation',

    // 类型目录
    'src/types/api',
    'src/types/business',
    'src/types/common',

    // 常量目录
    'src/constants/api',
    'src/constants/business',
    'src/constants/common',

    // 钩子目录
    'src/hooks/common',
    'src/hooks/business',

    // 服务目录
    'src/services/api',
    'src/services/business',

    // 样式目录
    'src/styles/components',
    'src/styles/pages',
    'src/styles/themes',

    // 测试目录
    'tests/unit',
    'tests/e2e',
    'tests/utils',

    // 文档目录
    'docs/api',
    'docs/components',
    'docs/guide',
  ];

  directories.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`✅ 创建目录: ${dir}`);
    }
  });
};

/**
 * 创建README文件
 */
const createReadmeFiles = () => {
  const readmeContents = {
    'src/components/README.md': `# 组件目录

## 目录结构

- \`common/\` - 通用组件
- \`business/\` - 业务组件
- \`layout/\` - 布局组件

## 组件规范

1. 组件名使用PascalCase
2. 文件名使用kebab-case
3. 每个组件都应该有对应的类型定义
4. 复杂组件应该拆分为多个子组件
`,
    'src/utils/README.md': `# 工具函数目录

## 目录结构

- \`common/\` - 通用工具函数
- \`business/\` - 业务相关工具函数
- \`validation/\` - 验证相关工具函数

## 编写规范

1. 每个工具函数都应该有完整的TypeScript类型定义
2. 添加详细的JSDoc注释
3. 提供使用示例
4. 编写单元测试
`,
    'src/types/README.md': `# 类型定义目录

## 目录结构

- \`api/\` - API相关类型定义
- \`business/\` - 业务相关类型定义
- \`common/\` - 通用类型定义

## 命名规范

1. 接口使用PascalCase，以I开头（可选）
2. 类型别名使用PascalCase
3. 枚举使用PascalCase
4. 常量类型使用UPPER_SNAKE_CASE
`,
  };

  Object.entries(readmeContents).forEach(([filePath, content]) => {
    const fullPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, content);
      console.log(`✅ 创建文件: ${filePath}`);
    }
  });
};

/**
 * 创建配置文件
 */
const createConfigFiles = () => {
  // EditorConfig
  const editorConfig = `# EditorConfig配置文件
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[*.{yml,yaml}]
indent_size = 2

[*.json]
indent_size = 2
`;

  // VSCode设置
  const vscodeSettings = {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.fixAll.stylelint": true
    },
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      "typescript",
      "typescriptreact",
      "vue"
    ],
    "typescript.preferences.importModuleSpecifier": "relative",
    "vue.codeActions.enabled": true,
    "vue.complete.casing.tags": "pascal",
    "vue.complete.casing.props": "camel"
  };

  // 创建文件
  const configFiles = [
    ['.editorconfig', editorConfig],
    ['.vscode/settings.json', JSON.stringify(vscodeSettings, null, 2)],
  ];

  configFiles.forEach(([filePath, content]) => {
    const fullPath = path.join(process.cwd(), filePath);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, content);
      console.log(`✅ 创建配置文件: ${filePath}`);
    }
  });
};

/**
 * 主函数
 */
const main = () => {
  console.log('🚀 开始优化项目结构...\n');

  try {
    createDirectories();
    createReadmeFiles();
    createConfigFiles();

    console.log('\n✨ 项目结构优化完成！');
    console.log('\n📋 优化内容：');
    console.log('  - 创建标准化目录结构');
    console.log('  - 添加README文档');
    console.log('  - 配置开发环境');
    console.log('  - 统一代码规范');

  } catch (error) {
    console.error('❌ 优化过程中出现错误:', error);
    process.exit(1);
  }
};

// 执行脚本
if (require.main === module) {
  main();
}

module.exports = {
  createDirectories,
  createReadmeFiles,
  createConfigFiles,
};
