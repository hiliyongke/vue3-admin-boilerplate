import Layout from '@/layouts/index.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/examples',
    component: Layout,
    redirect: '/examples/use-request',
    name: 'Examples',
    meta: {
      title: '示例演示',
      icon: 'component-checkbox',
      order: 8,
    },
    children: [
      {
        path: 'use-request',
        name: 'UseRequestDemo',
        component: () => import('@/pages/examples/use-request-demo.vue'),
        meta: {
          title: 'useRequest 示例',
          icon: 'internet',
          keepAlive: true,
        },
      },
      {
        path: 'use-table',
        name: 'UseTableDemo',
        component: () => import('@/pages/examples/use-table-demo.vue'),
        meta: {
          title: 'useTable 示例',
          icon: 'table',
          keepAlive: true,
        },
      },
      {
        path: 'use-form',
        name: 'UseFormDemo',
        component: () => import('@/pages/examples/use-form-demo.vue'),
        meta: {
          title: 'useForm 示例',
          icon: 'edit',
          keepAlive: true,
        },
      },
    ],
  },
];

export default routes;
