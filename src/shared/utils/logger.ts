/**
 * @description 统一日志管理工具
 * @author 现代化架构
 */

/**
 * 日志级别枚举
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

/**
 * 日志配置接口
 */
interface LoggerConfig {
  /** 是否启用日志 */
  enabled: boolean;
  /** 日志级别 */
  level: LogLevel;
  /** 是否在生产环境启用 */
  enableInProduction: boolean;
  /** 是否上报到服务器 */
  reportToServer: boolean;
  /** 服务器上报地址 */
  reportUrl?: string;
}

/**
 * 日志数据接口
 */
interface LogData {
  level: LogLevel;
  message: string;
  timestamp: number;
  data?: any;
  stack?: string;
}

/**
 * 日志管理类
 */
class Logger {
  private config: LoggerConfig;
  private logs: LogData[] = [];
  private maxLogs = 100;

  constructor(config?: Partial<LoggerConfig>) {
    this.config = {
      enabled: true,
      level: LogLevel.DEBUG,
      enableInProduction: false,
      reportToServer: false,
      ...config,
    };
  }

  /**
   * 判断是否应该记录日志
   */
  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false;

    const isProd = import.meta.env.PROD;
    if (isProd && !this.config.enableInProduction) return false;

    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const currentLevelIndex = levels.indexOf(this.config.level);
    const logLevelIndex = levels.indexOf(level);

    return logLevelIndex >= currentLevelIndex;
  }

  /**
   * 记录日志
   */
  private log(level: LogLevel, message: string, data?: any): void {
    if (!this.shouldLog(level)) return;

    const logData: LogData = {
      level,
      message,
      timestamp: Date.now(),
      data,
    };

    // 添加到日志队列
    this.logs.push(logData);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // 控制台输出
    this.consoleLog(level, message, data);

    // 上报到服务器
    if (this.config.reportToServer && level === LogLevel.ERROR) {
      this.reportToServer(logData);
    }
  }

  /**
   * 控制台输出
   */
  private consoleLog(level: LogLevel, message: string, data?: any): void {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    const styles = {
      [LogLevel.DEBUG]: 'color: #888',
      [LogLevel.INFO]: 'color: #1890ff',
      [LogLevel.WARN]: 'color: #faad14',
      [LogLevel.ERROR]: 'color: #ff4d4f; font-weight: bold',
    };

    console.log(`%c${prefix} ${message}`, styles[level], data || '');
  }

  /**
   * 上报到服务器
   */
  private async reportToServer(logData: LogData): Promise<void> {
    if (!this.config.reportUrl) return;

    try {
      await fetch(this.config.reportUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });
    } catch (error) {
      console.error('日志上报失败:', error);
    }
  }

  /**
   * Debug级别日志
   */
  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * Info级别日志
   */
  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * Warn级别日志
   */
  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * Error级别日志
   */
  error(message: string, error?: Error | any): void {
    const logData = {
      message: error?.message || message,
      stack: error?.stack,
      ...error,
    };
    this.log(LogLevel.ERROR, message, logData);
  }

  /**
   * 获取所有日志
   */
  getLogs(): LogData[] {
    return [...this.logs];
  }

  /**
   * 清空日志
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * 更新配置
   */
  updateConfig(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

/**
 * 创建日志实例
 */
export const logger = new Logger({
  enabled: true,
  level: import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.INFO,
  enableInProduction: false,
  reportToServer: import.meta.env.PROD,
  reportUrl: import.meta.env.VITE_LOG_REPORT_URL,
});

/**
 * 导出日志方法
 */
export const { debug, info, warn, error, getLogs, clearLogs } = logger;

export default logger;
