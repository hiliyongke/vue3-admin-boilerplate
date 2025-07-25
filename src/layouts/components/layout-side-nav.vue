<template>
  <l-side-nav
    v-if="settingStore.showSidebar"
    :show-logo="settingStore.showSidebarLogo"
    :layout="settingStore.layout"
    :is-fixed="settingStore.isSidebarFixed"
    :menu="sideMenu"
    :theme="(settingStore.displayMode as 'light' | 'dark')"
    :is-compact="settingStore.isSidebarCompact"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePermissionStore, useSettingStore } from '@/store';
import { MenuRoute } from '@/interface';
import LSideNav from './side-nav.vue';

const route = useRoute();
const permissionStore = usePermissionStore();
const settingStore = useSettingStore();
const { routers: menuRouters } = storeToRefs(permissionStore);

const sideMenu = computed(() => {
  const { layout, splitMenu } = settingStore;
  let newMenuRouters = (menuRouters.value || []) as MenuRoute[];
  if (layout === 'mix' && splitMenu) {
    newMenuRouters.forEach((menu: MenuRoute) => {
      if (menu && menu.path && route.path.indexOf(menu.path) === 0) {
        newMenuRouters = (menu.children || []).map((subMenu: MenuRoute) => ({
          ...subMenu,
          path: `${menu.path}/${subMenu.path}`
        }));
      }
    });
  }
  return newMenuRouters;
});
</script>
