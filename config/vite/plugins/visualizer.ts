import visualizer from 'rollup-plugin-visualizer';
import { ANALYSIS } from '../../constant';

export function ConfigVisualizerConfig() {
  return ANALYSIS
    ? visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true, // 打包后自动打开分析报告
        gzipSize: true,
        brotliSize: true
      })
    : [];
}
