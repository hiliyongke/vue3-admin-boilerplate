import Logger from '../../packages/logger/src/index.js';
// 日志
export function setupLogger() {
  new Logger({
    feID: 'logger',
    report: (lines: any) => {
      // 这里配置日志上传策略
      console.log('### 自定义上报', lines);
    },
  });
}
