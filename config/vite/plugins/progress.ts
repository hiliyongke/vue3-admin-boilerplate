/**
 * @name ConfigProgressPlugin
 * @description 构建显示进度条
 */

import progress from 'vite-plugin-progress';
import { PROGRESS } from '../../constant';
export const ConfigProgressPlugin = () => {
  return PROGRESS ? progress() : [];
};
