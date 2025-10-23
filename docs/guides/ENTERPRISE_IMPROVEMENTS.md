# 🏢 企业级脚手架改进建议

基于当前项目的分析，以下是作为企业级脚手架需要改进和集成的主流技术。

---

## 📊 当前项目评估

### ✅ 已有的优势

1. **现代化技术栈**
   - Vue 3.5 + TypeScript 5.8
   - Vite 7 + Pinia 3
   - TDesign 组件库

2. **完善的工程化**
   - ESLint + Prettier + Stylelint
   - Husky + Commitlint
   - Monorepo (pnpm workspace)

3. **基础功能**
   - 路由权限管理
   - 国际化 (i18n)
   - Mock 数据
   - PWA 支持

### ⚠️ 存在的问题

#### 🔴 高优先级问题

1. **缺少完整的测试体系**
   - ❌ 没有单元测试文件
   - ❌ 没有 E2E 测试用例
   - ❌ 测试覆盖率为 0%

2. **缺少 CI/CD 流程**
   - ⚠️ 只有基础的 GitHub Actions
   - ❌ 没有自动化测试流程
   - ❌ 没有自动化部署流程

3. **缺少监控和日志系统**
   - ❌ 没有前端监控
   - ❌ 没有错误追踪（Sentry 已安装但未配置）
   - ❌ 没有性能监控

4. **缺少安全防护**
   - ❌ 没有 XSS 防护
   - ❌ 没有 CSRF 防护
   - ❌ 没有请求加密

#### 🟡 中优先级问题

5. **缺少微前端支持**
   - ❌ 没有 qiankun/micro-app 集成
   - ❌ 没有子应用示例

6. **缺少数据可视化**
   - ⚠️ 只有基础的 ECharts
   - ❌ 没有大屏可视化方案

7. **缺少低代码能力**
   - ❌ 没有表单设计器
   - ❌ 没有页面设计器

8. **文档不完善**
   - ⚠️ API 文档不完整
   - ❌ 没有组件文档
   - ❌ 没有最佳实践指南

---

## 🎯 改进建议（按优先级）

### 🔴 P0 - 必须立即完成

#### 1. **完善测试体系** ⭐⭐⭐⭐⭐

**问题**：测试覆盖率为 0%，无法保证代码质量

**解决方案**：

```bash
# 1. 单元测试 (Vitest)
pnpm add -D vitest @vitest/ui @vitest/coverage-v8

# 2. 组件测试 (@vue/test-utils)
pnpm add -D @vue/test-utils happy-dom

# 3. E2E 测试 (Playwright - 已安装)
# 需要添加测试用例
```

**目录结构**：
```
src/
├── components/
│   ├── button/
│   │   ├── index.vue
│   │   └── __tests__/
│   │       └── button.test.ts
├── shared/
│   ├── composables/
│   │   ├── use-request.ts
│   │   └── __tests__/
│   │       └── use-request.test.ts
tests/
├── unit/           # 单元测试
├── integration/    # 集成测试
└── e2e/           # E2E 测试
    ├── login.spec.ts
    ├── dashboard.spec.ts
    └── fixtures/
```

**示例测试**：
```typescript
// src/shared/composables/__tests__/use-request.test.ts
import { describe, it, expect, vi } from 'vitest';
import { useRequest } from '../use-request';

describe('useRequest', () => {
  it('should handle successful request', async () => {
    const mockFn = vi.fn().mockResolvedValue({ data: 'test' });
    const { data, loading, execute } = useRequest(mockFn);
    
    await execute();
    
    expect(loading.value).toBe(false);
    expect(data.value).toEqual({ data: 'test' });
  });
});
```

**目标**：
- 单元测试覆盖率 > 80%
- 核心功能 E2E 测试覆盖
- CI 中自动运行测试

---

#### 2. **完善 CI/CD 流程** ⭐⭐⭐⭐⭐

**问题**：缺少自动化测试和部署流程

**解决方案**：

创建 `.github/workflows/ci.yml`：

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  # 代码质量检查
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint:check
      - run: pnpm type-check

  # 单元测试
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  # E2E 测试
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm playwright install --with-deps
      - run: pnpm test:e2e

  # 构建
  build:
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  # 部署到测试环境
  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: dist
      - name: Deploy to Staging
        run: |
          # 部署到测试服务器
          echo "Deploying to staging..."

  # 部署到生产环境
  deploy-production:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: dist
      - name: Deploy to Production
        run: |
          # 部署到生产服务器
          echo "Deploying to production..."
