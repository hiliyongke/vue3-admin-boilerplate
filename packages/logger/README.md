<br />
<p align="center">
  <h1 align="center">重建犯罪现场</h1>
  <p align="left">
 logger_js是一个前端日志系统，它将错误信息记录于本地localStorage中。<strong>无任何依赖</strong>、无入侵性。使用<strong>非常简单</strong>，很容易引入你的系统中，而且不会造成任何影响。
它可以帮你快速重建犯罪现场。
    <br />
    <br />
  </p>
</p>

<br />
<table>
  <tr>
    <th><h4 align="center"><h4 align="center">无入侵</h4 align="center"></th>
    <th><h4 align="center"></h4 align="center"><h4 align="center">轻量易用</h4 align="center"></th>
    <th><h4 align="center"></h4 align="center"><h4 align="center">功能强大</h4 align="center"></th>
    <th><h4 align="center"></h4 align="center"><h4 align="center">高性能</h4 align="center"></th>
  </tr>
  <tr>
    <td width="20%" align="center"><sub>丢上去不管，我们承诺永不入侵你的业务！</sub></td>
    <td width="20%" align="center"><sub>兼容各种系统，不管你使用的是jQuery、angular1/2、React、Vue，都可以使用它</sub></td>
    <td width="20%" align="center"><sub>完善的查错机制，截图预览、导出excel、直接上传到后台查看等</sub></td>
    <td width="20%" align="center"><sub>文件超小，Gzip 5k对你几乎毫无影响</td>
  </tr>
</table>

## 一、快速开始

```javascript
import logger from 'logger';

// 示例：自定义上报
const _logger = new logger({
  feID: '', // 项目id，日志区分项目使用
  report: lines => {
    // todo 自定义你的上报逻辑
    console.log('error lines', lines);
  }
});

// 如果你想主动上报
_logger.report();
```

## 二、日志查看

查看日志快捷键: Ctrl+6

## 三、本地开发

```shell
// 本地开发
npm run start
// 发布环境
npm run build
```
