/**
 * @description 微前端注册中心
 * @author 2024最新架构
 */

/**
 * 微应用状态枚举
 */
export enum MicroAppStatus {
  /** 未加载 */
  NOT_LOADED = 'NOT_LOADED',
  /** 加载中 */
  LOADING = 'LOADING',
  /** 已加载 */
  LOADED = 'LOADED',
  /** 挂载中 */
  MOUNTING = 'MOUNTING',
  /** 已挂载 */
  MOUNTED = 'MOUNTED',
  /** 卸载中 */
  UNMOUNTING = 'UNMOUNTING',
  /** 已卸载 */
  UNMOUNTED = 'UNMOUNTED',
  /** 加载失败 */
  LOAD_ERROR = 'LOAD_ERROR',
  /** 挂载失败 */
  MOUNT_ERROR = 'MOUNT_ERROR',
}

/**
 * 微应用配置接口
 */
export interface MicroAppConfig {
  /** 应用名称 */
  name: string;
  /** 应用入口 */
  entry: string;
  /** 挂载容器 */
  container: string | HTMLElement;
  /** 激活规则 */
  activeRule: string | ((location: Location) => boolean);
  /** 应用props */
  props?: Record<string, any>;
  /** 加载器配置 */
  loader?: {
    /** 显示加载状态 */
    loading?: boolean;
    /** 自定义加载组件 */
    component?: any;
  };
  /** 沙箱配置 */
  sandbox?: {
    /** 是否启用沙箱 */
    enabled: boolean;
    /** 沙箱类型 */
    type: 'snapshot' | 'proxy';
  };
}

/**
 * 微应用实例接口
 */
export interface MicroAppInstance {
  /** 应用配置 */
  config: MicroAppConfig;
  /** 应用状态 */
  status: MicroAppStatus;
  /** 生命周期函数 */
  bootstrap?: () => Promise<void>;
  mount?: (props?: any) => Promise<void>;
  unmount?: (props?: any) => Promise<void>;
  update?: (props?: any) => Promise<void>;
}

/**
 * 微前端注册中心
 */
export class MicroFrontendRegistry {
  private apps = new Map<string, MicroAppInstance>();
  private currentApp: string | null = null;

  /**
   * 注册微应用
   */
  registerApp(config: MicroAppConfig): void {
    if (this.apps.has(config.name)) {
      console.warn(`微应用 ${config.name} 已存在，将被覆盖`);
    }

    const app: MicroAppInstance = {
      config,
      status: MicroAppStatus.NOT_LOADED,
    };

    this.apps.set(config.name, app);
    console.log(`✅ 微应用 ${config.name} 注册成功`);
  }

  /**
   * 启动微应用
   */
  async start(): Promise<void> {
    // 监听路由变化
    window.addEventListener('popstate', this.handleRouteChange.bind(this));
    window.addEventListener('hashchange', this.handleRouteChange.bind(this));

    // 初始路由检查
    await this.handleRouteChange();

    console.log('🚀 微前端系统启动成功');
  }

  /**
   * 处理路由变化
   */
  private async handleRouteChange(): Promise<void> {
    const { location } = window;
    const targetApp = this.getActiveApp(location);

    // 如果目标应用与当前应用相同，则不处理
    if (targetApp === this.currentApp) {
      return;
    }

    // 卸载当前应用
    if (this.currentApp) {
      await this.unmountApp(this.currentApp);
    }

    // 挂载目标应用
    if (targetApp) {
      await this.mountApp(targetApp);
    }

    this.currentApp = targetApp;
  }

  /**
   * 获取激活的应用
   */
  private getActiveApp(location: Location): string | null {
    for (const [name, app] of this.apps) {
      const { activeRule } = app.config;

      if (typeof activeRule === 'string') {
        if (location.pathname.startsWith(activeRule)) {
          return name;
        }
      } else if (typeof activeRule === 'function') {
        if (activeRule(location)) {
          return name;
        }
      }
    }

    return null;
  }

  /**
   * 加载微应用
   */
  private async loadApp(name: string): Promise<void> {
    const app = this.apps.get(name);
    if (!app) {
      throw new Error(`微应用 ${name} 不存在`);
    }

    if (app.status !== MicroAppStatus.NOT_LOADED) {
      return;
    }

    try {
      app.status = MicroAppStatus.LOADING;

      // 加载应用资源
      const { entry } = app.config;
      const lifeCycles = await this.importEntry(entry);

      // 绑定生命周期函数
      app.bootstrap = lifeCycles.bootstrap;
      app.mount = lifeCycles.mount;
      app.unmount = lifeCycles.unmount;
      app.update = lifeCycles.update;

      app.status = MicroAppStatus.LOADED;
      console.log(`✅ 微应用 ${name} 加载成功`);
    } catch (error) {
      app.status = MicroAppStatus.LOAD_ERROR;
      console.error(`❌ 微应用 ${name} 加载失败:`, error);
      throw error;
    }
  }

  /**
   * 挂载微应用
   */
  private async mountApp(name: string): Promise<void> {
    const app = this.apps.get(name);
    if (!app) {
      throw new Error(`微应用 ${name} 不存在`);
    }

    try {
      // 确保应用已加载
      if (app.status === MicroAppStatus.NOT_LOADED) {
        await this.loadApp(name);
      }

      app.status = MicroAppStatus.MOUNTING;

      // 执行 bootstrap
      if (app.bootstrap) {
        await app.bootstrap();
      }

      // 执行 mount
      if (app.mount) {
        await app.mount(app.config.props);
      }

      app.status = MicroAppStatus.MOUNTED;
      console.log(`✅ 微应用 ${name} 挂载成功`);
    } catch (error) {
      app.status = MicroAppStatus.MOUNT_ERROR;
      console.error(`❌ 微应用 ${name} 挂载失败:`, error);
      throw error;
    }
  }

  /**
   * 卸载微应用
   */
  private async unmountApp(name: string): Promise<void> {
    const app = this.apps.get(name);
    if (!app || app.status !== MicroAppStatus.MOUNTED) {
      return;
    }

    try {
      app.status = MicroAppStatus.UNMOUNTING;

      // 执行 unmount
      if (app.unmount) {
        await app.unmount(app.config.props);
      }

      app.status = MicroAppStatus.UNMOUNTED;
      console.log(`✅ 微应用 ${name} 卸载成功`);
    } catch (error) {
      console.error(`❌ 微应用 ${name} 卸载失败:`, error);
      throw error;
    }
  }

  /**
   * 导入应用入口
   */
  private async importEntry(entry: string): Promise<any> {
    // 这里可以实现更复杂的资源加载逻辑
    // 支持 HTML 入口、JS 入口等
    if (entry.endsWith('.js')) {
      return await import(entry);
    } else {
      // HTML 入口处理逻辑
      throw new Error('HTML 入口暂未实现');
    }
  }

  /**
   * 获取应用状态
   */
  getAppStatus(name: string): MicroAppStatus | null {
    const app = this.apps.get(name);
    return app ? app.status : null;
  }

  /**
   * 获取所有应用
   */
  getApps(): MicroAppConfig[] {
    return Array.from(this.apps.values()).map((app) => app.config);
  }

  /**
   * 卸载所有应用
   */
  async destroy(): Promise<void> {
    for (const [name] of this.apps) {
      await this.unmountApp(name);
    }

    this.apps.clear();
    this.currentApp = null;

    console.log('🔄 微前端系统已销毁');
  }
}

/**
 * 全局微前端注册中心实例
 */
export const microRegistry = new MicroFrontendRegistry();
