import request from '@/utils/request';

const Api = {
  Login: 'mock/api/user/login',
  getUser: 'mock/api/user/getUser'
};

export function login(data: {
  phone: string;
  account: string;
  password: string;
  verifyCode: string;
  checked: boolean;
}) {
  return request.post({
    url: Api.Login,
    data
  });
}

export function getUser(data: { token: string }) {
  return request.post({
    url: Api.getUser,
    data
  });
}
