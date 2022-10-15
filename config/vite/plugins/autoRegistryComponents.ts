/**
 * @name  AutoRegistryComponents
 * @description 由 Vue官方人员开发的一款自动引入插件，可以省去比如 UI 库的大量 import 语句（包括项目自身的组件和各种组件库中的组件）。使用此插件后，不需要手动编写import { Button } from 'xxx'这样的代码了，插件会自动识别template中使用的自定义组件并自动注册。
 */
import Components from 'unplugin-vue-components/vite'; // 按需加载自定义组件
import IconsResolver from 'unplugin-icons/resolver'; // 按需解析并载，基于 iconify 图标库支持按需访问上万种图标，当然，我们不使用图标库也是可以的。

import {
  TDesignResolver,
  VueUseComponentsResolver
} from 'unplugin-vue-components/resolvers';
export const AutoRegistryComponents = () => {
  // 按需引入
  return Components({
    dirs: [], // dirs这个配置的默认值就是 src/components。按需加载的文件夹,配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
    extensions: ['vue', 'md', 'tsx'],
    deep: true,
    dts: 'types/components.d.ts',
    directoryAsNamespace: true,
    globalNamespaces: [],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/, /\.tsx\?tsx/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      // 自动导入 iconify 图标组件
      IconsResolver({
        componentPrefix: '',
        extension: 'tsx'
      }),
      TDesignResolver({
        importStyle: false, // 指是否需要自动随引入加载对应的组件样式，我这里设置为 false，因为某些二级组件（比如 DateRangePicker）没办法准确地识别正确路径，他的搜寻路径都是按一级组件来写的，所以我改成了全量导入 css
        library: 'vue-next',
        resolveIcons: true // 配置是否对 `tdesign-icons' 的图标起作用。
      }),
      VueUseComponentsResolver() //默认使用VueUse组件
    ]
  });
};
