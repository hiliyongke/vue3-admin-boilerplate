import Layout from '@/layouts/index.vue';
import IFrame from '@/layouts/components/frame-blank.vue';

export default [
  {
    path: '/frame',
    name: 'Frame',
    component: Layout,
    redirect: '/frame/doc',
    meta: {
      icon: 'internet',
      title: '外部页面'
    },

    children: [
      {
        path: 'TDesign',
        name: 'TDesign',
        component: IFrame,
        meta: {
          frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
          title: 'TDesign 文档（内嵌）'
        }
      },
      {
        path: 'TDesign2',
        name: 'TDesign2',
        component: IFrame,
        meta: {
          frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
          frameBlank: true,
          title: 'TDesign 文档（外链）'
        }
      }
    ]
  }
];
