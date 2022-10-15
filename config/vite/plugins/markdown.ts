/**
 * @name ConfigMarkDownPlugin
 * @description 支持*.md转vue组件 渲染Markdown文档
 */
// 使用说明
// <template>
//   <article>
//     <markdown-content />
//   </article>
// </template>

// <script>
// import { VueComponent } from './contents/the-doc.md'

// export default {
//   components: {
//     MarkdownContent: VueComponent
//   }
// };
// </script>
const mdPlugin = require('vite-plugin-markdown');
import { MARKDOWN } from '../../constant';

export const ConfigMarkDownPlugin = () => {
  MARKDOWN
    ? mdPlugin.plugin({
        mode: ['vue', 'html']
      })
    : [];
};
