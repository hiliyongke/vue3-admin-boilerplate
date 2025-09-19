<template>
  <t-drawer
    v-model:visible="showSettingPanel"
    size="400px"
    :footer="false"
    header="页面配置"
    :close-btn="true"
    class="setting-drawer-container"
    @close-btn-click="handleCloseDrawer"
  >
    <div class="setting-container">
      <t-form ref="form" :data="formData" label-align="left">
        <div class="setting-group-title">主题模式</div>
        <t-radio-group v-model="formData.mode">
          <div v-for="(item, index) in MODE_OPTIONS" :key="index" class="setting-layout-drawer">
            <div>
              <t-radio-button :key="index" :value="item.type">
                <component :is="getModeIcon(item.type)" />
              </t-radio-button>
              <p :style="{ textAlign: 'center', marginTop: '8px' }">
                {{ item.text }}
              </p>
            </div>
          </div>
        </t-radio-group>
        <div class="setting-group-title">主题色</div>
        <t-radio-group v-model="formData.brandTheme">
          <div
            v-for="(item, index) in COLOR_OPTIONS.slice(0, COLOR_OPTIONS.length - 1)"
            :key="index"
            class="setting-layout-drawer"
          >
            <t-radio-button :key="index" :value="item" class="setting-layout-color-group">
              <color-container :value="item" />
            </t-radio-button>
          </div>
          <div class="setting-layout-drawer">
            <t-popup
              destroy-on-close
              expand-animation
              placement="bottom-right"
              trigger="click"
              :visible="isColoPickerDisplay"
              :overlay-style="{ padding: 0 }"
              @visible-change="onPopupVisibleChange"
            >
              <template #content>
                <t-color-picker-panel
                  :on-change="changeColor"
                  :color-modes="['monochrome']"
                  format="HEX"
                  :swatch-colors="[]"
                />
              </template>
              <t-radio-button
                :value="COLOR_OPTIONS[COLOR_OPTIONS.length - 1]"
                class="setting-layout-color-group dynamic-color-btn"
              >
                <color-container :value="COLOR_OPTIONS[COLOR_OPTIONS.length - 1]" />
              </t-radio-button>
            </t-popup>
          </div>
        </t-radio-group>

        <div class="setting-group-title">导航布局</div>
        <t-radio-group v-model="formData.layout">
          <div v-for="(item, index) in LAYOUT_OPTION" :key="index" class="setting-layout-drawer">
            <t-radio-button :key="index" :value="item">
              <thumbnail :src="getThumbnailUrl(item)" />
            </t-radio-button>
          </div>
        </t-radio-group>

        <t-form-item v-show="formData.layout === 'mix'" label="分割菜单（混合模式下有效）" name="splitMenu">
          <t-switch v-model="formData.splitMenu" />
        </t-form-item>

        <t-form-item v-show="formData.layout === 'mix'" label="固定 Sidebar" name="isSidebarFixed">
          <t-switch v-model="formData.isSidebarFixed" />
        </t-form-item>

        <div class="setting-group-title">元素开关</div>
        <t-form-item label="显示 pageLoading" name="showPageLoading">
          <t-switch v-model="formData.showPageLoading" />
        </t-form-item>
        <t-form-item v-show="formData.layout === 'side'" label="显示 Header" name="showHeader">
          <t-switch v-model="formData.showHeader" />
        </t-form-item>
        <t-form-item label="显示 Breadcrumbs" name="showBreadcrumb">
          <t-switch v-model="formData.showBreadcrumb" />
        </t-form-item>
        <t-form-item label="显示 Footer" name="showFooter">
          <t-switch v-model="formData.showFooter" />
        </t-form-item>
        <t-form-item label="使用 多标签Tab页" name="isUseTabsRouter">
          <t-switch v-model="formData.isUseTabsRouter" />
        </t-form-item>
      </t-form>
      <div class="setting-info">
        <p>请复制后手动修改配置文件: /src/config/style.ts</p>
        <t-button theme="primary" variant="text" @click="handleCopy"> 复制配置项 </t-button>
      </div>
    </div>
  </t-drawer>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue';
import { MessagePlugin, PopupVisibleChangeContext } from 'tdesign-vue-next';
import { Color } from 'tvision-color';
import useClipboard from 'vue-clipboard3';

import { useSettingStore } from '@/store';
import Thumbnail from '@/components/thumbnail/index.vue';
import ColorContainer from '@/components/color/index.vue';

import STYLE_CONFIG from '@/config/style';
import { insertThemeStylesheet, generateColorMap } from '@/config/color';

import SettingDarkIcon from '@/assets/svg/assets-setting-dark.svg';
import SettingLightIcon from '@/assets/svg/assets-setting-light.svg';
import SettingAutoIcon from '@/assets/svg/assets-setting-auto.svg';

const settingStore = useSettingStore();

