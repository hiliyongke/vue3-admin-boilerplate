module.exports = {
  header: '# 更新日志',
  changelogHeader: '# Change Log', // change log title
  releaseCommitMessageFormat: 'release: 发布 v{{currentTag}}',
  issueUrlFormat: 'http://xxx/bug/{{id}}',
  types: [
    {
      type: 'WIP',
      hidden: true,
      section: '💪【WIP】:开发中'
    },
    {
      type: 'feat',
      section: '✨【feat】:新增功能'
    },
    {
      type: 'fix',
      section: '🐛【fix】:修复Bug'
    },
    {
      type: 'style',
      hidden: true,
      section: '💄【style】:更新UI'
    },
    {
      type: 'docs',
      hidden: true,
      section: '📝【docs】:更新注释、文档'
    },
    {
      type: 'refactor',
      hidden: true,
      section: '📦【refactor】:代码重构（不包括 bug 修复、功能新增）'
    },
    {
      type: 'merge',
      hidden: true,
      section: '🔀【merge】:合并代码'
    },
    {
      type: 'test',
      hidden: true,
      section: '🚨【test】:添加、修改测试用例'
    },
    {
      type: 'chore',
      hidden: true,
      section:
        '🔨【chore】:对构建过程或辅助工具和库的更改（不影响源文件、测试用例）'
    },
    {
      type: 'ci',
      hidden: true,
      section: '🔧【ci】:修改 CI 配置、脚本'
    },
    {
      type: 'revert',
      hidden: true,
      section: '⏪【revert】:版本回退'
    },
    {
      type: 'dep_up',
      hidden: true,
      section: '💎【dep_up】:更新依赖'
    },
    {
      type: 'release',
      section: '🚀【release】:发布版本或标签'
    },
    {
      type: 'init',
      section: '🎉【init】:初始化'
    }
  ]
};
