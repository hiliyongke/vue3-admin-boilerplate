import LogoutIcon from '@/assets/svg/assets-slide-logout.svg';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/loginRedirect',
    name: 'loginRedirect',
    meta: { title: '登录页', icon: LogoutIcon, single: true, order: 6 },
    redirect: '/login',
    children: [],
  },
];
export default routes;
