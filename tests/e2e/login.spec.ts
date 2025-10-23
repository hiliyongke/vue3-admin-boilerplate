import { test, expect } from '@playwright/test';

test.describe('登录功能', () => {
  test.beforeEach(async ({ page }) => {
    // 访问登录页面
    await page.goto('/login');
  });

  test('应该显示登录表单', async ({ page }) => {
    // 检查页面标题
    await expect(page).toHaveTitle(/登录/);

    // 检查表单元素
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('应该验证必填字段', async ({ page }) => {
    // 点击登录按钮
    await page.click('button[type="submit"]');

    // 应该显示错误提示
    await expect(page.locator('text=请输入用户名')).toBeVisible();
  });

  test('应该成功登录', async ({ page }) => {
    // 填写表单
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');

    // 点击登录
    await page.click('button[type="submit"]');

    // 等待跳转到首页
    await page.waitForURL('/dashboard/base');

    // 检查是否显示用户信息
    await expect(page.locator('text=admin')).toBeVisible();
  });

  test('应该处理登录失败', async ({ page }) => {
    // 填写错误的凭据
    await page.fill('input[type="text"]', 'wrong');
    await page.fill('input[type="password"]', 'wrong');

    // 点击登录
    await page.click('button[type="submit"]');

    // 应该显示错误消息
    await expect(page.locator('text=用户名或密码错误')).toBeVisible();
  });

  test('应该支持记住密码', async ({ page }) => {
    // 勾选记住密码
    await page.check('input[type="checkbox"]');

    // 填写并登录
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // 等待登录成功
    await page.waitForURL('/dashboard/base');

    // 刷新页面
    await page.reload();

    // 应该保持登录状态
    await expect(page).toHaveURL('/dashboard/base');
  });
});
