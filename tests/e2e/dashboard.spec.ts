import { test, expect } from '@playwright/test';

test.describe('仪表盘', () => {
  test.beforeEach(async ({ page }) => {
    // 登录
    await page.goto('/login');
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard/base');
  });

  test('应该显示仪表盘内容', async ({ page }) => {
    // 检查页面标题
    await expect(page).toHaveTitle(/仪表盘/);

    // 检查关键元素
    await expect(page.locator('text=概览')).toBeVisible();
  });

  test('应该显示统计卡片', async ({ page }) => {
    // 检查统计卡片
    const cards = page.locator('.stat-card');
    await expect(cards).toHaveCount(4);
  });

  test('应该显示图表', async ({ page }) => {
    // 检查图表容器
    const charts = page.locator('.chart-container');
    await expect(charts.first()).toBeVisible();
  });

  test('应该支持日期范围选择', async ({ page }) => {
    // 点击日期选择器
    await page.click('.date-picker');

    // 选择日期范围
    await page.click('text=最近7天');

    // 等待数据更新
    await page.waitForTimeout(1000);

    // 检查数据是否更新
    await expect(page.locator('.loading')).not.toBeVisible();
  });

  test('应该支持数据刷新', async ({ page }) => {
    // 点击刷新按钮
    await page.click('button[aria-label="刷新"]');

    // 应该显示加载状态
    await expect(page.locator('.loading')).toBeVisible();

    // 等待加载完成
    await expect(page.locator('.loading')).not.toBeVisible();
  });
});
