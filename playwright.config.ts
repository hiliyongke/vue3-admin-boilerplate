import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E 测试配置
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',

  /* 并行运行测试 */
  fullyParallel: true,

  /* 失败时不重试 CI，本地重试一次 */
  retries: process.env.CI ? 0 : 1,

  /* CI 中使用所有 CPU，本地使用一半 */
  workers: process.env.CI ? '100%' : '50%',

  /* 测试报告 */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'],
  ],

  /* 共享配置 */
  use: {
    /* 基础 URL */
    baseURL: 'http://localhost:5173',

    /* 截图 */
    screenshot: 'only-on-failure',

    /* 视频 */
    video: 'retain-on-failure',

    /* 追踪 */
    trace: 'on-first-retry',

    /* 浏览器上下文 */
    viewport: { width: 1280, height: 720 },

    /* 忽略 HTTPS 错误 */
    ignoreHTTPSErrors: true,
  },

  /* 配置多个浏览器 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* 移动端测试 */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* 启动开发服务器 */
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
