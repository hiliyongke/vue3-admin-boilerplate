import { logger, LogLevel } from '@/shared/utils/logger';

// 日志
export function setupLogger() {
  logger.updateConfig({
    enabled: true,
    level: import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.INFO,
    enableInProduction: false,
    reportToServer: Boolean(import.meta.env.VITE_LOG_REPORT_URL),
  });
}