```

**Docker 优化**：

```dockerfile
# 多阶段构建
FROM node:20-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制依赖文件
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建
RUN pnpm build

# 生产镜像
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Kubernetes 部署**：

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vue3-admin
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vue3-admin
  template:
    metadata:
      labels:
        app: vue3-admin
    spec:
      containers:
      - name: vue3-admin
        image: your-registry/vue3-admin:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: vue3-admin-service
spec:
  selector:
    app: vue3-admin
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

---

#### 3. **集成监控和日志系统** ⭐⭐⭐⭐⭐

**问题**：无法追踪线上问题和性能

**解决方案**：

**3.1 Sentry 错误追踪（已安装，需配置）**

```typescript
// src/core/modules/sentry.ts
import * as Sentry from '@sentry/vue';
import type { App } from 'vue';
import type { Router } from 'vue-router';

export function setupSentry(app: App, router: Router) {
  if (import.meta.env.PROD) {
    Sentry.init({
      app,
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        Sentry.browserTracingIntegration({ router }),
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      // 性能监控
      tracesSampleRate: 1.0,
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      // 环境
      environment: import.meta.env.MODE,
      // 版本
      release: import.meta.env.VITE_APP_VERSION,
    });
  }
}
```

**3.2 前端监控（推荐 Web Vitals + 自定义上报）**

```typescript
// src/core/modules/monitor.ts
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

interface MetricData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// 上报性能数据
function reportMetric(metric: MetricData) {
  // 发送到监控平台
  fetch('/api/metrics', {
    method: 'POST',
    body: JSON.stringify({
      ...metric,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch(console.error);
}

export function setupWebVitals() {
  onCLS(reportMetric);
  onFID(reportMetric);
  onLCP(reportMetric);
  onFCP(reportMetric);
  onTTFB(reportMetric);
}

// 自定义性能监控
export function setupCustomMonitor() {
  // 监控路由切换性能
  // 监控 API 请求性能
  // 监控资源加载性能
}
```

**3.3 日志系统**

```typescript
// src/shared/utils/logger.ts
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

class Logger {
  private level: LogLevel = LogLevel.INFO;
  
  debug(...args: any[]) {
    if (this.level <= LogLevel.DEBUG) {
      console.debug('[DEBUG]', ...args);
      this.report('debug', args);
    }
  }
  
  info(...args: any[]) {
    if (this.level <= LogLevel.INFO) {
      console.info('[INFO]', ...args);
      this.report('info', args);
    }
  }
  
  warn(...args: any[]) {
    if (this.level <= LogLevel.WARN) {
      console.warn('[WARN]', ...args);
      this.report('warn', args);
    }
  }
  
  error(...args: any[]) {
    if (this.level <= LogLevel.ERROR) {
      console.error('[ERROR]', ...args);
      this.report('error', args);
    }
  }
  
  private report(level: string, data: any[]) {
    // 上报到日志平台
    if (import.meta.env.PROD) {
      fetch('/api/logs', {
        method: 'POST',
        body: JSON.stringify({
          level,
          data,
          url: window.location.href,
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    }
  }
}

export const logger = new Logger();
```

---

### 🟡 P1 - 重要但不紧急

#### 4. **集成微前端框架** ⭐⭐⭐⭐

**推荐方案**：qiankun 或 micro-app

```bash
pnpm add qiankun
```

```typescript
// src/core/modules/micro-frontend.ts
import { registerMicroApps, start } from 'qiankun';

export function setupMicroApps() {
  registerMicroApps([
    {
      name: 'sub-app-1',
      entry: '//localhost:8081',
      container: '#subapp-container',
      activeRule: '/sub-app-1',
    },
    {
      name: 'sub-app-2',
      entry: '//localhost:8082',
      container: '#subapp-container',
      activeRule: '/sub-app-2',
    },
  ]);

  start({
    prefetch: true,
    sandbox: {
      experimentalStyleIsolation: true,
    },
  });
}
```

---

#### 5. **增强安全防护** ⭐⭐⭐⭐

**5.1 XSS 防护**

