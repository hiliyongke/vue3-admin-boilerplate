/**
 * @description: Exception related enumeration
 */
export enum ExceptionEnum {
  // Unauthorized（token过期、失效）
  TOKEN_UNAUTHORIZED = 401,

  // page not access
  PAGE_NOT_ACCESS = 403,

  // page not found
  PAGE_NOT_FOUND = 404,

  // internal server error
  INTERNAL_SERVER_ERROR = 500,

  // net work error
  NET_WORK_ERROR = 10000,

  // No data on the page. In fact, it is not an exception page
  PAGE_NOT_DATA = 10100,
}

export enum ErrorTypeEnum {
  VUE = 'vue',
  SCRIPT = 'script',
  RESOURCE = 'resource',
  AJAX = 'ajax',
  PROMISE = 'promise',
}
