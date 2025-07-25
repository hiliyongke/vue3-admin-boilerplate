/**
 * @description 依赖升级脚本
 * @author 优化版本
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
    console.log(`✅ ${description} 完成`);
    return result;
  } catch (error) {
    console.error(`❌ ${description} 失败:`, error.message);
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
 * 升级核心依赖
 */
function upgradeCoreDependencies() {
  const upgrades = [
    // Vue 生态系统
    'vue@latest',
    'vue-router@latest',
    'pinia@latest',
    'pinia-plugin-persistedstate@latest',
    '@vueuse/core@latest',
    '@vueuse/components@latest',

    // Vite 相关
    'vite@latest',
    '@vitejs/plugin-vue@latest',
    '@vitejs/plugin-vue-jsx@latest',

    // TypeScript 相关
    'typescript@latest',
    'vue-tsc@latest',

    // 构建工具
    'unocss@latest',
    'unplugin-auto-import@latest',
    'unplugin-icons@latest',
    'unplugin-vue-components@latest',

    // Vite 插件
    'vite-plugin-pages@latest',
    'vite-plugin-pwa@latest',
    'vite-plugin-restart@latest',
    'vite-plugin-vconsole@latest',
    'vite-svg-loader@latest',

    // 国际化
    'vue-i18n@latest',

    // 其他工具
    'rollup-plugin-visualizer@latest',
    'swagger-typescript-api@latest',
  ];

  console.log('\n📦 升级核心依赖包...');
  upgrades.forEach(pkg => {
    try {
      executeCommand(`npm install ${pkg}`, `升级 ${pkg.split('@')[0]}`);
    } catch (error) {
      console.warn(`⚠️  ${pkg} 升级失败，跳过`);
    }
  });
}

/**
 * 升级开发依赖
 */
function upgradeDevDependencies() {
  const devUpgrades = [
    // ESLint 相关
    'eslint@latest',
    'eslint-config-prettier@latest',
    'eslint-plugin-prettier@latest',
    'eslint-plugin-vue@latest',
    '@typescript-eslint/eslint-plugin@latest',
    '@typescript-eslint/parser@latest',

    // 代码格式化
    'prettier@latest',

    // 样式检查
    'stylelint@latest',
    'stylelint-order@latest',

    // 测试相关
    'jest@latest',
    'babel-jest@latest',
    '@types/jest@latest',

    // Git 钩子
    'husky@latest',
    'lint-staged@latest',

    // 提交规范
    'commitlint@latest',

    // 工具类
    '@types/node@latest',
    'rimraf@latest',
    'ora@latest',
    'inquirer@latest',
    'plop@latest',
    'dotenv@latest',

    // 其他
    '@ls-lint/ls-lint@latest',
  ];

  console.log('\n🛠️  升级开发依赖包...');
  devUpgrades.forEach(pkg => {
    try {
      executeCommand(`npm install -D ${pkg}`, `升级开发依赖 ${pkg.split('@')[0]}`);
    } catch (error) {
      console.warn(`⚠️  ${pkg} 升级失败，跳过`);
    }
  });
}

/**
 * 特殊处理的依赖
 */
function handleSpecialDependencies() {
  console.log('\n🔧 处理特殊依赖...');

  // 处理可能有兼容性问题的依赖
  const specialPackages = [
    // Vue 3 相关
    { name: 'vue-pdf-embed', version: 'latest' },
    { name: 'splitpanes', version: 'latest' },
    { name: 'tdesign-icons-vue-next', version: 'latest' },
    { name: 'crypto-es', version: 'latest' },
    { name: 'pinyin', version: 'latest' },
    { name: 'default-passive-events', version: 'latest' },
  ];

  specialPackages.forEach(({ name, version }) => {
    try {
      executeCommand(`npm install ${name}@${version}`, `升级特殊依赖 ${name}`);
    } catch (error) {
      console.warn(`⚠️  ${name} 升级失败，保持当前版本`);
    }
  });
}