```typescript
// src/shared/utils/xss.ts
import DOMPurify from 'dompurify';

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title', 'target'],
  });
}

// 在 v-html 指令中使用
app.directive('safe-html', {
  mounted(el, binding) {
    el.innerHTML = sanitizeHtml(binding.value);
  },
  updated(el, binding) {
    el.innerHTML = sanitizeHtml(binding.value);
  },
});
```

**5.2 CSRF 防护**

```typescript
// src/shared/utils/csrf.ts
export function getCsrfToken(): string {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}

// 在 axios 拦截器中添加
axios.interceptors.request.use((config) => {
  config.headers['X-CSRF-Token'] = getCsrfToken();
  return config;
});
```

**5.3 请求加密**

```typescript
// src/shared/utils/crypto.ts
import CryptoES from 'crypto-es';

const SECRET_KEY = import.meta.env.VITE_CRYPTO_KEY;

export function encrypt(data: any): string {
  return CryptoES.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decrypt(ciphertext: string): any {
  const bytes = CryptoES.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoES.enc.Utf8));
}
```

---

#### 6. **数据可视化增强** ⭐⭐⭐

**推荐集成**：

```bash
# 大屏可视化
pnpm add @jiaminghi/data-view

# 3D 可视化
pnpm add three @types/three

# 地图可视化
pnpm add echarts-gl
```

---

#### 7. **低代码能力** ⭐⭐⭐

**推荐方案**：

```bash
# 表单设计器
pnpm add form-generator-vue3

# 页面设计器（可选）
pnpm add @vueuse/motion
```

---

### 🟢 P2 - 可选增强

#### 8. **性能优化**

- ✅ 虚拟滚动（大列表）
- ✅ 图片懒加载
- ✅ 路由懒加载
- ✅ 组件懒加载
- ✅ CDN 加速

#### 9. **开发体验优化**

- ✅ Storybook 组件文档
- ✅ VitePress 项目文档
- ✅ 代码片段（Snippets）
- ✅ 开发者工具

#### 10. **国际化增强**

- ✅ 自动翻译
- ✅ 语言包管理
- ✅ RTL 支持

---

## 📦 推荐的主流技术集成

### 必须集成 ⭐⭐⭐⭐⭐

1. **Vitest** - 单元测试
2. **Playwright** - E2E 测试（已安装）
3. **Sentry** - 错误追踪（已安装，需配置）
4. **Web Vitals** - 性能监控（已安装，需配置）
5. **GitHub Actions** - CI/CD（已有，需完善）

### 强烈推荐 ⭐⭐⭐⭐

6. **qiankun/micro-app** - 微前端
7. **DOMPurify** - XSS 防护
8. **Storybook** - 组件文档
9. **VueUse** - 工具函数（已安装）
10. **Tailwind CSS** - 原子化 CSS（可选）

### 可选集成 ⭐⭐⭐

11. **Socket.io** - WebSocket
12. **IndexedDB** - 本地存储
13. **Service Worker** - 离线缓存（PWA 已支持）
14. **WebRTC** - 音视频通信
15. **Three.js** - 3D 可视化

---

## 🎯 实施路线图

### 第一阶段（1-2周）- 基础完善

- [ ] 搭建测试框架
- [ ] 编写核心功能测试用例
- [ ] 完善 CI/CD 流程
- [ ] 配置 Sentry

### 第二阶段（2-3周）- 监控和安全

- [ ] 集成性能监控
- [ ] 添加安全防护
- [ ] 完善日志系统
- [ ] 优化 Docker 部署

### 第三阶段（3-4周）- 功能增强

- [ ] 集成微前端
- [ ] 增强数据可视化
- [ ] 添加低代码能力
- [ ] 完善文档

### 第四阶段（持续）- 优化迭代

- [ ] 性能优化
- [ ] 用户体验优化
- [ ] 新技术探索
- [ ] 最佳实践总结

---

## 📚 参考资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Vitest 文档](https://vitest.dev/)
- [Playwright 文档](https://playwright.dev/)
- [Sentry 文档](https://docs.sentry.io/)
- [qiankun 文档](https://qiankun.umijs.org/)

---

**总结**：

作为企业级脚手架，当前项目的基础架构已经很好，但在**测试、CI/CD、监控、安全**等方面还有较大提升空间。建议优先完成 P0 级别的改进，然后逐步推进 P1 和 P2 级别的优化。
