# mini-monitor

> 前端性能监控。通过performance来收集页面中和的一些核心数据，帮助开发者更细致的了解自己负责产品的性能，并根据收集的性能数据来辅助前端页面性能的优化

## 使用

``` bash
npm install mini-monitor

import MiniMonitor from 'mini-monitor';
new MiniMonitor({
 url: 'xxx', // 收集数据的服务接口地址
 // 如果服务端接口有一些必传字段，可通过baseParams来实现
 baseParams: {
  ...
 },
 // 白名单。设定收集数据的指定域
 whiteName:['test1.baidu.com', 'test2.baidu.com'],
 // FP大于fpLimit则不做收集操作，默认4000ms。目的：排除一些极端情况和一些无意义的数据，如debug因素造成的FP时间太长
 fpLimit: 5000
})
```

### 相关性能指标

|  指标字段   | 说明  |
|  ----  | ----  |
| path | 页面路径 |
| FP | first-paint |
| FCP | frist-contentful-paint |
| jsTime | js资源加载时间 |
| cssTime | css资源加载时间 |
| imageTime | 图片资源加载时间 |
| videoTime | 视频资源加载时间 |
| othersTime | 其他资源加载时间 |
| whiteTime | 白屏时间 |
| loadTime | load事件耗时 |
| pageLoadCompleteTime | 页面加载完成的时间 |
| domCompleteTime | 解析DOM树耗时 |
| reqToDOMLoadTime | 请求完毕到DOM加载耗时 |
| httpTime | HTTP请求耗时 |
| tcpTime | TCP链接耗时 |
| ndsTime | DNS查询耗时 |
| appcacheTime | Appcache耗时 |
| redirectTime | 重定向耗时 |
| jsDetail | js资源加载详情 |
| cssDetail | css资源加载详情 |
| imageDetail | 图片资源加载详情 |
| videoDetail | 视频资源加载详情 |
| othersDetail | 其他资源加载详情 |
