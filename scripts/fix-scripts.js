#!/usr/bin/env node

/**
 * @description 自动修复 package.json 脚本配置问题
 * @author AI Assistant
 * @date 2025-10-22
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🔧 开始修复脚本配置问题...\n');

// ============================================
// 1. 创建 .stylelintrc.json
// ============================================
console.log('📝 1. 创建 .stylelintrc.json...');
const stylelintConfig = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue', 'stylelint-config-prettier'],
  rules: {
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'custom-property-pattern': null,
    'keyframes-name-pattern': null,
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
};

const stylelintPath = path.join(ROOT_DIR, '.stylelintrc.json');
fs.writeFileSync(stylelintPath, JSON.stringify(stylelintConfig, null, 2));
console.log('   ✅ 已创建 .stylelintrc.json\n');

// ============================================
// 2. 修复 .ls-lint.yml
// ============================================
console.log('📝 2. 修复 .ls-lint.yml...');
const lsLintPath = path.join(ROOT_DIR, '.ls-lint.yml');
let lsLintContent = fs.readFileSync(lsLintPath, 'utf-8');

if (!lsLintContent.includes('__tests__')) {
  lsLintContent = lsLintContent.replace(
    /ignore:\n/,
    `ignore:
  - __tests__
`
  );
  fs.writeFileSync(lsLintPath, lsLintContent);
  console.log('   ✅ 已添加 __tests__ 到忽略列表\n');
} else {
  console.log('   ℹ️  __tests__ 已在忽略列表中\n');
}

// ============================================
// 3. 修复 package.json 脚本
// ============================================
console.log('📝 3. 修复 package.json 脚本...');
const packagePath = path.join(ROOT_DIR, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

let modified = false;

// 修复 release:cli
if (packageJson.scripts['release:cli'] === 'node ./build/release.js') {
  packageJson.scripts['release:cli'] = 'tsx ./build/release.ts';
  console.log('   ✅ 修复 release:cli 路径');
  modified = true;
}

// 修复 start
if (packageJson.scripts.start === "pnpm run --filter '*' start") {
  packageJson.scripts.start = 'pnpm dev';
  console.log('   ✅ 简化 start 命令');
  modified = true;
}

// 添加 taze 依赖（如果不存在）
if (!packageJson.devDependencies.taze) {
  packageJson.devDependencies.taze = '^0.18.0';
  console.log('   ✅ 添加 taze 依赖');
  modified = true;
}

if (modified) {
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('   ✅ 已更新 package.json\n');
} else {
  console.log('   ℹ️  package.json 无需修改\n');
}

// ============================================
// 4. 创建 .czrc
// ============================================
console.log('📝 4. 创建 .czrc...');
const czrcPath = path.join(ROOT_DIR, '.czrc');
if (!fs.existsSync(czrcPath)) {
  const czrcConfig = {
    path: 'cz-customizable',
  };
  fs.writeFileSync(czrcPath, JSON.stringify(czrcConfig, null, 2));
  console.log('   ✅ 已创建 .czrc\n');
} else {
  console.log('   ℹ️  .czrc 已存在\n');
}

// ============================================
// 5. 创建 .cz-config.ts
// ============================================
console.log('📝 5. 创建 .cz-config.ts...');
const czConfigPath = path.join(ROOT_DIR, '.cz-config.ts');
if (!fs.existsSync(czConfigPath)) {
  const czConfigContent = `module.exports = {
  types: [
    { value: 'feat', name: 'feat:     ✨ 新功能' },
    { value: 'fix', name: 'fix:      🐛 修复 bug' },
    { value: 'docs', name: 'docs:     📝 文档变更' },
    { value: 'style', name: 'style:    💄 代码格式（不影响功能）' },
    { value: 'refactor', name: 'refactor: ♻️  重构（不是新功能或修复）' },
    { value: 'perf', name: 'perf:     ⚡️ 性能优化' },
    { value: 'test', name: 'test:     ✅ 测试' },
    { value: 'build', name: 'build:    📦️ 构建系统或外部依赖' },
    { value: 'ci', name: 'ci:       👷 CI 配置' },
    { value: 'chore', name: 'chore:    🔧 其他修改（不修改 src 或测试文件）' },
    { value: 'revert', name: 'revert:   ⏪️ 回退' },
  ],
  scopes: [
    { name: 'components' },
    { name: 'utils' },
    { name: 'styles' },
    { name: 'deps' },
    { name: 'config' },
    { name: 'other' },
  ],
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'],
  subjectLimit: 100,
};
`;
  fs.writeFileSync(czConfigPath, czConfigContent);
  console.log('   ✅ 已创建 .cz-config.ts\n');
} else {
  console.log('   ℹ️  .cz-config.ts 已存在\n');
}

// ============================================
// 6. 安装缺失的依赖
// ============================================
if (modified && packageJson.devDependencies.taze) {
  console.log('📦 6. 安装缺失的依赖...');
  try {
    execSync('pnpm install', { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log('   ✅ 依赖安装完成\n');
  } catch (error) {
    console.error('   ❌ 依赖安装失败:', error.message);
  }
}

// ============================================
// 7. 验证修复
// ============================================
console.log('🔍 7. 验证修复...\n');

const checks = [
  {
    name: 'stylelint 配置',
    file: '.stylelintrc.json',
    exists: fs.existsSync(stylelintPath),
  },
  {
    name: 'ls-lint 配置',
    file: '.ls-lint.yml',
    exists: fs.existsSync(lsLintPath) && lsLintContent.includes('__tests__'),
  },
  {
    name: 'commitizen 配置',
    file: '.czrc',
    exists: fs.existsSync(czrcPath),
  },
  {
    name: 'commitizen 自定义配置',
    file: '.cz-config.ts',
    exists: fs.existsSync(czConfigPath),
  },
];

let allPassed = true;
checks.forEach((check) => {
  if (check.exists) {
    console.log(`   ✅ ${check.name} (${check.file})`);
  } else {
    console.log(`   ❌ ${check.name} (${check.file})`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ 所有配置文件已成功创建！');
} else {
  console.log('⚠️  部分配置文件创建失败，请手动检查');
}
console.log('='.repeat(50));

console.log('\n📋 下一步操作：\n');
console.log('1. 验证修复：');
console.log('   pnpm lint:css:check');
console.log('   pnpm lint:file');
console.log('   pnpm type-check\n');
console.log('2. 修复 lint 问题：');
console.log('   pnpm lint\n');
console.log('3. 运行测试：');
console.log('   pnpm test:unit\n');
console.log('4. 提交代码：');
console.log('   git add .');
console.log('   pnpm commit\n');
