/**
 * @file 性能监控
 * @des 通过performance来收集页面的性能指标，通过页面链接中拼接showPerformance=1，可在控制面板输出当前页面的性能指标信息
 * 性能指标：
 * {
 *		path: '/index/index.html',
 *		timestamp: 1629171739458,
 *		FP: -1,
 *		FCP: -1,
 *		jsTime: -1,
 *		cssTime: -1,
 *		imageTime: -1,
 *		videoTime: -1,
 *		othersTime: -1,
 *		whiteTime: -1,
 *		loadTime: -1,
 *		pageLoadCompleteTime: -1,
 *		domCompleteTime: -1,
 *		reqToDOMLoadTime: -1,
 *		httpTime: -1,
 *		tcpTime: -1,
 *		ndsTime: -1,
 *		appcacheTime: -1,
 *		redirectTime: -1,
 *		jsDetail: {
 *			count: 11,
 *			content: [
 *				{
 *		     		resource: 'https://xxxx.baidu.com/xxx/static/js/index.d01fa0267bb04b4f2693.js',
 *		      		time: 1112.123123
 *				}
 *		    ]
 *		 },
 *		cssDetail: {},
 *		imageDetail: {},
 *		videoDetail: {},
 *		othersDetail: {}
 * }
 *
 */

const utils = {
  isObject(obj) {
    return obj !== null && typeof obj === 'object';
  },

  // 格式化成毫秒
  formatMs(time) {
    if (typeof time !== 'number') {
      return;
    }
    // 毫秒转换成秒 返回
    if (time > 1000) {
      return (time / 1000).toFixed(2) + 's';
    }
    // 默认返回毫秒
    return Math.round(time) + 'ms';
  },

  isImg(param) {
    if (/\.(gif|jpg|jpeg|png|webp|svg)/i.test(param)) {
      return true;
    }
    return false;
  },

  isJS(param) {
    if (/\.(js)/i.test(param)) {
      return true;
    }
    return false;
  },

  isCss(param) {
    if (/\.(css)/i.test(param)) {
      return true;
    }
    return false;
  },

  isVideo(param) {
    if (/\.(mp4|rm|rmvb|mkv|avi|flv|ogv|webm)/i.test(name)) {
      return true;
    }
    return false;
  },

  checkResourceType(param) {
    if (utils.isImg(param)) {
      return 'image';
    }
    if (utils.isJS(param)) {
      return 'javascript';
    }
    if (utils.isCss(param)) {
      return 'css';
    }
    if (utils.isVideo(param)) {
      return 'video';
    }
    return 'other';
  },

  /**
   * 原生post请求
   * @param {string} url 请求地址
   * @param {string} data post请求参数
   * @param {Function} successCb 回调函数
   * @param {Function} failCb 回调函数
   * @param {string} type post参数类型，支持[form-urlencoded | form-data]
   */
  post(url, data, successCb, failCb, type) {
    let params = '';
    const xhr = (function () {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      } else {
        return new ActiveXObject('Microsoft.XMLHttp');
      }
    })();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          successCb(data);
        } else {
          failCb();
        }
      }
    };
    xhr.open('post', url);
    // 设置跨域 Cookie
    xhr.withCredentials = true;
    if (type === 'form-urlencoded') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      let len = 0;
      for (const key in data) {
        let keyValue = '';
        if (len > 0) {
          keyValue = '&' + key + '=' + data[key];
        } else {
          keyValue = key + '=' + data[key];
        }
        params += keyValue;
        len++;
      }
    } else if (type === 'form-data') {
      params = objectToFormData(data);
    }
    xhr.send(params);
  }
};

const formatMs = utils.formatMs;
const isObject = utils.isObject;
const checkResourceType = utils.checkResourceType;

