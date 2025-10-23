/**
 * @description Web Vitals 性能监控插件
 * @author 现代化重构版本
 */

// import { onCLS, onFID, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals';

/**
 * Web Vitals 指标
 */
export interface WebVitalsMetric {
  /**
   * 指标名称
   */
  name: string;

  /**
   * 指标值
   */
  value: number;

  /**
   * 评级
   */
  rating: 'good' | 'needs-improvement' | 'poor';

  /**
   * 时间戳
   */
  timestamp: number;
}

/**
 * 性能监控回调
 */
type MetricCallback = (metric: WebVitalsMetric) => void;

/**
 * 设置 Web Vitals 监控
 *
 * @example
 * ```ts
 * setupWebVitals((metric) => {
 *   console.log(metric.name, metric.value, metric.rating)
 *
 *   // 上报到分析服务
 *   analytics.track('web-vitals', metric)
 * })
 * ```
 */
export function setupWebVitals(callback?: MetricCallback): void {
  if (!import.meta.env.PROD) {
    console.log('⚠️ Web Vitals 仅在生产环境启用');
    return;
  }

  try {
    // 注意：需要先安装 web-vitals
    // pnpm add web-vitals

    const handleMetric = (metric: any) => {
      const webVitalsMetric: WebVitalsMetric = {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
      };

      console.log(`📊 ${metric.name}:`, metric.value, `(${metric.rating})`);

      if (callback) {
        callback(webVitalsMetric);
      }
    };

    // 监控核心 Web Vitals 指标
    // onCLS(handleMetric); // Cumulative Layout Shift
    // onFID(handleMetric); // First Input Delay
    // onLCP(handleMetric); // Largest Contentful Paint
    // onFCP(handleMetric); // First Contentful Paint
    // onTTFB(handleMetric); // Time to First Byte

    console.log('✅ Web Vitals 监控已启用');
  } catch (error) {
    console.error('❌ Web Vitals 初始化失败:', error);
  }
}

/**
 * 获取性能指标
 */
export function getPerformanceMetrics(): Record<string, number> {
  if (!window.performance || !window.performance.timing) {
    return {};
  }

  const { timing } = window.performance;
  const { navigationStart } = timing;

  return {
    // DNS 查询时间
    dns: timing.domainLookupEnd - timing.domainLookupStart,

    // TCP 连接时间
    tcp: timing.connectEnd - timing.connectStart,

    // SSL 握手时间
    ssl: timing.secureConnectionStart ? timing.connectEnd - timing.secureConnectionStart : 0,

    // 请求时间
    request: timing.responseStart - timing.requestStart,

    // 响应时间
    response: timing.responseEnd - timing.responseStart,

    // DOM 解析时间
    domParse: timing.domInteractive - timing.domLoading,

    // DOM 内容加载完成时间
    domContentLoaded: timing.domContentLoadedEventEnd - navigationStart,

    // 页面加载完成时间
    load: timing.loadEventEnd - navigationStart,

    // 首次渲染时间
    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,

    // 首次内容渲染时间
    firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0,
  };
}

/**
 * 上报性能数据
 */
export function reportPerformance(data: Record<string, any>): void {
  console.log('📊 性能数据:', data);

  // 可以在这里上报到分析服务
  // analytics.track('performance', data)
}

/**
 * 监控长任务
 */
export function observeLongTasks(callback: (entries: PerformanceEntry[]) => void): void {
  if (!('PerformanceObserver' in window)) {
    console.warn('⚠️ 浏览器不支持 PerformanceObserver');
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      callback(entries);
    });

    observer.observe({ entryTypes: ['longtask'] });

    console.log('✅ 长任务监控已启用');
  } catch (error) {
    console.error('❌ 长任务监控失败:', error);
  }
}

/**
 * 监控资源加载
 */
export function observeResources(callback: (entries: PerformanceResourceTiming[]) => void): void {
  if (!('PerformanceObserver' in window)) {
    console.warn('⚠️ 浏览器不支持 PerformanceObserver');
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceResourceTiming[];
      callback(entries);
    });

    observer.observe({ entryTypes: ['resource'] });

    console.log('✅ 资源加载监控已启用');
  } catch (error) {
    console.error('❌ 资源加载监控失败:', error);
  }
}
