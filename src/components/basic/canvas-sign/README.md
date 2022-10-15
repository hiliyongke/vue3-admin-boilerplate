> 使用

```js
<template>
  <!-- 使用方法一 -->
  <CanvasSign ref="canvasSign" imageType="image/png" :width="width" :line-width="lineWidth" :image-qual="0.01" background-color="#EEE" />
  <div>
    <button @click="saveHandle">save</button>
    <button @click="clearHandle">clear</button>
  </div>
  <hr />
  <!-- 使用方法二 -->
  <CanvasSign ref="canvasSign2" :height="400" :width="width" :line-width="lineWidth">
    <template v-slot="{ save, clear }">
      <button @click="() => save(saveCallback)">save</button>
      <button @click="() => clearWithSlotHandle(clear)">clear</button>
    </template>
  </CanvasSign>
  <hr />
  <!-- 生成图片展示 -->
  <img :src="imgSrc" alt="生成的图片" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import CanvasSign, { ICanvasSign } from './canvas-sign'

const blankimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='
export default defineComponent({
  components: { CanvasSign },
  setup () {
    const imgSrc = ref(blankimg)
    const canvasSign = ref<ICanvasSign>()
    const canvasSign2 = ref<typeof CanvasSign>()
    // or
    // const canvasSign = ref<typeof CanvasSign>()

    // slot中save方法回调
    const saveCallback = (imgBase64?: string) => {
      imgSrc.value = imgBase64 || blankimg
    }
    // 不使用slot的save方法
    const saveHandle = () => {
      canvasSign.value?.save((img?: string) => {
        imgSrc.value = img || blankimg
      })
    }
    // 不使用slot的clear方法
    const clearHandle = () => {
      canvasSign.value?.clear() // 清空图片
      imgSrc.value = blankimg // 清空画布
    }
    // 使用slot的clear方法
    const clearWithSlotHandle = (clear: () => void) => {
      clear && clear() // 清空画布
      imgSrc.value = blankimg // 清空图片
    }

    onMounted(() => {
      window.onresize = () => {
        const w = document.documentElement.clientWidth || document.body.clientWidth
        width.value = w
        lineWidth.value = w / 100
        // 组件参数改变后，通过reset方法使属性生效
        canvasSign.value?.reset()
        canvasSign2.value?.reset()
      }
    })

    return {
      width,
      lineWidth,
      canvasSign,
      canvasSign2,
      imgSrc,
      saveCallback,
      saveHandle,
      clearHandle,
      clearWithSlotHandle
    }
  }
})
</script>

/**
 * 注册全局组件
 */
import CanvasSign from 'vue-canvas-sign'

app.component('CanvasSign', CanvasSign)
// or
//app.use(CanvasSign)
```

### 组件参数

| 参数            | 说明                                                                                                                                  | 类型   | 默认值                    | 可选值                                                           |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :----- | :------------------------ | :--------------------------------------------------------------- |
| width           | 画布宽                                                                                                                                | Number | document 宽度             |                                                                  |
| height          | 画布高                                                                                                                                | Number | `200`                     |                                                                  |
| lineWidth       | 画线粗细                                                                                                                              | Number | `2`                       |                                                                  |
| color           | 画线颜色                                                                                                                              | String | `#000`                    |                                                                  |
| backgroundColor | 画布背景色                                                                                                                            | String | `rgba(255, 255, 255, 0)`  |                                                                  |
| borderWidth     | 边框宽度                                                                                                                              | Number | `1`                       |                                                                  |
| borderColor     | 边框颜色                                                                                                                              | String | `#333`                    |                                                                  |
| imageType       | 生成图片类型，使用`image/jpeg`类型，注意修改`background`，清空画布再次绘制可能无法正常生成 base64，所以不推荐使用使用`image/jpeg`类型 | String | `image/png`（👍 推荐 🔥） | `image/png` &#124; `image/jpeg` &#124; `image/webp`(Chrome 支持) |
| imageQual       | 生成图片质量，imageType 为`image/jpeg`时生效                                                                                          | Number | `0.92`                    | `0 ~ 1` 之间数字                                                 |

### slot

| 属性  | 说明                                                              | 类型     | 参数                         |
| :---- | :---------------------------------------------------------------- | :------- | :--------------------------- |
| save  | 保存图片方法，需判断 imgBase64 是否为空                           | Function | callback(imgBase64?: string) |
| clear | 清空画布方法                                                      | Function | 无                           |
| reset | 组件参数改变后，通过 reset 方法使属性生效（reset 方法会清空画布） | Function | 无                           |
