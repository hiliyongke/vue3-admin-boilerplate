// 模拟登录数据
const mockUsers = [
  {
    account: 'admin',
    password: 'admin',
    phone: '13800138000',
    token: 'admin_token_123456',
    userInfo: {
      user_name: '管理员',
      roles: ['admin'],
      avatar: '',
      email: 'admin@example.com',
    },
  },
  {
    account: 'user',
    password: '123456',
    phone: '13800138001',
    token: 'user_token_123456',
    userInfo: {
      user_name: '普通用户',
      roles: ['user'],
      avatar: '',
      email: 'user@example.com',
    },
  },
];

// 模拟登录延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login(data: {
  phone: string;
  account: string;
  password: string;
  verifyCode: string;
  checked: boolean;
}) {
  // 模拟网络延迟
  await delay(800);

  // 查找匹配的用户
  const user = mockUsers.find(
    (u) => (u.account === data.account || u.phone === data.phone) && u.password === data.password
  );

  if (user) {
    return {
      code: 200,
      message: '登录成功',
      token: user.token,
      userInfo: user.userInfo,
    };
  } else {
    throw new Error('账号或密码错误');
  }
}

export async function getUser(data: { token: string }) {
  // 模拟网络延迟
  await delay(500);

  // 根据 token 查找用户信息
  const user = mockUsers.find((u) => u.token === data.token);

  if (user) {
    return {
      code: 200,
      message: '获取用户信息成功',
      userInfo: user.userInfo,
    };
  } else {
    throw new Error('token 无效');
  }
}
