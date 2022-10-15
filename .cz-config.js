// 参考：https://github.com/leoforfree/cz-customizable#options
const standard = require('./.versionrc.js');
module.exports = {
  // 可选类型
  types: standard.types.map(st => ({
    value: st.type,
    name: st.section
  })),
  // typePrefix: '[',
  // typeSuffix: ']',
  scopes: [{ name: 'demo' }, { name: 'account' }, { name: 'others' }],
  // 消息步骤
  messages: {
    type: '选择更改类型:\n',
    scope: '此次更改范围:\n',
    subject: '简要描述 (必填):\n',
    body: '详细描述. 使用"|"换行 (可选):\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关闭的issues列表. E.g.: #31, #34 (可选):\n',
    confirmCommit: '确认提交？yes/no'
  },
  // skipQuestions: ['scope', 'body', 'breaking', 'footer'], // 跳过问题
  subjectLimit: 100, // subject文字长度限制
  breaklineChar: '|', // It is supported for fields body and footer.
  footerPrefix: 'ISSUES CLOSED:'
};