class MiniMonitor {
  constructor(options) {
    this.showConsole = options.showConsole;
    this.postUrl = options.url;
    this.baseParams = options.baseParams || {};
    this.fpLimit = options.fpLimit || 4000;
    // 保存原始数据
    this.timing = {};
    // 原始enteries数据
    this.enteriesResouceData = [];
    // 保存解析后的数据
    this.afterDatas = {
      timingFormat: {},
      enteriesResouceData: {},
      enteriesResouceDataTiming: {
        js: 0,
        css: 0,
        image: 0,
        video: 0,
        others: 0
      }
    };
    this.performance =
      window.performance ||
      window.msPerformance ||
      window.webkitPerformance ||
      {};
    // 获取数据信息
    this.getPerformanceTiming();
  }
  /**
   * 获取数据信息
   */
  getPerformanceTiming() {
    // 兼容性判断,如果没有获取到正确perforance对象则直接return
    if (this.performance && JSON.stringify(this.performance) === '{}') {
      return;
    }
    // 初始化数据
    this.timing = this.performance.timing;
    // 获取资源类型为resource的所有数据
    this.enteriesResouceData = this.performance.getEntriesByType('resource');
    // 过早获取(或者没有获取触发loadEvent事件) loadEventEnd值会是0
    const loadTime = this.timing.loadEventEnd - this.timing.navigationStart;
    if (loadTime < 0) {
      let reTimes = 0;
      const performanceTimer = setTimeout(() => {
        reTimes++;
        this.getPerformanceTiming();
        if (reTimes === 25) {
          clearTimeout(performanceTimer);
        }
      }, 200);

      return;
    }
    // 获取解析后的数据
    this.afterDatas.timingFormat = this.setTiming();
    this.afterDatas.enteriesResouceData = this.setEnteries();
    if (location.href.indexOf('showPerformance=1') > 0 || this.showConsole) {
      this.consoleShow();
    }
    // 发送到服务端
    this.toServer();
  }
  /**
   * 计算出相关指标的准确时间
   */
  setTiming() {
    const timing = this.timing;
    // 对数据进行计算
    const data = {
      redirectTime: {
        des: '重定向耗时',
        value: timing.redirectEnd - timing.redirectStart
      },
      appcacheTime: {
        des: 'Appcache耗时',
        value: timing.domainLookupStart - timing.fetchStart
      },
      ndsTime: {
        des: 'DNS查询耗时',
        value: timing.domainLookupEnd - timing.domainLookupStart
      },
      tcpTime: {
        des: 'TCP链接耗时',
        value: timing.connectEnd - timing.connectStart
      },
      httpTime: {
        des: 'HTTP请求耗时',
        value: timing.responseEnd - timing.responseStart
      },
      reqToDOMLoadTime: {
        des: '请求完毕到DOM加载耗时',
        value: timing.domInteractive - timing.responseEnd
      },
      domCompleteTime: {
        des: '解析DOM树耗时',
        value: timing.domComplete - timing.domInteractive
      },
      whiteTime: {
        des: '白屏时间耗时',
        value: timing.responseStart - timing.navigationStart
      },
      loadTime: {
        des: 'load事件耗时',
        value: timing.loadEventEnd - timing.loadEventStart
      },
      pageLoadCompleteTime: {
        des: '页面加载完成的时间',
        value: timing.loadEventEnd - timing.navigationStart
      },
      FP: {
        des: 'first-paint',
        value: -1
      },
      FCP: {
        des: 'first-contentful-paint',
        value: -1
      }
    };

    // 获取FP和FCP
    const getEntries = this.performance.getEntries();
    getEntries &&
      getEntries.forEach(item => {
        if (item.name === 'first-paint') {
          data.FP = {
            des: 'first-paint',
            value: item.startTime + item.duration
          };
        }
        if (item.name === 'first-contentful-paint') {
          data.FCP = {
            des: 'first-contentful-paint',
            value: item.startTime + item.duration
          };
        }
      });

    return data;
  }
  /**
   * 计算出相关资源加载的准确时间
   */
  setEnteries() {
    const enteriesResouceData = this.enteriesResouceData;
    const imageArrs = [];
    const jsArrs = [];
    const cssArrs = [];
    const videoArrs = [];
    const otherArrs = [];
    enteriesResouceData.map(item => {
      const d = {
        resourceName: {
          des: '资源名称',
          value: item.name
        },
        httpProtocol: {
          des: 'HTTP协议类型',
          value: item.nextHopProtocol
        },
        tcpTime: {
          des: 'TCP链接耗时',
          value: item.connectEnd - item.connectStart
        },
        loadTime: {
          des: '加载时间',
          value: item.duration
        }
      };
      switch (checkResourceType(item.name)) {
        case 'image':
          this.afterDatas.enteriesResouceDataTiming.image += item.duration;
          imageArrs.push(d);
          break;
        case 'javascript':
          this.afterDatas.enteriesResouceDataTiming.js += item.duration;
          jsArrs.push(d);
          break;
        case 'css':
          this.afterDatas.enteriesResouceDataTiming.css += item.duration;
          cssArrs.push(d);
          break;
        case 'video':
          this.afterDatas.enteriesResouceDataTiming.video += item.duration;
          videoArrs.push(d);
          break;
        case 'others':
          this.afterDatas.enteriesResouceDataTiming.others += item.duration;
          otherArrs.push(d);
          break;
      }
    });
    return {
      js: jsArrs,
      css: cssArrs,
      image: imageArrs,
      video: videoArrs,
      others: otherArrs
    };
  }
  /**
   * 在控制台展示
   */
  consoleShow() {
    const timing = {};
    for (const i in this.afterDatas.timingFormat) {
      timing[i] = {
        des: this.afterDatas.timingFormat[i].des,
        value: formatMs(this.afterDatas.timingFormat[i].value)
      };
    }
    console.table(timing);
    for (const key in this.afterDatas.enteriesResouceData) {
      console.group(
        key +
          '共加载' +
          formatMs(this.afterDatas.enteriesResouceDataTiming[key])
      );
      const enteriesResouceData = [];
      for (const item of this.afterDatas.enteriesResouceData[key]) {
        enteriesResouceData.push({
          资源名称: item.resourceName.value,
          HTTP协议类型: item.httpProtocol.value,
          TCP链接耗时: formatMs(item.tcpTime.value),
          加载时间: formatMs(item.loadTime.value)
        });
      }
      // console.table(this.afterDatas.enteriesResouceData[key]);
      console.table(enteriesResouceData);
      console.groupEnd(key);
    }
  }
  /**
   * 将收集到的性能指标数据发送到服务端
   *
   * 只有命中了白名单才进行发送服务操作
   */
  toServer() {
    // 白名单
    // let whiteListHost = ['carowner.baidu.com', 'zhaoxiaoyang01.bcc-szth.baidu.com'];
    const whiteListHost = ['carowner.baidu.com'];
    if (whiteListHost.indexOf(location.hostname) === -1) {
      return;
    }
    const enteriesResouceDataTiming = this.afterDatas.enteriesResouceDataTiming;

    const content = {
      path: location.pathname,
      timestamp: new Date().getTime(),
      ...this.afterDatas.timingFormat,
      imageTime: {
        des: '图片加载总时间',
        value: enteriesResouceDataTiming.image
      },
      jsTime: {
        des: 'js加载总时间',
        value: enteriesResouceDataTiming.js
      },
      cssTime: {
        des: 'css加载总时间',
        value: enteriesResouceDataTiming.css
      },
      videoTime: {
        des: 'video加载总时间',
        value: enteriesResouceDataTiming.video
      },
      othersTime: {
        des: '其他加载总时间',
        value: enteriesResouceDataTiming.others
      },
      jsDetail: {
        count: 0,
        content: []
      },
      cssDetail: {
        count: 0,
        content: []
      },
      imageDetail: {
        count: 0,
        content: []
      },
      videoDetail: {
        count: 0,
        content: []
      },
      othersDetail: {
        count: 0,
        content: []
      }
    };

    for (const key in this.afterDatas.enteriesResouceData) {
      const enteriesResouceDataItem = this.afterDatas.enteriesResouceData[key];
      const contentItem = key + 'Detail';
      content[contentItem].count = enteriesResouceDataItem.length;

      for (const item of enteriesResouceDataItem) {
        content[contentItem].content.push({
          resource: item.resourceName.value,
          time: item.loadTime.value
        });
      }
    }

    // 排除异常数据，如：debug导致的某些数据异常数据
    if (content.FCP.value && content.FCP.value > this.fpLimit) {
      return;
    }

    // 发送到服务端
    const params = {
      content: JSON.stringify(content)
    };
    this.baseParams && { ...this.baseParams, params };
    utils.post(
      this.postUrl,
      params,
      () => {},
      () => {},
      'form-data'
    );
  }
}
export default MiniMonitor;
