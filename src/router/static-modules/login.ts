import LogoutIcon from '@/assets/icons/assets-slide-logout.svg';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'loginRedirect',
    meta: { title: '登录页', icon: LogoutIcon },
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'index',
        redirect: '/login',
        meta: { title: '登录中心' }
      }
    ]
  }
];
export default routes;
