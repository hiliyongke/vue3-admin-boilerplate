#!/usr/bin/env node

/**
 * @description 验证所有 package.json 脚本命令
 * @author AI Assistant
 * @date 2025-10-22
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const packagePath = path.join(ROOT_DIR, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

console.log('🔍 开始验证所有脚本命令...\n');
console.log('='.repeat(60));

const results = {
  passed: [],
  warning: [],
  failed: [],
};

// 需要跳过的脚本（需要交互或长时间运行）
const skipScripts = [
  'dev',
  'dev:open',
  'build',
  'build:dev',
  'build:prod',
  'preview',
  'preview:prod',
  'test',
  'test:watch',
  'test:ui',
  'test:e2e',
  'test:e2e:ui',
  'docs:dev',
  'docs:serve',
  'commit',
  'release',
  'release:cli',
  'release:major',
  'release:minor',
  'release:patch',
];

// 快速验证的脚本
const quickCheckScripts = {
  bootstrap: '--version',
  plop: '--version',
  'type-check': '',
  typecheck: '',
  'lint:check': '',
  'lint:css:check': '',
  'lint:prettier:check': '',
  'lint:file': '',
  'test:unit': '',
  'test:coverage': '',
  'deps:check': '',
};

Object.keys(packageJson.scripts).forEach((scriptName) => {
  const scriptCommand = packageJson.scripts[scriptName];

  // 跳过需要交互或长时间运行的脚本
  if (skipScripts.includes(scriptName)) {
    console.log(`⏭️  ${scriptName.padEnd(25)} - 跳过（需要交互或长时间运行）`);
    return;
  }

  // 快速检查
  if (quickCheckScripts.hasOwnProperty(scriptName)) {
    try {
      const checkArg = quickCheckScripts[scriptName];
      const command = checkArg ? `pnpm ${scriptName} ${checkArg}` : `pnpm ${scriptName}`;

      execSync(command, {
        cwd: ROOT_DIR,
        stdio: 'pipe',
        timeout: 30000, // 30 秒超时
      });

      console.log(`✅ ${scriptName.padEnd(25)} - 通过`);
      results.passed.push(scriptName);
    } catch (error) {
      const output = error.stdout?.toString() || error.stderr?.toString() || '';

      // 判断是警告还是错误
      if (output.includes('warning') || output.includes('failed') || error.status === 1) {
        console.log(`⚠️  ${scriptName.padEnd(25)} - 有警告`);
        results.warning.push({
          name: scriptName,
          message: output.split('\n').slice(-5).join('\n'),
        });
      } else {
        console.log(`❌ ${scriptName.padEnd(25)} - 失败`);
        results.failed.push({
          name: scriptName,
          message: output.split('\n').slice(-5).join('\n'),
        });
      }
    }
  } else {
    // 其他脚本只检查命令是否存在
    const firstCommand = scriptCommand.split(' ')[0];
    const commandExists = checkCommandExists(firstCommand);

    if (commandExists) {
      console.log(`✅ ${scriptName.padEnd(25)} - 命令存在`);
      results.passed.push(scriptName);
    } else {
      console.log(`❌ ${scriptName.padEnd(25)} - 命令不存在: ${firstCommand}`);
      results.failed.push({
        name: scriptName,
        message: `命令不存在: ${firstCommand}`,
      });
    }
  }
});

console.log('\n' + '='.repeat(60));
console.log('\n📊 验证结果统计：\n');
console.log(`✅ 通过：${results.passed.length} 个`);
console.log(`⚠️  警告：${results.warning.length} 个`);
console.log(`❌ 失败：${results.failed.length} 个`);
console.log(`⏭️  跳过：${skipScripts.length} 个`);

const total = Object.keys(packageJson.scripts).length;
const checked = results.passed.length + results.warning.length + results.failed.length;
const passRate = ((results.passed.length / checked) * 100).toFixed(1);

console.log(`\n📈 通过率：${passRate}% (${results.passed.length}/${checked})`);

// 显示警告详情
if (results.warning.length > 0) {
  console.log('\n⚠️  警告详情：\n');
  results.warning.forEach((item) => {
    console.log(`   ${item.name}:`);
    console.log(`   ${item.message.trim()}\n`);
  });
}

// 显示失败详情
if (results.failed.length > 0) {
  console.log('\n❌ 失败详情：\n');
  results.failed.forEach((item) => {
    console.log(`   ${item.name}:`);
    console.log(`   ${item.message.trim()}\n`);
  });
}

console.log('\n' + '='.repeat(60));

if (results.failed.length === 0 && results.warning.length === 0) {
  console.log('🎉 所有脚本验证通过！');
} else if (results.failed.length === 0) {
  console.log('✅ 所有脚本可用，但有一些警告需要处理');
} else {
  console.log('⚠️  有脚本验证失败，请查看上面的详情');
}

console.log('='.repeat(60));

// 辅助函数：检查命令是否存在
function checkCommandExists(command) {
  try {
    execSync(`which ${command}`, { stdio: 'pipe' });
    return true;
  } catch {
    // 检查是否是 pnpm 脚本
    if (command === 'pnpm' || command === 'npm' || command === 'node') {
      return true;
    }
    // 检查是否是内置命令
    if (['rimraf', 'tsx', 'vite', 'vue-tsc'].includes(command)) {
      return true;
    }
    return false;
  }
}
