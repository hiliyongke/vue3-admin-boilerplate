<template>
  <div :class="layoutCls">
    <t-head-menu
      :class="menuCls"
      :theme="theme"
      expand-type="popup"
      :value="active"
    >
      <template #logo>
        <span
          v-if="showLogo"
          class="header-logo-container"
          @click="handleNav('/dashboard/base')"
        >
          <!-- <span class="t-logo">Vue3 Admin Starter</span> -->
          <logo-full class="t-logo" />
        </span>
        <div
          v-else
          class="header-operate-left"
        >
          <t-button
            theme="default"
            shape="square"
            variant="text"
            @click="changeCollapsed"
          >
            <t-icon
              class="collapsed-icon"
              name="view-list"
            />
          </t-button>
          <search :layout="layout" />
        </div>
      </template>
      <menu-content
        v-if="layout !== 'side'"
        class="header-menu"
        :nav-data="menu"
      />
      <template #operations>
        <div class="operations-container">
          <!-- 搜索框 -->
          <search
            v-if="layout !== 'side'"
            :layout="layout"
          />

          <!-- 全局通知 -->
          <notice />

          <t-tooltip
            placement="bottom"
            content="代码仓库"
          >
            <t-button
              theme="default"
              shape="square"
              variant="text"
              @click="navToGitHub"
            >
              <t-icon name="logo-github" />
            </t-button>
          </t-tooltip>
          <t-tooltip
            placement="bottom"
            content="帮助文档"
          >
            <t-button
              theme="default"
              shape="square"
              variant="text"
              @click="navToHelper"
            >
              <t-icon name="help-circle" />
            </t-button>
          </t-tooltip>
          <t-tooltip
            placement="bottom"
            content="锁定屏幕"
          >
            <t-button
              theme="default"
              shape="square"
              variant="text"
              @click="lockScreenStore.setLock(true)"
            >
              <t-icon name="lock-on" />
            </t-button>
          </t-tooltip>
          <ScreenFull />

          <LanguageSelect />

          <t-dropdown
            :min-column-width="135"
            trigger="click"
          >
            <template #dropdown>
              <t-dropdown-menu>
                <t-dropdown-item
                  class="operations-dropdown-container-item"
                  @click="handleNav('/user/index')"
                >
                  <t-icon name="user-circle" />
                  个人中心
                </t-dropdown-item>
                <t-dropdown-item
                  class="operations-dropdown-container-item"
                  @click="handleLogout"
                >
                  <t-icon name="poweroff" />
                  退出登录
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
            <t-button
              class="header-user-btn"
              theme="default"
              variant="text"
            >
              <template #icon>
                <t-icon name="user-circle" />
              </template>
              <div class="header-user-account">
                若尘
                <!-- <t-icon name="chevron-down" /> -->
              </div>
            </t-button>
          </t-dropdown>
          <t-tooltip
            placement="bottom"
            content="系统设置"
          >
            <t-button
              theme="default"
              shape="square"
              variant="text"
            >
              <t-icon
                name="setting"
                @click="toggleSettingPanel"
              />
            </t-button>
          </t-tooltip>
        </div>
      </template>
    </t-head-menu>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSettingStore } from '@/store';
import { getActive } from '@/router';
import { prefix } from '@/config/global';
import LogoFull from '@/assets/icons/assets-logo-full.svg';
import { MenuRoute } from '@/interface';

import Notice from './notice.vue';
import Search from './search.vue';
import MenuContent from './menu-content.vue';
import { useLockScreenStore } from '@/store/modules/lock-screen';
import LanguageSelect from './language-select.vue';
import ScreenFull from './screen-full.vue';
const props = defineProps({
  theme: {
    type: String,
    default: ''
  },
  layout: {
    type: String,
    default: 'top'
  },
  showLogo: {
    type: Boolean,
    default: true
  },
  menu: {
    type: Array as PropType<MenuRoute[]>,
    default: () => []
  },
  isFixed: {
    type: Boolean,
    default: false
  },
  isCompact: {
    type: Boolean,
    default: false
  },
  maxLevel: {
    type: Number,
    default: 3
  }
});

