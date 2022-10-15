import { MessagePlugin } from 'tdesign-vue-next';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

import { getPermissionStore, getUserStore } from '@/store';
import router from '@/router';

const permissionStore = getPermissionStore(),
  userStore = getUserStore();

NProgress.configure({ showSpinner: false });

const { whiteListRouters } = permissionStore;

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  /* 跳转参数判断，url包含可以脚本时拒绝跳转 */
  const query = Object.keys(to.query);
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
      if (reg.test(param.toLowerCase())) {
        alert('请求参数不合法！');
        next({ path: to.path, query: {} });
        return;
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

        if (router.hasRoute(to.name)) {
          next();
        } else {
          next('/');
        }
      } catch (error) {
        MessagePlugin.error(error);
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
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
