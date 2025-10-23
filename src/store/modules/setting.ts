import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import keys from 'lodash-es/keys';
import type { TColorSeries } from '@/config/color';
import { COLOR_TOKEN, LIGHT_CHART_COLORS, DARK_CHART_COLORS } from '@/config/color';
import STYLE_CONFIG from '@/config/style';
import pinia from '@/store';

export type TState = typeof STYLE_CONFIG & {
  showSettingPanel: boolean;
  colorList: TColorSeries;
  chartColors: typeof LIGHT_CHART_COLORS;
};

export const useSettingStore = defineStore(
  'setting',
  () => {
    // State
    const showSettingPanel = ref(false);
    const colorList = ref<TColorSeries>(COLOR_TOKEN);
    const chartColors = ref(LIGHT_CHART_COLORS);

    // 从 STYLE_CONFIG 初始化所有配置项
    const mode = ref<'dark' | 'light' | 'auto'>(STYLE_CONFIG.mode);
    const brandTheme = ref(STYLE_CONFIG.brandTheme);
    const layout = ref(STYLE_CONFIG.layout);
    const splitMenu = ref(STYLE_CONFIG.splitMenu);
    const isSidebarCompact = ref(STYLE_CONFIG.isSidebarCompact);
    const showBreadcrumb = ref(STYLE_CONFIG.showBreadcrumb);
    const showFooter = ref(STYLE_CONFIG.showFooter);
    const isUseTabsRouter = ref(STYLE_CONFIG.isUseTabsRouter);
    const isFooterAside = ref(STYLE_CONFIG.isFooterAside);
    const showHeader = ref(STYLE_CONFIG.showHeader);
    const backgroundTheme = ref(STYLE_CONFIG.backgroundTheme);
    const language = ref(STYLE_CONFIG.language);
    const isSidebarFixed = ref(STYLE_CONFIG.isSidebarFixed);
    const isHeaderFixed = ref(STYLE_CONFIG.isHeaderFixed);
    const showPageLoading = ref(STYLE_CONFIG.showPageLoading);

    // Getters
    const showSidebar = computed(() => layout.value !== 'top');
    const showSidebarLogo = computed(() => layout.value === 'side');
    const showHeaderLogo = computed(() => layout.value !== 'side');
    const displayMode = computed(() => {
      if (mode.value === 'auto') {
        const media = window.matchMedia('(prefers-color-scheme:dark)');
        if (media.matches) {
          return 'dark';
        }
        return 'light';
      }
      return mode.value;
    });

    // Actions
    async function changeMode(newMode: 'dark' | 'light' | 'auto') {
      let theme = newMode;

      if (newMode === 'auto') {
        const media = window.matchMedia('(prefers-color-scheme:dark)');
        if (media.matches) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      }
      const isDarkMode = theme === 'dark';

      document.documentElement.setAttribute('theme-mode', isDarkMode ? 'dark' : '');

      chartColors.value = isDarkMode ? DARK_CHART_COLORS : LIGHT_CHART_COLORS;
      mode.value = newMode;
    }

    function changeBrandTheme(theme: string) {
      document.documentElement.setAttribute('theme-color', theme);
      brandTheme.value = theme;
    }

    function addColor(payload: TColorSeries) {
      colorList.value = { ...colorList.value, ...payload };
    }

    function updateConfig(payload: Partial<TState>) {
      Object.keys(payload).forEach((key) => {
        const typedKey = key as keyof TState;
        const value = payload[typedKey];

        if (value !== undefined) {
          // 更新对应的 ref
          switch (typedKey) {
            case 'showSettingPanel':
              showSettingPanel.value = value as boolean;
              break;
            case 'colorList':
              colorList.value = value as TColorSeries;
              break;
            case 'chartColors':
              chartColors.value = value as typeof LIGHT_CHART_COLORS;
              break;
            case 'mode':
              if (value === 'dark' || value === 'light' || value === 'auto') {
                changeMode(value);
              }
              break;
            case 'brandTheme':
              if (typeof value === 'string') {
                changeBrandTheme(value);
              }
              break;
            case 'layout':
              layout.value = value as typeof STYLE_CONFIG.layout;
              break;
            case 'splitMenu':
              splitMenu.value = value as boolean;
              break;
            case 'isSidebarCompact':
              isSidebarCompact.value = value as boolean;
              break;
            case 'showBreadcrumb':
              showBreadcrumb.value = value as boolean;
              break;
            case 'showFooter':
              showFooter.value = value as boolean;
              break;
            case 'isUseTabsRouter':
              isUseTabsRouter.value = value as boolean;
              break;
            case 'isFooterAside':
              isFooterAside.value = value as boolean;
              break;
            case 'showHeader':
              showHeader.value = value as boolean;
              break;
            case 'backgroundTheme':
              backgroundTheme.value = value as string;
              break;
            case 'language':
              language.value = value as string;
              break;
            case 'isSidebarFixed':
              isSidebarFixed.value = value as boolean;
              break;
            case 'isHeaderFixed':
              isHeaderFixed.value = value as boolean;
              break;
            case 'showPageLoading':
              showPageLoading.value = value as boolean;
              break;
          }
        }
      });
    }

    return {
      // State
      showSettingPanel,
      colorList,
      chartColors,
      mode,
      brandTheme,
      layout,
      splitMenu,
      isSidebarCompact,
      showBreadcrumb,
      showFooter,
      isUseTabsRouter,
      isFooterAside,
      showHeader,
      backgroundTheme,
      language,
      isSidebarFixed,
      isHeaderFixed,
      showPageLoading,
      // Getters
      showSidebar,
      showSidebarLogo,
      showHeaderLogo,
      displayMode,
      // Actions
      changeMode,
      changeBrandTheme,
      addColor,
      updateConfig,
    };
  },
  {
    persist: true,
  } as any
);

export function getSettingStore() {
  return useSettingStore(pinia);
}
