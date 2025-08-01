<template>
  <div>
    <template v-if="setting.layout.value === 'side'">
      <t-layout
        key="side"
        :class="mainLayoutCls"
      >
        <t-aside><layout-side-nav /></t-aside>
        <t-layout>
          <t-header><layout-header /></t-header>
          <t-content><layout-content /></t-content>
        </t-layout>
      </t-layout>
    </template>

    <template v-else>
      <t-layout key="no-side">
        <t-header><layout-header /></t-header>
        <t-layout :class="mainLayoutCls">
          <layout-side-nav />
          <layout-content />
        </t-layout>
      </t-layout>
    </template>
    <setting-com />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useSettingStore, useTabsRouterStore } from '@/store';

import SettingCom from './setting.vue';
import LayoutHeader from './components/layout-header.vue';
import LayoutContent from './components/layout-content.vue';
import LayoutSideNav from './components/layout-side-nav.vue';

import { prefix } from '@/config/global';

import '@/style/layout.less';

const route = useRoute();
const settingStore = useSettingStore();
const tabsRouterStore = useTabsRouterStore();
const setting = storeToRefs(settingStore);

const mainLayoutCls = computed(() => [
  {
    't-layout--with-sider': settingStore.showSidebar
  }
]);

const appendNewRoute = () => {
  const {
    path,
    query,
    meta: { title },
    name
  } = route;
  tabsRouterStore.appendTabRouterList({
    path,
    query,
    title: title as string,
    name,
    isAlive: true
  });
};

onMounted(() => {
  appendNewRoute();
});

watch(
  () => route.path,
  () => {
    appendNewRoute();
    const layoutElement = document.querySelector(`.${prefix}-layout`);
    if (layoutElement) {
      layoutElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
);
</script>

<style lang="less" scoped></style>
