import { defineStore } from 'pinia';
import keys from 'lodash-es/keys';
import {
  COLOR_TOKEN,
  LIGHT_CHART_COLORS,
  DARK_CHART_COLORS,
  TColorSeries
} from '@/config/color';
import STYLE_CONFIG from '@/config/style';
import pinia from '@/store';

const state = {
  ...STYLE_CONFIG,
  showSettingPanel: false,
  colorList: COLOR_TOKEN,
  chartColors: LIGHT_CHART_COLORS
};

export type TState = typeof state;

export const useSettingStore = defineStore({
  id: 'setting',
  state: () => state,
  getters: {
    showSidebar: (state: TState) => state.layout !== 'top',
    showSidebarLogo: (state: TState) => state.layout === 'side',
    showHeaderLogo: (state: TState) => state.layout !== 'side',
    displayMode: (state: TState) => {
      if (state.mode === 'auto') {
        const media = window.matchMedia('(prefers-color-scheme:dark)');
        if (media.matches) {
          return 'dark';
        }
        return 'light';
      }
      return state.mode;
    }
  },
  actions: {
    async changeMode(mode: 'dark' | 'light' | 'auto') {
      let theme = mode;

      if (mode === 'auto') {
        const media = window.matchMedia('(prefers-color-scheme:dark)');
        if (media.matches) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      }
      const isDarkMode = theme === 'dark';

      document.documentElement.setAttribute(
        'theme-mode',
        isDarkMode ? 'dark' : ''
      );

      this.chartColors = isDarkMode ? DARK_CHART_COLORS : LIGHT_CHART_COLORS;
    },
    changeBrandTheme(brandTheme: string) {
      document.documentElement.setAttribute('theme-color', brandTheme);
    },
    addColor(payload: TColorSeries) {
      this.colorList = { ...this.colorList, ...payload };
    },
    updateConfig(payload: Partial<TState>) {
      Object.keys(payload).forEach((key) => {
        const typedKey = key as keyof TState;
        const value = payload[typedKey];

        if (value !== undefined) {
          (this as any)[key] = value;

          if (key === 'mode' && typeof value === 'string') {
            this.changeMode(value as 'dark' | 'light' | 'auto');
          }
          if (key === 'brandTheme' && typeof value === 'string') {
            this.changeBrandTheme(value);
          }
        }
      });
    }
  },
  persist: {
    paths: [...keys(STYLE_CONFIG), 'colorList', 'chartColors']
  }
});

export function getSettingStore() {
  return useSettingStore(pinia);
}
