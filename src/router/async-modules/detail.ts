import Layout from '@/layouts/index.vue';
import DetailIcon from '@/assets/icons/assets-slide-detail.svg';

export default [
  {
    path: '/detail',
    name: 'detail',
    component: Layout,
    redirect: '/detail/base',
    meta: { title: '详情页', icon: DetailIcon },
    children: [
      {
        path: 'base',
        name: 'DetailBase',
        component: () => import('@/pages/detail/base/index.vue'),
        meta: { title: '基础详情页' }
      },
      {
        path: 'advanced',
        name: 'DetailAdvanced',
        component: () => import('@/pages/detail/advanced/index.vue'),
        meta: { title: '多卡片详情页' }
      },
      {
        path: 'deploy',
        name: 'DetailDeploy',
        component: () => import('@/pages/detail/deploy/index.vue'),
        meta: { title: '数据详情页' }
      },
      {
        path: 'secondary',
        name: 'DetailSecondary',
        component: () => import('@/pages/detail/secondary/index.vue'),
        meta: { title: '二级详情页' }
      }
    ]
  }
];