const LAYOUT_OPTION = ['side', 'top', 'mix'];
const COLOR_OPTIONS = ['default', 'cyan', 'green', 'yellow', 'orange', 'red', 'pink', 'purple', 'dynamic'];
const MODE_OPTIONS = [
  { type: 'light', text: '明亮' },
  { type: 'dark', text: '暗黑' },
  { type: 'auto', text: '跟随系统' },
];
const initStyleConfig = () => {
  const styleConfig = STYLE_CONFIG;
  for (const key in styleConfig) {
    if (Object.prototype.hasOwnProperty.call(styleConfig, key)) {
      styleConfig[key] = settingStore[key];
    }
  }

  return styleConfig;
};

const formData = ref({ ...initStyleConfig() });
const isColoPickerDisplay = ref(false);

const showSettingPanel = computed({
  get() {
    return settingStore.showSettingPanel;
  },
  set(newVal: boolean) {
    settingStore.updateConfig({
      showSettingPanel: newVal,
    });
  },
});

const changeColor = (hex: string) => {
  const newPalette = Color.getPaletteByGradation({
    colors: [hex],
    step: 10,
  })[0];
  const { mode } = settingStore;
  const colorMap = generateColorMap(hex, newPalette, mode as 'light' | 'dark');

  settingStore.addColor({ [hex]: colorMap });
  settingStore.updateConfig({ ...formData.value, brandTheme: hex });
  insertThemeStylesheet(hex, colorMap, mode as 'light' | 'dark');
};

onMounted(() => {
  const dynamicColorBtn = document.querySelector('.dynamic-color-btn');
  if (dynamicColorBtn) {
    dynamicColorBtn.addEventListener('click', () => {
      isColoPickerDisplay.value = true;
    });
  }
});

const onPopupVisibleChange = (visible: boolean, context: PopupVisibleChangeContext) => {
  if (!visible && context.trigger === 'document') {
    isColoPickerDisplay.value = visible;
  }
};

const handleCopy = () => {
  const text = JSON.stringify(formData.value, null, 4);
  const { toClipboard } = useClipboard();
  toClipboard(text)
    .then(() => {
      MessagePlugin.closeAll();
      MessagePlugin.success('复制成功');
    })
    .catch(() => {
      MessagePlugin.closeAll();
      MessagePlugin.error('复制失败');
    });
};
const getModeIcon = (mode: string) => {
  if (mode === 'light') {
    return SettingLightIcon;
  }
  if (mode === 'dark') {
    return SettingDarkIcon;
  }
  return SettingAutoIcon;
};

const handleCloseDrawer = () => {
  settingStore.updateConfig({
    showSettingPanel: false,
  });
};

const getThumbnailUrl = (name: string): string => {
  return `https://tdesign.gtimg.com/tdesign-pro/setting/${name}.png`;
};

watchEffect(() => {
  settingStore.updateConfig(formData.value);
});
</script>
<style lang="less">
.tdesign-setting {
  position: fixed;
  right: 0;
  bottom: 200px;
  z-index: 100;
  width: 40px;
  height: 40px;
  border-radius: 20px 0 0 20px;
  transition:
    transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
    visibility 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition: all 0.3s;
  .t-icon {
    margin-left: 8px;
  }
  .tdesign-setting-text {
    display: none;
    font-size: 12px;
  }
  &:hover {
    width: 96px;
    .tdesign-setting-text {
      display: inline-block;
    }
  }
}
.setting-layout-color-group {
  display: inline-flex;
  padding: 6px !important;
  border: 2px solid transparent !important;
  border-radius: 50% !important;
  justify-content: center;
  align-items: center;
  > .t-radio-button__label {
    display: inline-flex;
  }
}
.tdesign-setting-close {
  position: fixed;
  right: 300px;
  bottom: 200px;
}
.setting-group-title {
  margin: 32px 0 24px 0;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  color: var(--td-text-color-primary);
  text-align: left;
}
.setting-link {
  margin-bottom: 8px;
  color: var(--td-brand-color);
  cursor: pointer;
}
.setting-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 24px;
  font-size: 12px;
  line-height: 20px;
  color: var(--td-text-color-placeholder);
  text-align: center;
  background: var(--td-bg-color-container);
}
.setting-drawer-container {
  .setting-container {
    padding-bottom: 100px;
  }
  .t-radio-group.t-size-m {
    width: 100%;
    min-height: 32px;
    justify-content: space-between;
    align-items: center;
  }
  .t-radio-group.t-size-m .t-radio-button {
    height: auto;
  }
  .setting-layout-drawer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
    .t-radio-button {
      display: inline-flex;
      max-height: 78px;
      padding: 8px;
      border: 2px solid var(--td-component-border);
      border-radius: var(--td-radius-default);
      > .t-radio-button__label {
        display: inline-flex;
      }
    }
    .t-is-checked {
      border: 2px solid var(--td-brand-color) !important;
    }
    .t-form__controls-content {
      justify-content: end;
    }
  }
  .t-form__controls-content {
    justify-content: end;
  }
}
.setting-route-theme {
  .t-form__label {
    min-width: 310px !important;
    color: var(--td-text-color-secondary);
  }
}
.setting-color-theme {
  .setting-layout-drawer {
    .t-radio-button {
      height: 32px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
