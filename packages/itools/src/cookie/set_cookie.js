/**
 * setCookie / getCookie / deleteCookie
 * From https://stackoverflow.com/questions/1458724/how-do-i-set-unset-cookie-with-jquery/1458728#1458728
 */
const setCookie = (name, value, option) => {
  const longTime = 10;
  // let path = '; path=/';
  const val = option && option.raw ? value : encodeURIComponent(value);
  let cookie = `${encodeURIComponent(name)}=${val}`;

  if (option) {
    if (option.days) {
      const date = new Date();
      const ms = option.days * 24 * 3600 * 1000;
      date.setTime(date.getTime() + ms);
      cookie += `; expires=${date.toGMTString()}`;
    } else if (option.hour) {
      const date = new Date();
      const ms = option.hour * 3600 * 1000;
      date.setTime(date.getTime() + ms);
      cookie += `; expires=${date.toGMTString()}`;
    } else {
      const date = new Date();
      const ms = longTime * 365 * 24 * 3600 * 1000;
      date.setTime(date.getTime() + ms);
      cookie += `; expires=${date.toGMTString()}`;
    }
    if (option.path) cookie += `; path=${option.path}`;
    if (option.domain) cookie += `; domain=${option.domain}`;
    if (option.secure) cookie += '; true';
  }

  document.cookie = cookie;
};

export default setCookie;
