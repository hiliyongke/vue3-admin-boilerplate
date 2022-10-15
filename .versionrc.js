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
      section: '✨【feat】:新功能'
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
      section: '📦【refactor】:代码重构'
    },
    {
      type: 'merge',
      hidden: true,
      section: '🔀【merge】:合并代码'
    },
    {
      type: 'test',
      hidden: true,
      section: '🚨【test】:单元测试'
    },
    {
      type: 'chore',
      hidden: true,
      section: '🔨【chore】:其他修改'
    },
    {
      type: 'ci',
      hidden: true,
      section: '🔧【ci】:项目结构变动 工具 ci 构建'
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
