#!/usr/bin/env node

/**
 * 自动修复所有脚本问题
 * 使用方法: node scripts/fix-all-issues.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(`  ${title}`, 'cyan');
  log(`${'='.repeat(60)}\n`, 'cyan');
}

function exec(command, options = {}) {
  try {
    const result = execSync(command, {
      cwd: projectRoot,
      stdio: 'pipe',
      ...options,
    });
    return result.toString().trim();
  } catch (error) {
    if (options.ignoreError) {
      return '';
    }
    throw error;
  }
}

function fileExists(filePath) {
  return fs.existsSync(path.join(projectRoot, filePath));
}

function readFile(filePath) {
  return fs.readFileSync(path.join(projectRoot, filePath), 'utf-8');
}

function writeFile(filePath, content) {
  const fullPath = path.join(projectRoot, filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, 'utf-8');
}

// 主修复流程
async function main() {
  log('\n🔧 开始修复所有脚本问题...\n', 'blue');

  try {
    // 1. 修复 ESLint 错误
    logSection('1️⃣  修复 ESLint 错误');
    log('运行: pnpm lint --fix', 'yellow');
    exec('pnpm lint --fix', { ignoreError: true });
    log('✅ ESLint 修复完成\n', 'green');

    // 2. 修复 CSS 错误
    logSection('2️⃣  修复 CSS 错误');
    log('运行: pnpm lint:css --fix', 'yellow');
    exec('pnpm lint:css --fix', { ignoreError: true });
    log('✅ CSS 修复完成\n', 'green');

    // 3. 修复代码格式
    logSection('3️⃣  修复代码格式');
    log('运行: pnpm lint:prettier --write', 'yellow');
    exec('pnpm lint:prettier --write "src/**/*.{vue,js,jsx,ts,tsx,json,css,scss,less}"', {
      ignoreError: true,
    });
    log('✅ 代码格式修复完成\n', 'green');

    // 4. 重命名目录
    logSection('4️⃣  重命名目录');
    const oldDir = path.join(projectRoot, 'src/shared/composables/__tests__');
    const newDir = path.join(projectRoot, 'src/shared/composables/tests');

    if (fs.existsSync(oldDir)) {
      log('重命名: __tests__ → tests', 'yellow');
      fs.renameSync(oldDir, newDir);
      log('✅ 目录重命名完成\n', 'green');
    } else {
      log('⚠️  目录已存在或不需要重命名\n', 'yellow');
    }

    // 5. 安装缺失依赖
    logSection('5️⃣  安装缺失依赖');
    log('检查 taze 是否已安装...', 'yellow');
    try {
      exec('pnpm list taze', { ignoreError: false });
      log('✅ taze 已安装\n', 'green');
    } catch {
      log('安装 taze...', 'yellow');
      exec('pnpm add -D taze');
      log('✅ taze 安装完成\n', 'green');
    }

    // 6. 验证修复
    logSection('6️⃣  验证修复结果');

    const checks = [
      { name: 'type-check', cmd: 'pnpm type-check' },
      { name: 'lint:check', cmd: 'pnpm lint:check' },
      { name: 'lint:css:check', cmd: 'pnpm lint:css:check' },
      { name: 'lint:file', cmd: 'pnpm lint:file' },
      { name: 'lint:prettier:check', cmd: 'pnpm lint:prettier:check' },
    ];

    let passCount = 0;
    let failCount = 0;

    for (const check of checks) {
      try {
        log(`检查 ${check.name}...`, 'yellow');
        exec(check.cmd);
        log(`✅ ${check.name} 通过\n`, 'green');
        passCount++;
      } catch (error) {
        log(`❌ ${check.name} 失败\n`, 'red');
        failCount++;
      }
    }

    // 7. 总结
    logSection('📊 修复总结');
    log(`通过: ${passCount}/${checks.length}`, 'green');
    log(`失败: ${failCount}/${checks.length}`, failCount > 0 ? 'red' : 'green');

    if (failCount === 0) {
      log('\n🎉 所有脚本检查都通过了！\n', 'green');
    } else {
      log('\n⚠️  还有部分检查失败，请手动修复\n', 'yellow');
      log('失败的检查需要手动处理：', 'yellow');
      for (const check of checks) {
        try {
          exec(check.cmd);
        } catch {
          log(`  - ${check.cmd}`, 'yellow');
        }
      }
    }

    // 8. 建议后续步骤
    logSection('📋 后续步骤');
    log('1. 运行测试: pnpm test:unit', 'cyan');
    log('2. 检查覆盖率: pnpm test:coverage', 'cyan');
    log('3. 提交代码: git add . && git commit -m "fix: 修复所有脚本问题"', 'cyan');
    log('4. 查看详细报告: cat SCRIPTS_VALIDATION_REPORT.md\n', 'cyan');
  } catch (error) {
    log(`\n❌ 修复过程中出错: ${error.message}\n`, 'red');
    process.exit(1);
  }
}

main();
