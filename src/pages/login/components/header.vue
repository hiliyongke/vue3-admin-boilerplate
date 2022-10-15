<template>
  <header class="login-header">
    <logo-full-icon class="logo" />
    <div class="operations-container">
      <t-button
        theme="default"
        shape="square"
        variant="text"
        @click="navToGitHub"
      >
        <t-icon
          name="logo-github"
          class="icon"
        />
      </t-button>
      <t-button
        theme="default"
        shape="square"
        variant="text"
        @click="navToHelper"
      >
        <t-icon
          name="help-circle"
          class="icon"
        />
      </t-button>
      <t-button
        theme="default"
        shape="square"
        variant="text"
        @click="toggleSettingPanel"
      >
        <t-icon
          name="setting"
          class="icon"
        />
      </t-button>
    </div>
  </header>
</template>

<script setup lang="ts">
import LogoFullIcon from '@/assets/icons/assets-logo-full.svg';
import { useSettingStore } from '@/store';

const settingStore = useSettingStore();
const toggleSettingPanel = () => {
  settingStore.updateConfig({
    showSettingPanel: true
  });
};

const navToGitHub = () => {
  window.open('https://github.com/hiliyongke/vue3-boilerplate.git');
};

const navToHelper = () => {
  window.open('https://github.com/hiliyongke/vue3-boilerplate.git');
};
</script>

<style lang="less" scoped>
.login-header {
  display: flex;
  height: 64px;
  padding: 0 24px;
  color: var(--td-text-color-primary);
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(5px);
  .logo {
    width: 188px;
    height: 64px;
  }
  .operations-container {
    display: flex;
    align-items: center;
    .t-button {
      margin-left: 16px;
    }
    .icon {
      width: 20px;
      height: 20px;
      padding: 6px;
      box-sizing: content-box;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
