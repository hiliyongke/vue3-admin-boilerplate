/**
 * @description Web Vitals 性能监控
 */

import { onCLS, onLCP, onFCP, onTTFB, onINP, type Metric } from 'web-vitals';

interface MetricData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

/**
 * 上报性能数据到服务器
 */
function reportMetric(metric: Metric): void {
  const data: MetricData = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  };

  // 添加额外的上下文信息
  const body = JSON.stringify({
    ...data,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
    // 连接信息
    connection: (navigator as any).connection
      ? {
          effectiveType: (navigator as any).connection.effectiveType,
          downlink: (navigator as any).connection.downlink,
          rtt: (navigator as any).connection.rtt,
        }
      : null,
  });

  // 使用 sendBeacon 或 fetch 上报
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/metrics', body);
  } else {
    fetch('/api/metrics', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      keepalive: true,
    }).catch(console.error);
  }

  // 开发环境下打印到控制台
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
}

/**
 * 初始化 Web Vitals 监控
 */
export function setupWebVitals(): void {
  // Cumulative Layout Shift (CLS)
  // 衡量视觉稳定性
  // 好: < 0.1, 需要改进: 0.1-0.25, 差: > 0.25
  onCLS(reportMetric);

  // Largest Contentful Paint (LCP)
  // 衡量加载性能
  // 好: < 2.5s, 需要改进: 2.5-4s, 差: > 4s
  onLCP(reportMetric);

  // First Contentful Paint (FCP)
  // 衡量首次内容绘制
  // 好: < 1.8s, 需要改进: 1.8-3s, 差: > 3s
  onFCP(reportMetric);

  // Time to First Byte (TTFB)
  // 衡量服务器响应时间
  // 好: < 800ms, 需要改进: 800-1800ms, 差: > 1800ms
  onTTFB(reportMetric);

  // Interaction to Next Paint (INP)
  // 衡量交互响应性
  // 好: < 200ms, 需要改进: 200-500ms, 差: > 500ms
  onINP(reportMetric);

  console.log('✅ Web Vitals 监控已启动');
}

/**
 * 自定义性能监控
 */
export function setupCustomPerformance(): void {
  // 监控资源加载性能
  if (window.PerformanceObserver) {
    // 监控长任务
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('[Long Task]', {
              duration: entry.duration,
              startTime: entry.startTime,
            });

            // 上报长任务
            fetch('/api/metrics/long-task', {
              method: 'POST',
              body: JSON.stringify({
                duration: entry.duration,
                startTime: entry.startTime,
                url: window.location.href,
              }),
              keepalive: true,
            }).catch(() => {});
          }
        }
      });

      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // 某些浏览器可能不支持
    }

    // 监控资源加载
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;

          // 上报慢资源
          if (resource.duration > 1000) {
            console.warn('[Slow Resource]', {
              name: resource.name,
              duration: resource.duration,
              size: resource.transferSize,
            });
          }
        }
      });

      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      // 某些浏览器可能不支持
    }
  }

  // 监控内存使用（仅 Chrome）
  if ((performance as any).memory) {
    setInterval(() => {
      const { memory } = performance as any;
      const usedPercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

      if (usedPercent > 90) {
        console.warn('[Memory Warning]', {
          used: memory.usedJSHeapSize,
          total: memory.jsHeapSizeLimit,
          percent: `${usedPercent.toFixed(2)}%`,
        });
      }
    }, 30000); // 每 30 秒检查一次
  }

  console.log('✅ 自定义性能监控已启动');
}

/**
 * 获取性能指标
 */
export function getPerformanceMetrics(): Record<string, any> {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  if (!navigation) {
    return {};
  }

  return {
    // DNS 查询时间
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,

    // TCP 连接时间
    tcp: navigation.connectEnd - navigation.connectStart,

    // SSL 握手时间
    ssl: navigation.secureConnectionStart > 0 ? navigation.connectEnd - navigation.secureConnectionStart : 0,

    // TTFB
    ttfb: navigation.responseStart - navigation.requestStart,

    // 下载时间
    download: navigation.responseEnd - navigation.responseStart,

    // DOM 解析时间
    domParse: navigation.domInteractive - navigation.responseEnd,

    // 资源加载时间
    resourceLoad: navigation.loadEventStart - navigation.domContentLoadedEventEnd,

    // 总时间
    total: navigation.loadEventEnd - navigation.fetchStart,
  };
}
