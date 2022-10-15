import { MockMethod } from 'vite-plugin-mock';

export function createFakeUserList() {
  return [
    {
      user_id: '3306',
      user_name: 'blindmonk',
      real_name: 'xxx',
      avatar: 'https://api.multiavatar.com/blindmonk.svg',
      desc: 'xxxxx',
      password: 'blindmonk',
      token: 'P1DeqWBao0HTU47Q',
      organization: '某大型公司CTO',
      location: '中国',
      email: '896226896@qq.com',
      auths: [],
      is_admin: 1,
      dev_languages: 'JavaScript/Vue/React/Node/PHP',
      role: 'admin'
    },
    {
      user_id: '80',
      user_name: 'test',
      real_name: '盲僧水友',
      avatar: 'https://api.multiavatar.com/test.svg',
      desc: '欢迎加入扫地盲僧水友群',
      password: 'test',
      token: 'yg8bE8nZwiCL4nQg',
      organization: '某大型公司CTO',
      location: '中国',
      email: '8888@china.com',
      auths: [],
      is_admin: 0,
      dev_languages: 'JavaScript/Vue/React/Node/PHP',

      role: 'user'
    }
  ];
}
export default [
  // {
  //   url: '/user/login',
  //   timeout: 200,
  //   method: 'post',
  //   response: (request: requestParams) => {
  //     const { username, password } = request?.body;
  //     const checkUser = createFakeUserList().find(
  //       item => item.user_name === username && item.password === password
  //     );
  //     if (!checkUser) {
  //       return errorResult('不存在该用户');
  //     }
  //     return successResult({ token: checkUser.token });
  //   }
  // },
  {
    url: '/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';
      await new Promise(resolve => {
        req.on('data', chunk => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    }
  }
] as MockMethod[];
