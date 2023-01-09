import Layout from '@/layouts/index.vue';
import DetailIcon from '@/assets/svg/assets-slide-detail.svg';

export default [
  {
    path: '/demo',
    name: 'demo',
    component: Layout,
    redirect: '/demo/unocss',
    meta: { title: 'Demo', icon: DetailIcon, order: 8 },
    children: [
      {
        path: 'unocss',
        name: 'demo-unocss',
        component: () => import('@/pages/demo/unocss/index.vue'),
        meta: { title: 'unocss' }
      },
      {
        path: 'i18n',
        name: 'demo-i18n',
        component: () => import('@/pages/demo/i18n/index.vue'),
        meta: { title: '国际化' }
      },
      {
        path: 'pinyin',
        name: 'demo-pinyin',
        component: () => import('@/pages/demo/pinyin/index.vue'),
        meta: { title: '拼音' }
      },
      {
        path: 'directives',
        name: 'demo-directives',
        component: () => import('@/pages/demo/directives/index.vue'),
        meta: { title: '指令测试' }
      },
      {
        path: 'icons',
        name: 'demo-icons',
        component: () => import('@/pages/demo/svg/index.vue'),
        meta: { title: 'icons' }
      },
      {
        path: 'drag-panel',
        name: 'demo-drag-panel',
        component: () => import('@/pages/demo/drag-panel/index.vue'),
        meta: { title: '拆分布局' }
      },
      {
        path: 'signboard',
        name: 'demo-signboard',
        component: () => import('@/pages/demo/signboard/index.vue'),
        meta: { title: '拖拽列表' }
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
        path: 'rich-editor',
        name: 'demo-rich-editor',
        component: () => import('@/pages/demo/rich-editor/index.vue'),
        meta: { title: '文本编辑器' }
      },
      {
        path: 'md-editor',
        name: 'demo-md-editor',
        component: () => import('@/pages/demo/md-editor/index.vue'),
        meta: { title: 'md编辑器' }
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
        path: 'qrcode',
        name: 'demo-qrcode',
        component: () => import('@/pages/demo/qrcode/index.vue'),
        meta: { title: '二维码' }
      },
      {
        path: 'css-tree',
        name: 'demo-css-tree',
        redirect: '/demo/css-h-tree',
        meta: { title: 'css-tree' },
        children: [
          {
            path: 'css-h-tree',
            name: 'demo-css-h-tree',
            component: () =>
              import('@/pages/demo/css-tree/horizontal-tree/index.vue'),
            meta: { title: 'css-horizontal-tree' }
          },
          {
            path: 'css-v-tree',
            name: 'demo-css-v-tree',
            component: () =>
              import('@/pages/demo/css-tree/vertical-tree/index.vue'),
            meta: { title: 'vertical-tree' }
          }
        ]
      },
      {
        path: 'secondePage',
        name: 'demo-secondePage',
        meta: { title: '二级菜单' },
        redirect: '/demo/unocss',
        children: [
          {
            path: 'unocss',
            name: 'secondePage-demo-unocss',
            component: () => import('@/pages/demo/unocss/index.vue'),
            meta: { title: '三级菜单' }
          }
        ]
      }
    ]
  }
];
