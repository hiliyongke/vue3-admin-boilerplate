/**
 * @description 性能监控工具
 * @author 现代化架构
 */

/**
 * 性能指标接口
 */
export interface PerformanceMetrics {
  /** 首次内容绘制时间 */
  fcp: number;
  /** 最大内容绘制时间 */
  lcp: number;
  /** 首次输入延迟 */
  fid: number;
  /** 累积布局偏移 */
  cls: number;
  /** 首次字节时间 */
  ttfb: number;
  /** DOM内容加载完成时间 */
  domContentLoaded: number;
  /** 页面完全加载时间 */
  loadComplete: number;
}

/**
 * 性能监控类
 */
export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.init();
  }

  /**
   * 初始化性能监控
   */
  private init(): void {
    // 监控导航时间
    this.observeNavigation();

    // 监控绘制时间
    this.observePaint();

    // 监控布局偏移
    this.observeLayoutShift();

    // 监控首次输入延迟
    this.observeFirstInputDelay();

    // 监控最大内容绘制
    this.observeLargestContentfulPaint();
  }

  /**
   * 监控导航时间
   */
  private observeNavigation(): void {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];

      if (navigationEntries.length > 0) {
        const entry = navigationEntries[0];
        this.metrics.ttfb = entry.responseStart - entry.requestStart;
        this.metrics.domContentLoaded = entry.domContentLoadedEventEnd - (entry.navigationStart || 0);
        this.metrics.loadComplete = entry.loadEventEnd - (entry.navigationStart || 0);
      }
    }
  }

  /**
   * 监控绘制时间
   */
  private observePaint(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
          }
        }
      });

      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    }
  }

  /**
   * 监控布局偏移
   */
  private observeLayoutShift(): void {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        this.metrics.cls = clsValue;
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  /**
   * 监控首次输入延迟
   */
  private observeFirstInputDelay(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.fid = (entry as any).processingStart - entry.startTime;
        }
      });

      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    }
  }

  /**
   * 监控最大内容绘制
   */
  private observeLargestContentfulPaint(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    }
  }

  /**
   * 获取性能指标
   */
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  /**
   * 上报性能数据
   */
  report(callback?: (metrics: Partial<PerformanceMetrics>) => void): void {
    const metrics = this.getMetrics();

    if (callback) {
      callback(metrics);
    } else {
      console.log('性能指标:', metrics);
    }
  }

  /**
   * 销毁监控器
   */
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

/**
 * 创建性能监控实例
 */
export function createPerformanceMonitor(): PerformanceMonitor {
  return new PerformanceMonitor();
}

/**
 * 测量函数执行时间
 */
export function measureTime<T>(
  fn: () => T | Promise<T>,
  label?: string
): T | Promise<T> {
  const start = performance.now();
  const result = fn();

  if (result instanceof Promise) {
    return result.finally(() => {
      const end = performance.now();
      console.log(`${label || '函数执行'} 耗时: ${(end - start).toFixed(2)}ms`);
    });
  } else {
    const end = performance.now();
    console.log(`${label || '函数执行'} 耗时: ${(end - start).toFixed(2)}ms`);
    return result;
  }
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}
