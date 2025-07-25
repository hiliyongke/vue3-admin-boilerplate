// API 服务相关

import request from '@/utils/request';

// 用户相关 API
export const userApi = {
  // 获取用户信息
  getUserInfo: () => request.get({ url: '/user/info' }),

  // 更新用户信息
  updateUserInfo: (data: any) => request.put({ url: '/user/info', data }),

  // 用户登录
  login: (data: { account: string; password: string }) => request.post({ url: '/auth/login', data }),

  // 用户登出
  logout: () => request.post({ url: '/auth/logout' }),

  // 刷新令牌
  refreshToken: (refreshToken: string) => request.post({ url: '/auth/refresh', data: { refreshToken } }),
};

// 系统相关 API
export const systemApi = {
  // 获取系统配置
  getConfig: () => request.get({ url: '/system/config' }),

  // 更新系统配置
  updateConfig: (data: any) => request.put({ url: '/system/config', data }),

  // 获取菜单列表
  getMenuList: () => request.get({ url: '/system/menu' }),

  // 获取权限列表
  getPermissions: () => request.get({ url: '/system/permissions' }),
};

// 文件上传 API
export const uploadApi = {
  // 上传文件
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request.post({
      url: '/upload/file',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 上传图片
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return request.post({
      url: '/upload/image',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
