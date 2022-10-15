import { APP_TITLE } from '../../config/constant';
import { version } from '../../package.json';
export function setupConsole() {
  console.log(
    `%c%c应用名称%c${APP_TITLE}`,
    'line-height:12px;',
    'line-height:12px;padding:4px;background:#222;color:#fff;font-size:12px;margin-right:15px',
    'color:#008000;line-height:12px;font-size:12px;'
  );
  console.log(
    `%c%c网站地址%c${location.host}`,
    'line-height:12px;',
    'line-height:12px;padding:4px;background:#222;color:#fff;font-size:12px;margin-right:15px',
    'color:#ff9900;line-height:12px;font-size:12px;'
  );
  console.log(
    `%c%c当前环境%c${import.meta.env.MODE}`,
    'line-height:12px;',
    'line-height:12px;padding:4px;background:#222;color:#fff;font-size:12px;margin-right:15px',
    'color:#3fa9f5;line-height:12px;font-size:12px;'
  );
  console.log(
    `%c%c当前版本%c${version}`,
    'line-height:12px;',
    'line-height:12px;padding:4px;background:#222;color:#fff;font-size:12px;margin-right:15px',
    'color:#0ffaaa;line-height:12px;font-size:12px;'
  );
}
