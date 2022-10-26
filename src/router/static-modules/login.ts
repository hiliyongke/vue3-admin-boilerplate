import LogoutIcon from '@/assets/icons/assets-slide-logout.svg';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/loginRedirect',
    name: 'loginRedirect',
    meta: { title: '登录页', icon: LogoutIcon, single: true },
    redirect: '/login',
    children: []
  }
];
export default routes;
