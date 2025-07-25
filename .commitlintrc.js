module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复bug
        'docs',     // 文档更新
        'style',    // 代码格式调整
        'refactor', // 重构
        'perf',     // 性能优化
        'test',     // 测试相关
        'build',    // 构建相关
        'ci',       // CI/CD相关
        'chore',    // 其他杂项
        'revert'    // 回滚
      ]
    ],
    'subject-max-length': [2, 'always', 100],
    'subject-case': [0]
  }
}
