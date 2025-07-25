<template>
  <div>
    <span>Svg Icon图标</span>
    <ul class="icon-list">
      <li
        v-for="icon in icons"
        :key="icon"
      >
        <span>
          <SvgIcons :name="icon" />
          <span class="icon-name">{{ icon }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SvgDemo'
};
</script>

<script setup lang="ts">
import SvgIcons from '@/components/svg-icon/index.vue';

/**
 * 图标名称列表
 */
const icons: readonly string[] = [
  'excel',
  'fullscreen-exit',
  'fullscreen-line',
  'funnel',
  'light',
  'pdf',
  'ppt',
  'settings',
  'word'
] as const;
</script>

<style lang="less" scoped>
.icon-list {
  display: flex;
  padding: 0 !important;
  overflow: hidden;
  list-style: none;
  border: 1px solid #eaeefb;
  border-radius: 4px;
  flex-wrap: wrap;
}
.icon-list li {
  display: flex;
  flex-basis: 10.051%;
  align-items: center;
  justify-content: center;
  height: 300px;
  margin-right: -1px;
  margin-bottom: -1px;
  font-size: 13px;
  color: #666666;
  text-align: center;
  border-right: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.icon-list li:nth-child(10n) {
  border-right: none;
}
.icon-list li .free-icon {
  display: block;
  margin-bottom: 10px;
  font-size: 20px;
  color: #606266;
  transition: color 0.15s linear;
}
.icon-list li .icon-name {
  display: block;
  height: 1em;
  padding: 0 3px;
}
.icon-list li span {
  line-height: normal;
  color: #99a9bf;
  transition: color 0.15s linear;
}
.usage-list li {
  flex-basis: 33.33333%;
}
.usage-list li:nth-child(3) {
  border-right: none;
}
</style>
