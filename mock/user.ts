import { MockMethod } from 'vite-plugin-mock';

export function createFakeUserList() {
  return [
    {
      user_id: '3306',
      user_name: 'admin',
      real_name: '渣男',
      avatar: 'https://api.multiavatar.com/blindmonk.svg',
      desc: 'xxxxx',
      password: 'admin',
      token: 'main_token',
      organization: '某大型公司CTO',
      location: '中国',
      email: '896226896@qq.com',
      is_admin: 1,
      dev_languages: 'JavaScript/Vue/React/Node/PHP',
      roles: ['all', 'dev', 'test', 'admin']
    },
    {
      user_id: '80',
      user_name: 'test',
      real_name: '损友',
      avatar: 'https://api.multiavatar.com/test.svg',
      desc: '牛逼的大佬',
      password: 'test',
      token: 'other_token',
      organization: '某大型公司CTO',
      location: '中国',
      email: '8888@china.com',
      roles: ['UserIndex', 'DashboardBase', 'login'],
      is_admin: 0,
      dev_languages: 'JavaScript/Vue/React/Node/PHP'
    }
  ];
}
export default [
  {
    url: '/user/login',
    timeout: 20,
    method: 'post',
    response: (request: {
      body: {
        phone: string;
        account: string;
        password: string;
        verifyCode: string;
        checked: boolean;
      };
    }) => {
      const { account, password } = request?.body;
      const checkUser = createFakeUserList().find(
        item => item.user_name === account && item.password === password
      );
      if (!checkUser) {
        return {
          code: 0,
          data: {
            userInfo: null,
            token: ''
          },
          msg: '用户不存在'
        };
      }
      return {
        code: 0,
        data: {
          userInfo: checkUser,
          token: 'main_token'
        },
        msg: '登录成功'
      };
    }
  },
  {
    url: '/user/getUser',
    timeout: 20,
    method: 'post',
    response: (request: {
      body: {
        token;
      };
    }) => {
      const { token } = request?.body;
      const checkUser = createFakeUserList().find(item => item.token === token);
      if (!checkUser) {
        return {
          code: 1,
          data: null,
          msg: '用户不存在'
        };
      }
      return {
        code: 0,
        data: {
          userInfo: checkUser,
          token: 'main_token'
        },
        msg: '登录成功'
      };
    }
  },
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
