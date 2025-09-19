/*
  需求：实现一个拖拽指令，可在父元素区域任意拖拽元素。

  思路：
    1、设置需要拖拽的元素为absolute，其父元素为relative。
    2、鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
    3、鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
    4、鼠标松开(onmouseup)时完成一次拖拽
  
  使用：在 Dom 上加上 v-draggable 即可
  <div class="dialog-model" v-draggable></div>
*/
import type { App } from 'vue';

interface ElType extends HTMLElement {
  parentNode: any;
}
function draggable(el: ElType) {
  el.style.cursor = 'move';
  el.style.position = 'absolute';
  el.onmousedown = function (e) {
    const disX = e.pageX - el.offsetLeft;
    const disY = e.pageY - el.offsetTop;
    document.onmousemove = function (e) {
      let x = e.pageX - disX;
      let y = e.pageY - disY;
      const maxX = parseInt(window.getComputedStyle(el.parentNode).width) - parseInt(window.getComputedStyle(el).width);
      const maxY =
        parseInt(window.getComputedStyle(el.parentNode).height) - parseInt(window.getComputedStyle(el).height);
      if (x < 0) {
        x = 0;
      } else if (x > maxX) {
        x = maxX;
      }

      if (y < 0) {
        y = 0;
      } else if (y > maxY) {
        y = maxY;
      }
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
  };
}

export function draggableDirective(app: App) {
  app.directive('draggable', {
    // 当被绑定的元素插入到 DOM 中时……
    mounted(el, binding) {
      draggable(el);
    },
  });
}
