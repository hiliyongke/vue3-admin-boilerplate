import Layout from '@/layouts/index.vue';
import DetailIcon from '@/assets/icons/assets-slide-detail.svg';

export default [
  {
    path: '/demo',
    name: 'demo',
    component: Layout,
    redirect: '/demo/introduce',
    meta: { title: 'Demo', icon: DetailIcon },
    children: [
      {
        path: 'introduce',
        name: 'demo-introduce',
        component: () => import('@/pages/demo/introduce/index.vue'),
        meta: { title: '项目介绍' }
      },
      {
        path: 'i18n',
        name: 'demo-i18n',
        component: () => import('@/pages/demo/i18n/index.vue'),
        meta: { title: '国际化' }
      },
      {
        path: 'directives',
        name: 'demo-directives',
        component: () => import('@/pages/demo/directives/index.vue'),
        meta: { title: '指令测试' }
      },
      {
        path: 'drag-panel',
        name: 'demo-drag-panel',
        component: () => import('@/pages/demo/drag-panel/index.vue'),
        meta: { title: '拖拽面板' }
      },
      {
        path: 'signboard',
        name: 'demo-signboard',
        component: () => import('@/pages/demo/signboard/index.vue'),
        meta: { title: 'signboard' }
      },
      {
        path: 'webworker',
        name: 'demo-webworker',
        component: () => import('@/pages/demo/webworker/index.vue'),
        meta: { title: 'webworker' }
      },
      {
        path: 'code-editor',
        name: 'demo-code-editor',
        component: () => import('@/pages/demo/editor/index.vue'),
        meta: { title: '代码编辑器' }
      },
      {
        path: 'guide',
        name: 'demo-guide',
        component: () => import('@/pages/demo/guide/index.vue'),
        meta: { title: '新手引导' }
      },
      {
        path: 'pro-table',
        name: 'demo-pro-table',
        component: () => import('@/pages/demo/pro-table/index.vue'),
        meta: { title: '高级表格' }
      },
      {
        path: 'pdf-viewer',
        name: 'demo-pdf-viewer',
        component: () => import('@/pages/demo/pdf-viewer/index.vue'),
        meta: { title: 'paf预览' }
      },
      {
        path: 'yapi',
        name: 'demo-yapi',
        component: () => import('@/pages/demo/yapi/index.vue'),
        meta: { title: 'api预览' }
      },
      {
        path: 'sign',
        name: 'demo-sign',
        component: () => import('@/pages/demo/sign/index.vue'),
        meta: { title: '签名' }
      },
      {
        path: 'workflow',
        name: 'demo-workflow',
        component: () => import('@/pages/demo/workflow/index.vue'),
        meta: { title: '工作流' }
      },
      {
        path: 'secondePage',
        name: 'demo-secondePage',
        meta: { title: '二级菜单' },
        redirect: '/demo/introduce',
        children: [
          {
            path: 'introduce',
            name: 'demo-t-introduce',
            component: () => import('@/pages/demo/introduce/index.vue'),
            meta: { title: '三级菜单' }
          }
        ]
      }
    ]
  }
];
