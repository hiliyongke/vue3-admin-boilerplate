<template>
  <t-layout :class="`${prefix}-layout`">
    <t-tabs
      v-if="settingStore.isUseTabsRouter"
      theme="normal"
      :class="`${prefix}-layout-tabs-nav`"
      :value="$route.path"
      :style="{ position: 'sticky', top: 0, width: '100%' }"
      @change="handleChangeCurrentTab"
      @remove="handleRemove"
    >
      <t-tab-panel
        v-for="(routeItem, index) in tabRouters"
        :key="`${routeItem.path}_${index}`"
        :value="routeItem.path"
        :removable="!routeItem.isHome"
      >
        <template #label>
          <t-dropdown
            trigger="context-menu"
            :min-column-width="128"
            :popup-props="{
              overlayClassName: 'route-tabs-dropdown',
              onVisibleChange: (visible: boolean, ctx) => handleTabMenuClick(visible, ctx, routeItem.path),
              visible: activeTabPath === routeItem.path,
            }"
          >
            <template v-if="!routeItem.isHome">
              {{ routeItem.title }}
            </template>
            <t-icon v-else name="home" />
            <template #dropdown>
              <t-dropdown-menu>
                <t-dropdown-item @click="() => handleRefresh(routeItem, index)">
                  <t-icon name="refresh" />
                  刷新
                </t-dropdown-item>
                <t-dropdown-item v-if="index > 1" @click="() => handleCloseAhead(routeItem.path, index)">
                  <t-icon name="arrow-left" />
                  关闭左侧
                </t-dropdown-item>
                <t-dropdown-item
                  v-if="index < tabRouters.length - 1"
                  @click="() => handleCloseBehind(routeItem.path, index)"
                >
                  <t-icon name="arrow-right" />
                  关闭右侧
                </t-dropdown-item>
                <t-dropdown-item v-if="tabRouters.length > 2" @click="() => handleCloseOther(routeItem.path, index)">
                  <t-icon name="close-circle" />
                  关闭其它
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
          </t-dropdown>
        </template>
      </t-tab-panel>
    </t-tabs>
    <t-content :class="`${prefix}-content-layout`">
      <l-breadcrumb v-if="settingStore.showBreadcrumb" />
      <l-content />
    </t-content>
    <t-footer v-if="settingStore.showFooter" :class="`${prefix}-footer-layout`">
      <l-footer />
    </t-footer>
  </t-layout>
  <back-top :target="`.${prefix}-layout`" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSettingStore } from '@/store';
import { useNavigationTabStore } from '@/features/navigation/tabs';
import { createNavigationTabService } from '@/features/navigation/tabs';
import { prefix } from '@/config/global';
import type { NavigationTab } from '@/features/navigation/tabs';

import LContent from './content.vue';
import LBreadcrumb from './breadcrumb.vue';
import LFooter from './footer.vue';

const route = useRoute();
const router = useRouter();

const settingStore = useSettingStore();
const tabStore = useNavigationTabStore();
const navigationService = createNavigationTabService(router);
const tabRouters = computed(() => tabStore.visibleTabs);
const activeTabPath = ref('');

const handleChangeCurrentTab = (value: string | number) => {
  const path = String(value);
  const target = tabStore.allTabs.find((tab) => tab.path === path);
  if (target) {
    router.push({ path: target.path, query: target.query, hash: target.hash });
  }
};

const handleRemove = ({ value: path }) => {
  tabStore.close(String(path), 'self');
  const active = tabStore.activePath;
  if (active && active !== route.path) {
    const target = tabStore.allTabs.find((tab) => tab.path === active);
    if (target) {
      router.push({ path: target.path, query: target.query, hash: target.hash });
    }
  }
};

const handleRefresh = (tab: NavigationTab, index: number) => {
  navigationService.refresh(tab.path);
  activeTabPath.value = '';
};

const handleCloseAhead = (path: string, index: number) => {
  navigationService.close(path, 'left');
  redirectIfNeeded();
};

const handleCloseBehind = (path: string, index: number) => {
  navigationService.close(path, 'right');
  redirectIfNeeded();
};

const handleCloseOther = (path: string, index: number) => {
  navigationService.close(path, 'others');
  redirectIfNeeded();
};

const redirectIfNeeded = () => {
  const target = tabStore.allTabs.find((tab) => tab.path === tabStore.activePath);
  if (target && target.path !== route.path) {
    router.push({ path: target.path, query: target.query, hash: target.hash });
  }
  activeTabPath.value = '';
};
const handleTabMenuClick = (visible: boolean, ctx, path: string) => {
  if (ctx.trigger === 'document') activeTabPath.value = '';
  if (visible) activeTabPath.value = path;
};

onMounted(() => {
  navigationService.initialize();
});

watch(
  () => route.path,
  () => {
    const layoutElement = document.querySelector(`.${prefix}-layout`);
    if (layoutElement) {
      layoutElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
);
</script>
