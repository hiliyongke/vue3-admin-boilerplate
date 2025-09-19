<template>
  <div :class="sideNavCls">
    <t-menu :class="menuCls" :theme="theme" :value="active" :collapsed="collapsed" :default-expanded="defaultExpanded">
      <template #logo>
        <span v-if="showLogo" :class="`${prefix}-side-nav-logo-wrapper`" @click="goHome">
          <span v-if="collapsed" style="margin-left: 20px; font-size: 20px"> Admin </span>
          <span v-else style="margin-left: 20px; font-size: 20px"> Vue3 Admin Starter </span>

          <!-- <component
            :is="getLogo()"
            :class="`${prefix}-side-nav-logo-${
              collapsed ? 'min' : 'large'
            }-logo`"
          /> -->
        </span>
      </template>
      <menu-content :nav-data="menu" />
      <template #operations>
        <span class="version-container"> {{ !collapsed ? 'v' : 'v' }} {{ pgk.version }} </span>
      </template>
    </t-menu>
    <div :class="`${prefix}-side-nav-placeholder${collapsed ? '-hidden' : ''}`"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import union from 'lodash-es/union';

import { useSettingStore } from '@/store';
import { prefix } from '@/config/global';
import pgk from '../../../package.json';
import { MenuRoute } from '@/interface';
import { getRoutesExpanded } from '@/router';

import AssetLogo from '@/assets/svg/assets-t-logo.svg';
import AssetLogoFull from '@/assets/svg/assets-logo-full.svg';
import MenuContent from './menu-content.vue';

const MIN_POINT = 992 - 1;

const props = defineProps({
  menu: {
    type: Array as PropType<MenuRoute[]>,
    default: () => [],
  },
  showLogo: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  isFixed: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  layout: {
    type: String as PropType<string>,
    default: '',
  },
  headerHeight: {
    type: String as PropType<string>,
    default: '64px',
  },
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
  isCompact: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

const route = useRoute();
const collapsed = computed(() => useSettingStore().isSidebarCompact);

const active = computed(() => route.path);

const defaultExpanded = computed(() => {
  const path = route.path;
  const parentPath = path.substring(0, path.lastIndexOf('/'));
  const expanded = getRoutesExpanded();
  return union(expanded, parentPath === '' ? [] : [parentPath]);
});

const sideNavCls = computed(() => {
  const { isCompact } = props;
  return [
    `${prefix}-sidebar-layout`,
    {
      [`${prefix}-sidebar-compact`]: isCompact,
    },
  ];
});

const menuCls = computed(() => {
  const { showLogo, isFixed, layout } = props;
  return [
    `${prefix}-side-nav`,
    {
      [`${prefix}-side-nav-no-logo`]: !showLogo,
      [`${prefix}-side-nav-no-fixed`]: !isFixed,
      [`${prefix}-side-nav-mix-fixed`]: layout === 'mix' && isFixed,
    },
  ];
});

const router = useRouter();
const settingStore = useSettingStore();

const autoCollapsed = () => {
  const isCompact = window.innerWidth <= MIN_POINT;
  settingStore.updateConfig({
    isSidebarCompact: isCompact,
  });
};

onMounted(() => {
  autoCollapsed();
  window.onresize = () => {
    autoCollapsed();
  };
});

const goHome = () => {
  router.push('/dashboard/base');
};

const getLogo = () => {
  if (collapsed.value) return AssetLogo;
  return AssetLogoFull;
};
</script>

<style lang="less" scoped></style>