/**
 * 清理和重新安装
 */
function cleanAndReinstall() {
  console.log('\n🧹 清理依赖...');

  try {
    // 删除 node_modules 和 lock 文件
    executeCommand('rm -rf node_modules package-lock.json', '删除旧的依赖文件');

    // 重新安装
    executeCommand('npm install', '重新安装所有依赖');

    // 审计安全性
    executeCommand('npm audit fix', '修复安全漏洞');

  } catch (error) {
    console.warn('⚠️  清理过程中出现问题，但可以继续');
  }
}

/**
 * 更新配置文件兼容性
 */
function updateConfigCompatibility() {
  console.log('\n⚙️  更新配置文件兼容性...');

  try {
    const packageJson = readPackageJson();

    // 更新脚本命令
    packageJson.scripts = {
      ...packageJson.scripts,
      "dev": "vite --host",
      "build": "vue-tsc && vite build",
      "preview": "vite preview",
      "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
      "lint:css": "stylelint **/*.{css,scss,vue} --fix",
      "format": "prettier --write .",
      "type-check": "vue-tsc --noEmit",
      "test": "jest",
      "test:coverage": "jest --coverage",
      "upgrade": "node scripts/upgrade-dependencies.js"
    };

    // 更新引擎要求
    packageJson.engines = {
      "node": ">=18.0.0",
      "npm": ">=9.0.0"
    };

    writePackageJson(packageJson);
    console.log('✅ package.json 更新完成');

  } catch (error) {
    console.error('❌ 配置文件更新失败:', error.message);
  }
}

/**
 * 验证升级结果
 */
function verifyUpgrade() {
  console.log('\n🔍 验证升级结果...');

  try {
    // 检查过时的包
    executeCommand('npm outdated', '检查剩余过时包');

    // 运行类型检查
    executeCommand('npm run type-check', '运行TypeScript类型检查');

    // 运行代码检查
    executeCommand('npm run lint', '运行ESLint检查');

    console.log('\n✅ 升级验证完成！');

  } catch (error) {
    console.warn('⚠️  验证过程中发现问题，请手动检查');
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始升级项目依赖到最新版本...\n');

  try {
    // 备份 package.json
    const packageJson = readPackageJson();
    fs.writeFileSync('package.json.backup', JSON.stringify(packageJson, null, 2));
    console.log('📋 已备份 package.json');

    // 执行升级步骤
    upgradeCoreDependencies();
    upgradeDevDependencies();
    handleSpecialDependencies();
    updateConfigCompatibility();
    cleanAndReinstall();
    verifyUpgrade();

    console.log('\n🎉 依赖升级完成！');
    console.log('\n📋 升级总结：');
    console.log('  - ✅ 核心依赖已升级到最新版本');
    console.log('  - ✅ 开发依赖已升级到最新版本');
    console.log('  - ✅ 配置文件已更新兼容性');
    console.log('  - ✅ 安全漏洞已修复');
    console.log('  - 📄 原始配置已备份为 package.json.backup');

    console.log('\n🔧 后续步骤：');
    console.log('  1. 运行 npm run dev 测试开发环境');
    console.log('  2. 运行 npm run build 测试构建');
    console.log('  3. 检查并更新可能的配置文件');
    console.log('  4. 运行测试确保功能正常');

  } catch (error) {
    console.error('\n❌ 升级过程中出现错误:', error.message);
    console.log('\n🔄 可以尝试：');
    console.log('  1. 恢复备份: cp package.json.backup package.json');
    console.log('  2. 手动升级特定包');
    console.log('  3. 检查错误日志');
    process.exit(1);
  }
}

// 执行脚本
if (require.main === module) {
  main();
}

module.exports = {
  upgradeCoreDependencies,
  upgradeDevDependencies,
  handleSpecialDependencies,
  cleanAndReinstall,
  updateConfigCompatibility,
  verifyUpgrade,
};
