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
import { DEFAULT_LANGUAGE } from '../../../build/constant';
const state = {
  ...STYLE_CONFIG,
  showSettingPanel: false,
  colorList: COLOR_TOKEN,
  chartColors: LIGHT_CHART_COLORS,
  language: localStorage.getItem('language') || DEFAULT_LANGUAGE
};

export type TState = typeof state;

export const useSettingStore = defineStore({
  id: 'setting',
  state: () => state,
  getters: {
    showSidebar: state => state.layout !== 'top',
    showSidebarLogo: state => state.layout === 'side',
    showHeaderLogo: state => state.layout !== 'side',
    displayMode: state => {
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
      for (const key in payload) {
        if (payload[key] !== undefined) {
          this[key] = payload[key];
        }
        if (key === 'mode') {
          this.changeMode(payload[key]);
        }
        if (key === 'brandTheme') {
          this.changeBrandTheme(payload[key]);
        }
      }
    }
  },
  persist: {
    paths: [...keys(STYLE_CONFIG), 'colorList', 'chartColors']
  }
});

export function getSettingStore() {
  return useSettingStore(pinia);
}
