import { MessagePlugin } from 'tdesign-vue-next';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getPermissionStore, getUserStore, useSettingStore } from '@/store';
import { AxiosCanceler } from '@/utils/request/cancel';
import { Router, RouteLocationNormalized } from 'vue-router';

/**
 * 路由切换回顶部的守卫
 * @param {Router} router vue路由对象
 */
function createScrollGuard(router: Router) {
  const isHash = (href: string) => /^#/.test(href);
  const { body } = document;
  router.afterEach(async to => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) &&
      body.scrollTo(0, 0);
    return true;
  });
}

/**
 * 用于在路由切换时关闭当前页面完成请求的接口
 * @param {Router} router vue路由对象
 */
function createHttpGuard(router: Router) {
  const axiosCanceler = new AxiosCanceler();
  router.beforeEach(async () => {
    // 切换路由会删除之前处于等待态的请求
    axiosCanceler?.removeAllPending();
    return true;
  });
}

/**
 * 路由切换时关闭存在的消息实例
 * @param {Router} router vue路由对象
 */
function createMessageGuard(router: Router) {
  router.beforeEach(() => {
    try {
      MessagePlugin?.closeAll();
    } catch (error) {
      console.warn(`message guard error:${error}`);
    }
    return true;
  });
}

/**
 * 创建页面加载进度条守卫
 * @param {Router} router vue路由对象
 */
function createProgressGuard(router: Router) {
  const settingStore = useSettingStore();
  NProgress.configure({ showSpinner: false });
  router.beforeEach((to: RouteLocationNormalized) => {
    settingStore.showPageLoading && NProgress.start();
    return true;
  });

  router.afterEach(() => {
    settingStore.showPageLoading && NProgress.done();
    return true;
  });
}

/**
 * 创建页面权限守卫
 * @param {Router} router vue路由对象
 */
function createPermissionGuard(router: Router) {
  const permissionStore = getPermissionStore();
  const userStore = getUserStore();
  // 路由白名单
  const { whiteListRouters } = permissionStore;

  router.beforeEach(async (to, from, next) => {
    /* 跳转参数判断，url包含可以脚本时拒绝跳转 */
    const query = Object.keys(to.query);
    if (query.length > 0) {
      for (const key of query) {
        const param = to.query[key];
        const illegal = [
          /<(no)?script[^>]*>.*?<\/(no)?script>/gim,
          /eval\((.*?)\)/gim,
          /expression\((.*?)\)/gim,
          /(javascript:|vbscript:|view-source:)+/gim,
          /<("[^"]*"|'[^']*'|[^'">])*>/gim,
          /(window\.location|window\.|\.location|document\.cookie|document\.|alert\(.*?\)|window\.open\()+/gim,
          /<+\s*\w*\s*(oncontrolselect|oncopy|oncut|ondataavailable|ondatasetchanged|ondatasetcomplete|ondblclick|ondeactivate|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondragstart|ondrop|οnerrοr=|onerroupdate|onfilterchange|onfinish|onfocus|onfocusin|onfocusout|onhelp|onkeydown|onkeypress|onkeyup|onlayoutcomplete|onload|onlosecapture|onmousedown|onmouseenter|onmouseleave|onmousemove|onmousout|onmouseover|onmouseup|onmousewheel|onmove|onmoveend|onmovestart|onabort|onactivate|onafterprint|onafterupdate|onbefore|onbeforeactivate|onbeforecopy|onbeforecut|onbeforedeactivate|onbeforeeditocus|onbeforepaste|onbeforeprint|onbeforeunload|onbeforeupdate|onblur|onbounce|oncellchange|onchange|onclick|oncontextmenu|onpaste|onpropertychange|onreadystatechange|onreset|onresize|onresizend|onresizestart|onrowenter|onrowexit|onrowsdelete|onrowsinserted|onscroll|onselect|onselectionchange|onselectstart|onstart|onstop|onsubmit|onunload)+\s*=+/gim
        ];
        for (const reg of illegal) {
          const paramStr = Array.isArray(param) ? param.join('') : (param || '');
          if (reg.test(paramStr.toLowerCase())) {
            MessagePlugin.error('路由参数不合法！');
            // 取消导航
            return;
          }
        }
      }
    }

    const { token } = userStore;

    if (token) {
      if (to.path === '/login') {
        userStore.logout();
        permissionStore.restore();
        next();
        return;
      }

      const { roles } = userStore;

      if (roles && roles.length > 0) {
        next();
      } else {
        try {
          await userStore.getUserInfo();

          const { roles } = userStore;

          await permissionStore.initRoutes(roles);

          if (to.name && router.hasRoute(to.name)) {
            next();
          } else {
            next('/');
          }
        } catch (error) {
          MessagePlugin.error(error instanceof Error ? error.message : '获取用户信息失败');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    } else {
      /* white list router */
      if (whiteListRouters.indexOf(to.path) !== -1) {
        next();
      } else {
        next(`/login?redirect=${to.path}`);
      }
    }
  });
}
/**
 * 构建路由守卫
 * @param {Router} router vue路由对象
 * @param {Store} store store对象
 */
export function setupRouterGuard(router: Router) {
  createHttpGuard(router);
  createScrollGuard(router);
  // createMessageGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
}
