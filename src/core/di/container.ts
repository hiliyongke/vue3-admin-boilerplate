/**
 * @description 现代化依赖注入容器
 * @author 2024最新架构
 */

/**
 * 服务标识符类型
 */
export type ServiceIdentifier<T = any> = string | symbol | (new (...args: any[]) => T);

/**
 * 服务生命周期
 */
export enum ServiceLifetime {
  /** 单例模式 - 全局唯一实例 */
  Singleton = 'singleton',
  /** 瞬态模式 - 每次请求创建新实例 */
  Transient = 'transient',
  /** 作用域模式 - 在特定作用域内单例 */
  Scoped = 'scoped',
}

/**
 * 服务描述符
 */
export interface ServiceDescriptor<T = any> {
  /** 服务标识符 */
  identifier: ServiceIdentifier<T>;
  /** 服务实现 */
  implementation: new (...args: any[]) => T;
  /** 生命周期 */
  lifetime: ServiceLifetime;
  /** 依赖项 */
  dependencies?: ServiceIdentifier[];
  /** 工厂函数 */
  factory?: (...args: any[]) => T;
}

/**
 * 依赖注入容器
 */
export class DIContainer {
  private services = new Map<ServiceIdentifier, ServiceDescriptor>();
  private instances = new Map<ServiceIdentifier, any>();
  private scopedInstances = new Map<string, Map<ServiceIdentifier, any>>();

  /**
   * 注册单例服务
   */
  registerSingleton<T>(
    identifier: ServiceIdentifier<T>,
    implementation: new (...args: any[]) => T,
    dependencies: ServiceIdentifier[] = []
  ): this {
    this.services.set(identifier, {
      identifier,
      implementation,
      lifetime: ServiceLifetime.Singleton,
      dependencies,
    });
    return this;
  }

  /**
   * 注册瞬态服务
   */
  registerTransient<T>(
    identifier: ServiceIdentifier<T>,
    implementation: new (...args: any[]) => T,
    dependencies: ServiceIdentifier[] = []
  ): this {
    this.services.set(identifier, {
      identifier,
      implementation,
      lifetime: ServiceLifetime.Transient,
      dependencies,
    });
    return this;
  }

  /**
   * 注册作用域服务
   */
  registerScoped<T>(
    identifier: ServiceIdentifier<T>,
    implementation: new (...args: any[]) => T,
    dependencies: ServiceIdentifier[] = []
  ): this {
    this.services.set(identifier, {
      identifier,
      implementation,
      lifetime: ServiceLifetime.Scoped,
      dependencies,
    });
    return this;
  }

  /**
   * 注册工厂服务
   */
  registerFactory<T>(
    identifier: ServiceIdentifier<T>,
    factory: (...args: any[]) => T,
    lifetime: ServiceLifetime = ServiceLifetime.Transient,
    dependencies: ServiceIdentifier[] = []
  ): this {
    this.services.set(identifier, {
      identifier,
      implementation: null as any,
      lifetime,
      dependencies,
      factory,
    });
    return this;
  }

  /**
   * 解析服务
   */
  resolve<T>(identifier: ServiceIdentifier<T>, scope?: string): T {
    const descriptor = this.services.get(identifier);
    if (!descriptor) {
      throw new Error(`服务未注册: ${String(identifier)}`);
    }

    // 处理不同生命周期
    switch (descriptor.lifetime) {
      case ServiceLifetime.Singleton:
        return this.resolveSingleton(descriptor);

      case ServiceLifetime.Transient:
        return this.resolveTransient(descriptor);

      case ServiceLifetime.Scoped:
        return this.resolveScoped(descriptor, scope || 'default');

      default:
        throw new Error(`不支持的生命周期: ${descriptor.lifetime}`);
    }
  }

  /**
   * 解析单例服务
   */
  private resolveSingleton<T>(descriptor: ServiceDescriptor<T>): T {
    if (this.instances.has(descriptor.identifier)) {
      return this.instances.get(descriptor.identifier);
    }

    const instance = this.createInstance(descriptor);
    this.instances.set(descriptor.identifier, instance);
    return instance;
  }

  /**
   * 解析瞬态服务
   */
  private resolveTransient<T>(descriptor: ServiceDescriptor<T>): T {
    return this.createInstance(descriptor);
  }

  /**
   * 解析作用域服务
   */
  private resolveScoped<T>(descriptor: ServiceDescriptor<T>, scope: string): T {
    if (!this.scopedInstances.has(scope)) {
      this.scopedInstances.set(scope, new Map());
    }

    const scopeMap = this.scopedInstances.get(scope)!;
    if (scopeMap.has(descriptor.identifier)) {
      return scopeMap.get(descriptor.identifier);
    }

    const instance = this.createInstance(descriptor);
    scopeMap.set(descriptor.identifier, instance);
    return instance;
  }

  /**
   * 创建服务实例
   */
  private createInstance<T>(descriptor: ServiceDescriptor<T>): T {
    // 使用工厂函数
    if (descriptor.factory) {
      const dependencies = this.resolveDependencies(descriptor.dependencies || []);
      return descriptor.factory(...dependencies);
    }

    // 使用构造函数
    const dependencies = this.resolveDependencies(descriptor.dependencies || []);
    return new descriptor.implementation(...dependencies);
  }

  /**
   * 解析依赖项
   */
  private resolveDependencies(dependencies: ServiceIdentifier[]): any[] {
    return dependencies.map((dep) => this.resolve(dep));
  }

  /**
   * 清理作用域
   */
  clearScope(scope: string): void {
    this.scopedInstances.delete(scope);
  }

  /**
   * 检查服务是否已注册
   */
  isRegistered<T>(identifier: ServiceIdentifier<T>): boolean {
    return this.services.has(identifier);
  }

  /**
   * 获取所有已注册的服务
   */
  getRegisteredServices(): ServiceIdentifier[] {
    return Array.from(this.services.keys());
  }
}

/**
 * 全局容器实例
 */
export const container = new DIContainer();

/**
 * 服务装饰器
 */
export function Injectable<T>(
  identifier?: ServiceIdentifier<T>,
  lifetime: ServiceLifetime = ServiceLifetime.Transient
) {
  return function (target: new (...args: any[]) => T) {
    const serviceId = identifier || target;

    // 自动注册服务
    switch (lifetime) {
      case ServiceLifetime.Singleton:
        container.registerSingleton(serviceId, target);
        break;
      case ServiceLifetime.Transient:
        container.registerTransient(serviceId, target);
        break;
      case ServiceLifetime.Scoped:
        container.registerScoped(serviceId, target);
        break;
    }

    return target;
  };
}

/**
 * 注入装饰器
 */
export function Inject<T>(identifier: ServiceIdentifier<T>) {
  return function (target: any, propertyKey: string | symbol) {
    // 延迟注入
    Object.defineProperty(target, propertyKey, {
      get() {
        return container.resolve(identifier);
      },
      enumerable: true,
      configurable: true,
    });
  };
}
