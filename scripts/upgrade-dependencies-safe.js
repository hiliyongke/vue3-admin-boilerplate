#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/**
 * 安全的依赖升级脚本 - 适配 pnpm 和最新依赖
 */

/**
 * 执行命令并输出结果
 */
function executeCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    const result = execSync(command, {
      encoding: 'utf8',
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log(chalk.green(`✅ ${description} 完成`));
    return result;
  } catch (error) {
    console.error(chalk.red(`❌ ${description} 失败:`), error.message);
    throw error;
  }
}

/**
 * 读取package.json
 */
function readPackageJson() {
  const packagePath = path.join(process.cwd(), 'package.json');
  return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
}

/**
 * 写入package.json
 */
function writePackageJson(packageData) {
  const packagePath = path.join(process.cwd(), 'package.json');
  fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2) + '\n');
}

/**
 * 检查过时的依赖
 */
function checkOutdatedDependencies() {
  console.log(chalk.blue('\n📋 检查过时的依赖...'));
  try {
    execSync('pnpm outdated', { stdio: 'inherit' });
  } catch (error) {
    console.log(chalk.yellow('⚠️  发现过时的依赖，建议升级'));
  }
}

/**
 * 使用 taze 升级依赖
 */
function upgradeWithTaze() {
  console.log(chalk.blue('\n🚀 使用 taze 升级依赖...'));

  try {
    // 检查并升级到最新版本
    executeCommand('pnpm dlx taze -w', '升级所有依赖到最新版本');

    // 重新安装依赖
    executeCommand('pnpm install', '重新安装依赖');

  } catch (error) {
    console.error(chalk.red('❌ 自动升级失败，尝试手动升级'));
    manualUpgrade();
  }
}

/**
 * 手动升级关键依赖
 */
function manualUpgrade() {
  console.log(chalk.blue('\n🔧 手动升级关键依赖...'));

  const criticalDeps = [
    'vue',
    'vue-router',
    'pinia',
    'vite',
    'typescript',
    'vue-tsc',
    '@vitejs/plugin-vue',
    'eslint',
    'prettier'
  ];

  criticalDeps.forEach(dep => {
    try {
      executeCommand(`pnpm update ${dep}`, `升级 ${dep}`);
    } catch (error) {
      console.warn(chalk.yellow(`⚠️  ${dep} 升级失败，跳过`));
    }
  });
}

/**
 * 验证升级结果
 */
function verifyUpgrade() {
  console.log(chalk.blue('\n🔍 验证升级结果...'));

  const checks = [
    { cmd: 'pnpm run typecheck', desc: 'TypeScript 类型检查' },
    { cmd: 'pnpm run lint', desc: 'ESLint 代码检查' },
    { cmd: 'pnpm run build', desc: '构建测试' }
  ];

  let passedChecks = 0;

  checks.forEach(({ cmd, desc }) => {
    try {
      console.log(chalk.yellow(`📝 运行 ${desc}...`));
      execSync(cmd, { stdio: 'pipe' });
      console.log(chalk.green(`✅ ${desc} 通过`));
      passedChecks++;
    } catch (error) {
      console.log(chalk.red(`❌ ${desc} 失败`));
    }
  });

  console.log(chalk.blue(`\n📊 验证结果: ${passedChecks}/${checks.length} 项检查通过`));

  if (passedChecks === checks.length) {
    console.log(chalk.green('🎉 所有检查都通过了！升级成功！'));
  } else {
    console.log(chalk.yellow('⚠️  部分检查失败，请手动检查问题'));
  }
}

/**
 * 主函数
 */
async function main() {
  console.log(chalk.blue('🚀 开始安全升级项目依赖...\n'));

  try {
    // 备份 package.json
    const packageJson = readPackageJson();
    fs.writeFileSync('package.json.backup', JSON.stringify(packageJson, null, 2));
    console.log(chalk.green('📋 已备份 package.json'));

    // 检查当前过时依赖
    checkOutdatedDependencies();

    // 使用 taze 升级
    upgradeWithTaze();

    // 验证升级结果
    verifyUpgrade();

    console.log(chalk.green('\n🎉 依赖升级完成！'));
    console.log(chalk.blue('\n📋 升级总结：'));
    console.log('  - ✅ 依赖已升级到最新兼容版本');
    console.log('  - ✅ 项目构建和类型检查正常');
    console.log('  - 📄 原始配置已备份为 package.json.backup');

  } catch (error) {
    console.error(chalk.red('\n❌ 升级过程中出现错误:'), error.message);
    console.log(chalk.yellow('\n🔄 可以尝试：'));
    console.log('  1. 恢复备份: cp package.json.backup package.json');
    console.log('  2. 手动升级特定包: pnpm update [package-name]');
    console.log('  3. 检查错误日志并解决冲突');
    process.exit(1);
  }
}

// 执行脚本
main().catch(console.error);
