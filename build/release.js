import chalk from 'chalk';
import cp from 'child_process';
import inquirer from 'inquirer';
import ora from 'ora';
import semver from 'semver';
import standardVersion from 'standard-version';
import fs from 'fs';
const text = fs.readFileSync('package.json', 'utf8');
const pkg = JSON.parse(text);

const execOptions = { encoding: 'utf8' };

const questions = [
  {
    type: 'list',
    name: 'version',
    message: `当前tag版本v${pkg.version}，请选择要发布的版本号:`,
    choices: () =>
      ['patch', 'minor', 'major']
        .map(key => {
          const value = semver.inc(pkg.version, key);
          return {
            name: `${key} (${value})`,
            value
          };
        })
        .concat({ name: 'custom', value: 'custom' }),
    default: 'minor'
  },
  {
    type: 'input',
    name: 'version',
    message: '选择输入自定义版本号:',
    askAnswered: true,
    when(answers) {
      return answers.version === 'custom';
    },
    validate(value) {
      const isExistVersion =
        cp.execSync(`git tag -l v${value}`, execOptions) ||
        cp.execSync(`git ls-remote --tags origin v${value}`, execOptions);

      if (!!isExistVersion) {
        return `你输入的v${value}已存在，请重新输入版本号或者删除本地或远程tag版本`;
      }

      return /^\d+\.\d+\.\d+/.test(value)
        ? true
        : '请输入正确的SemVer(语义化版本号)';
    }
  }
];

function createLogger() {
  return {
    info(msg) {
      console.log(chalk.blue(`⦿  ${msg}`));
    },
    warn(msg) {
      console.log(chalk.yellow(`ϟ ${msg}`));
    },
    success(msg) {
      console.log(chalk.green(`✔ ${msg}`));
    },
    error(e) {
      console.error(chalk.red(`✘ ${e}`));
    }
  };
}

const logger = createLogger();

(async () => {
  const { version } = await inquirer.prompt(questions);

  // 创建版本
  await standardVersion({
    noVerify: true,
    silent: false,
    releaseAs: version
  }).catch(err => {
    logger.error(err);
  });

  const { isPush } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isPush',
      message: `是否将版本v${version}，推送至远程仓库`
    }
  ]);

  if (isPush) {
    const spinner = ora('Git pushing...').start();

    try {
      const branch = cp.execSync(
        'git rev-parse --abbrev-ref HEAD',
        execOptions
      );
      // 执行推送
      cp.execSync(`git push --follow-tags origin ${branch}`, execOptions);
      logger.info('执行成功');
    } catch (error) {
      logger.error('执行失败，请尝试手动执行');
    }

    spinner.stop();
  }
})();
