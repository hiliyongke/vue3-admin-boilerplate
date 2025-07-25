import standard from './.versionrc';

const config = {
  // type 类型（定义之后，可通过上下键选择）
  types: standard.types.map(st => ({
    value: st.type,
    name: st.section
  })),
  // typePrefix: '[',
  // typeSuffix: ']',
  // scope 类型（定义之后，可通过上下键选择）
  scopes: [
    ['components', '组件相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['ui组件库', '对 ui组件库 的调整'],
    ['styles', '样式相关'],
    ['deps', '项目依赖'],
    ['auth', '对 auth 修改'],
    ['other', '其他修改']
    // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
    // ['custom', '以上都不是？我要自定义']
  ].map(([name, _description]) => {
    return {
      name
    };
  }),
  // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
  // allowCustomScopes: true,
  // 消息步骤
  messages: {
    type: '选择更改类型:\n',
    scope: '此次更改范围:\n',
    // 选择 scope: custom 时会出下面的提示
    customScope: '请输入自定义的 scope：',
    subject: '简要描述 (必填):\n',
    body: '详细描述. 使用"|"换行 (可选):\n',
    breaking: '列举非兼容性重大的变更（可选）:\n',
    footer: '列举出所有变更的 ISSUES CLOSED. E.g.: #31, #34 (可选):\n',
    confirmCommit: '确认提交？yes/no'
  },
  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ['feat', 'fix'],
  // 跳过要询问的步骤
  skipQuestions: ['body', 'footer'],
  subjectLimit: 100, // subject文字长度限制
  breaklineChar: '|', // 支持 body 和 footer
  footerPrefix: 'ISSUES CLOSED:'
};

export default config;
