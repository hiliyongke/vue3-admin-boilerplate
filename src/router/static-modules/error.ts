import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:path(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/result/404/index.vue'),
    meta: { title: '访问页面不存在页', hidden: true },
  },
];
export default routes;
