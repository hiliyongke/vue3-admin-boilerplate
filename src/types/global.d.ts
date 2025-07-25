// 全局类型声明文件

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 扩展 ImportMeta 接口
declare interface ImportMeta {
  glob: (pattern: string, options?: { eager?: boolean }) => Record<string, any>
  globEager: (pattern: string) => Record<string, any>
}

// Pinia Store 类型扩展
declare module 'pinia' {
  export interface PiniaCustomProperties {
    displayMode?: string
    language?: string
    colorList?: any
  }
}

// 组件类型声明
declare module '@/components/json-schema-editor/index.vue' {
  const JsonSchemaEditor: any
  export default JsonSchemaEditor
}

// 工具库类型声明
declare module 'generate-schema' {
  const GenerateSchema: any
  export default GenerateSchema
}

declare module 'dom-to-image' {
  const domtoimage: any
  export default domtoimage
}

declare module 'pinyin' {
  const pinyin: any
  export default pinyin
}

declare module 'sortablejs' {
  const Sortable: any
  export default Sortable
}

declare module 'wangeditor' {
  const E: any
  export default E
}

declare module 'vue-pdf-embed' {
  const VuePdfEmbed: any
  export default VuePdfEmbed
}

declare module 'vue3-pdfjs/esm' {
  export function createLoadingTask(src: string): any
}

declare module 'qrcode.vue' {
  const QrcodeVue: any
  export default QrcodeVue
}

declare module 'splitpanes' {
  export const Splitpanes: any
  export const Pane: any
}

declare module 'tvision-color' {
  export const Color: any
}

declare module 'vue-clipboard3' {
  const useClipboard: any
  export default useClipboard
}

// 全局变量声明
declare const process: {
  env: {
    NODE_ENV: string
    [key: string]: any
  }
}
