import Layout from '@/layouts/index.vue';
import FormIcon from '@/assets/svg/assets-slide-form.svg';

export default [
  {
    path: '/form',
    name: 'form',
    component: Layout,
    redirect: '/form/base',
    meta: { title: '表单页', icon: FormIcon, order: 1 },
    children: [
      {
        path: 'base',
        name: 'FormBase',
        component: () => import('@/pages/form/base/index.vue'),
        meta: { title: '基础表单页', isAlive: true }
      },
      {
        path: 'step',
        name: 'FormStep',
        component: () => import('@/pages/form/step/index.vue'),
        meta: { title: '分步表单页' }
      }
    ]
  }
];
