#!/usr/bin/env node

import { execSync } from 'child_process';
import chalk from 'chalk';

console.log(chalk.blue('🔍 检查项目依赖状态...'));

// 检查类型
try {
  console.log(chalk.yellow('📝 运行类型检查...'));
  execSync('pnpm run typecheck', { stdio: 'pipe' });
  console.log(chalk.green('✅ 类型检查通过'));
} catch (error) {
  console.log(chalk.red('❌ 类型检查失败'));
}

// 检查 lint
try {
  console.log(chalk.yellow('🔧 运行代码检查...'));
  execSync('pnpm run lint', { stdio: 'pipe' });
  console.log(chalk.green('✅ 代码检查通过'));
} catch (error) {
  console.log(chalk.red('❌ 代码检查有问题'));
}

// 检查构建
try {
  console.log(chalk.yellow('🏗️  运行构建测试...'));
  execSync('pnpm run build', { stdio: 'pipe' });
  console.log(chalk.green('✅ 构建成功'));
} catch (error) {
  console.log(chalk.red('❌ 构建失败'));
}

console.log(chalk.blue('🎉 依赖检查完成！'));
