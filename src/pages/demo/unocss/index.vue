<template>
  <div
    h-full
    uno-padding-20
  >
    <div
      h-full
      text-center
      flex
      select-none
      all:transition-400
    >
      <div ma>
        <div
          text-5xl
          fw100
          animate-bounce-alt
          animate-count-infinite
          animate-1s
        >
          UnoCSS
        </div>
        <div
          op30
          dark:op60
          text-lg
          fw300
          m1
        >
          具有高性能且极具灵活性的即时原子化 CSS 引擎
        </div>
        <div
          m2
          flex
          justify-center
          text-lg
          op30
          dark:op60
          hover="op80"
          dark:hover="op80"
        >
          <a
            :href="readingLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            推荐阅读：重新构想原子化 CSS
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UnocssDemo'
};
</script>

<script setup lang="ts">
/**
 * 推荐阅读链接
 */
const readingLink: string = 'https://antfu.me/posts/reimagine-atomic-css-zh';
</script>
