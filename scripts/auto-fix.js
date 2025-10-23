#!/usr/bin/env node

/**
 * @description 自动修复脚本
 * @usage node scripts/auto-fix.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 开始自动修复...\n');

// 1. 替换 console.log 为 logger
console.log('📝 步骤 1/5: 替换 console.log 为 logger...');

const filesToFix = [
  'src/store/modules/user.ts',
  'src/store/modules/permission.ts',
  'src/store/modules/lock-screen.ts',
  'src/services/index.ts',
  'src/router/guards.ts',
];

let fixedCount = 0;

filesToFix.forEach((file) => {
  const filePath = path.join(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  文件不存在: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;

  // 检查是否已经导入 logger
  const hasLoggerImport = content.includes("from '@/shared/utils/logger'") || content.includes("from '@/shared/utils'");

  // 如果没有导入，添加导入语句
  if (
    !hasLoggerImport &&
    (content.includes('console.log') || content.includes('console.warn') || content.includes('console.error'))
  ) {
    // 找到第一个 import 语句的位置
    const importMatch = content.match(/^import .+;$/m);
    if (importMatch) {
      const insertPosition = importMatch.index + importMatch[0].length;
      content =
        content.slice(0, insertPosition) + "\nimport { logger } from '@/shared/utils';" + content.slice(insertPosition);
    }
  }

  // 替换 console 调用
  content = content.replace(/console\.log\(/g, 'logger.debug(');
  content = content.replace(/console\.warn\(/g, 'logger.warn(');
  content = content.replace(/console\.error\(/g, 'logger.error(');
  content = content.replace(/console\.info\(/g, 'logger.info(');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ 已修复: ${file}`);
    fixedCount++;
  } else {
    console.log(`  ⏭️  跳过: ${file} (无需修复)`);
  }
});

console.log(`\n  📊 共修复 ${fixedCount} 个文件\n`);

// 2. 创建环境变量文件
console.log('📝 步骤 2/5: 创建环境变量文件...');

const envFiles = [
  {
    name: '.env.development',
    content: `# 开发环境配置
VITE_APP_TITLE=Vue3 Admin (Dev)
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development

# API 配置
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Sentry 配置（开发环境可选）
VITE_SENTRY_DSN=
VITE_SENTRY_ENVIRONMENT=development

# 性能监控
VITE_ENABLE_PERFORMANCE_MONITOR=true

# 功能开关
VITE_ENABLE_MOCK=true
VITE_ENABLE_PWA=false
VITE_ENABLE_VCONSOLE=true

# 加密密钥（开发环境使用固定密钥）
VITE_CRYPTO_KEY=dev-secret-key-12345678

# 第三方服务
VITE_MAP_KEY=test-map-api-key
VITE_OSS_BUCKET=test-oss-bucket
`,
  },
  {
    name: '.env.test',
    content: `# 测试环境配置
VITE_APP_TITLE=Vue3 Admin (Test)
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=test

# API 配置（使用 Mock）
VITE_API_BASE_URL=http://localhost:3000/mock
VITE_API_TIMEOUT=10000

# 禁用外部服务
VITE_SENTRY_DSN=
VITE_ENABLE_PERFORMANCE_MONITOR=false
VITE_ENABLE_MOCK=true
VITE_ENABLE_PWA=false
VITE_ENABLE_VCONSOLE=false

# 测试密钥
VITE_CRYPTO_KEY=test-secret-key-12345678
`,
  },
];

envFiles.forEach(({ name, content }) => {
  const filePath = path.join(process.cwd(), name);

  if (fs.existsSync(filePath)) {
    console.log(`  ⏭️  跳过: ${name} (已存在)`);
  } else {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ 已创建: ${name}`);
  }
});

console.log('');

// 3. 修复 AES 密钥
console.log('📝 步骤 3/5: 修复 AES 加密密钥...');

const aesFilePath = path.join(process.cwd(), 'src/utils/aes.ts');

if (fs.existsSync(aesFilePath)) {
  let aesContent = fs.readFileSync(aesFilePath, 'utf-8');
  const originalAesContent = aesContent;

  // 替换硬编码的密钥
  aesContent = aesContent.replace(
    /const keyStr = ['"]xxxx['"];/,
    `const keyStr = import.meta.env.VITE_CRYPTO_KEY || '';

if (!keyStr) {
  throw new Error('VITE_CRYPTO_KEY is not defined in environment variables');
}`
  );

  if (aesContent !== originalAesContent) {
    fs.writeFileSync(aesFilePath, aesContent, 'utf-8');
    console.log('  ✅ 已修复: src/utils/aes.ts');
  } else {
    console.log('  ⏭️  跳过: src/utils/aes.ts (已修复或无需修复)');
  }
} else {
  console.log('  ⚠️  文件不存在: src/utils/aes.ts');
}

console.log('');

// 4. 创建简化的 CI 配置
console.log('📝 步骤 4/5: 创建简化的 CI 配置...');

const ciBasicPath = path.join(process.cwd(), '.github/workflows/ci-basic.yml');

if (!fs.existsSync(ciBasicPath)) {
  const ciBasicContent = `name: CI Basic

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint-and-test:
    name: 代码检查和测试
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout代码
        uses: actions/checkout@v4

      - name: 安装 pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: 设置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: 安装依赖
        run: pnpm install --frozen-lockfile

      - name: ESLint 检查
        run: pnpm lint:check

      - name: TypeScript 类型检查
        run: pnpm type-check

      - name: 运行测试
        run: pnpm test:coverage

      - name: 上传覆盖率报告
        uses: codecov/codecov-action@v3
        if: always()
        with:
          files: ./coverage/lcov.info

  build:
    name: 构建项目
    needs: lint-and-test
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout代码
        uses: actions/checkout@v4

      - name: 安装 pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: 设置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: 安装依赖
        run: pnpm install --frozen-lockfile

      - name: 构建生产版本
        run: pnpm build:prod

      - name: 上传构建产物
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
          retention-days: 7
`;

  fs.writeFileSync(ciBasicPath, ciBasicContent, 'utf-8');
  console.log('  ✅ 已创建: .github/workflows/ci-basic.yml');
} else {
  console.log('  ⏭️  跳过: .github/workflows/ci-basic.yml (已存在)');
}

console.log('');

// 5. 运行代码格式化
console.log('📝 步骤 5/5: 运行代码格式化...');

try {
  execSync('pnpm lint:prettier', { stdio: 'inherit' });
  console.log('  ✅ 代码格式化完成');
} catch (error) {
  console.log('  ⚠️  代码格式化失败，请手动运行: pnpm lint:prettier');
}

console.log('\n✨ 自动修复完成！\n');

console.log('📋 后续步骤：');
console.log('  1. 检查修改的文件，确认无误');
console.log('  2. 运行测试: pnpm test');
console.log('  3. 运行类型检查: pnpm type-check');
console.log('  4. 提交代码: git add . && git commit -m "chore: 自动修复代码问题"');
console.log('');
console.log('📖 详细优化清单请查看: OPTIMIZATION_CHECKLIST.md');
console.log('');
