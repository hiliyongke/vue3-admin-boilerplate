/**
 * @name ConfigInspectPlugin
 * @description 调试工具
 */
import Inspect from 'vite-plugin-inspect';
import { INSPECT } from '../../constant';

export const ConfigInspectPlugin = () => {
  return INSPECT ? Inspect() : [];
};