const router = useRouter();
const settingStore = useSettingStore();
const lockScreenStore = useLockScreenStore();

const toggleSettingPanel = () => {
  settingStore.updateConfig({
    showSettingPanel: true
  });
};

const active = computed(() => getActive());

const layoutCls = computed(() => [`${prefix}-header-layout`]);

const menuCls = computed(() => {
  const { isFixed, layout, isCompact } = props;
  return [
    {
      [`${prefix}-header-menu`]: !isFixed,
      [`${prefix}-header-menu-fixed`]: isFixed,
      [`${prefix}-header-menu-fixed-side`]: layout === 'side' && isFixed,
      [`${prefix}-header-menu-fixed-side-compact`]:
        layout === 'side' && isFixed && isCompact
    }
  ];
});

const changeCollapsed = () => {
  settingStore.updateConfig({
    isSidebarCompact: !settingStore.isSidebarCompact
  });
};

const handleNav = url => {
  router.push(url);
};

const handleLogout = () => {
  router.push(`/login?redirect=${router.currentRoute.value.fullPath}`);
};

const navToGitHub = () => {
  window.open('https://github.com/hiliyongke/vue3-boilerplate.git');
};

const navToHelper = () => {
  window.open('https://github.com/hiliyongke/vue3-boilerplate.git');
};
</script>
<style lang="less" scoped>
.@{starter-prefix}-header {
  &-layout {
    height: 64px;
  }
  &-menu-fixed {
    position: fixed;
    top: 0;
    z-index: 1001;
    &-side {
      right: 0;
      left: 232px;
      z-index: 10;
      width: auto;
      transition: all 0.3s;
      &-compact {
        left: 64px;
      }
    }
  }
  &-logo-container {
    display: inline-flex;
    height: 64px;
    cursor: pointer;
  }
}
.header-menu {
  flex: 1 1 1;
  display: inline-flex;
  :deep(.t-menu__item) {
    min-width: unset;
    padding: 0px 6px;
  }
}
.operations-container {
  display: flex;
  align-items: center;
  margin-right: 12px;
  .t-popup__reference {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .t-button {
    margin: 0 8px;
    &.header-user-btn {
      margin: 0;
    }
  }
  .t-icon {
    font-size: 20px;
    &.general {
      margin-right: 16px;
    }
  }
}
.header-operate-left {
  display: flex;
  margin-left: 20px;
  align-items: normal;
  line-height: 0;
  .collapsed-icon {
    font-size: 20px;
  }
}
.header-logo-container {
  display: flex;
  width: 184px;
  height: 26px;
  margin-left: 24px;
  color: var(--td-text-color-primary);
  .t-logo {
    width: 100%;
    height: 100%;
    &:hover {
      cursor: pointer;
    }
  }
  &:hover {
    cursor: pointer;
  }
}
.header-user-account {
  display: inline-flex;
  align-items: center;
  color: var(--td-text-color-primary);
  .t-icon {
    margin-left: 4px;
    font-size: 16px;
  }
}
:deep(.t-head-menu__inner) {
  border-bottom: 1px solid var(--td-border-level-1-color);
}
.t-menu--light {
  .header-user-account {
    color: var(--td-text-color-primary);
  }
}
.t-menu--dark {
  .t-head-menu__inner {
    border-bottom: 1px solid var(--td-gray-color-10);
  }
  .header-user-account {
    color: rgba(255, 255, 255, 0.55);
  }
  .t-button {
    --ripple-color: var(--td-gray-color-10) !important;
    &:hover {
      background: var(--td-gray-color-12) !important;
    }
  }
}
.operations-dropdown-container-item {
  display: flex;
  width: 100%;
  align-items: center;
  .t-icon {
    margin-right: 8px;
  }
  :deep(.t-dropdown__item) {
    .t-dropdown__item__content {
      display: flex;
      justify-content: center;
    }
    .t-dropdown__item__content__text {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  }
  :deep(.t-dropdown__item) {
    width: 100%;
    margin-bottom: 0px;
  }
  &:last-child {
    :deep(.t-dropdown__item) {
      margin-bottom: 8px;
    }
  }
}
</style>
