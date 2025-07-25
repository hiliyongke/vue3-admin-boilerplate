<template>
  <l-header
    v-if="settingStore.showHeader"
    :show-logo="settingStore.showHeaderLogo"
    :theme="(settingStore.displayMode as 'light' | 'dark')"
    :layout="settingStore.layout"
    :is-fixed="settingStore.isHeaderFixed"
    :menu="headerMenu"
    :is-compact="settingStore.isSidebarCompact"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { usePermissionStore, useSettingStore } from '@/store';
import LHeader from './header.vue';

const permissionStore = usePermissionStore();
const settingStore = useSettingStore();
const { routers: menuRouters } = storeToRefs(permissionStore);
const headerMenu = computed(() => {
  if (settingStore.layout === 'mix') {
    if (settingStore.splitMenu) {
      return (menuRouters.value || []).map(menu => {
        return {
          path: menu.path || '',
          title: (menu.meta?.title as string) || '',
          icon: menu.meta?.icon as string,
          redirect: menu.redirect as string,
          children: [],
          meta: menu.meta || {}
        };
      });
    }
    return [];
  }
  return (menuRouters.value || []).map(menu => {
    return {
      path: menu.path || '',
      title: (menu.meta?.title as string) || '',
      icon: menu.meta?.icon as string,
      redirect: menu.redirect as string,
      children: (menu.children || []).map(child => ({
        path: child.path || '',
        title: (child.meta?.title as string) || '',
        icon: child.meta?.icon as string,
        redirect: child.redirect as string,
        children: [],
        meta: child.meta || {}
      })),
      meta: menu.meta || {}
    };
  });
});
</script>
