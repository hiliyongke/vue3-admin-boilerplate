import { APP_TITLE } from '@/constants/app';

export function warn(message: string) {
  console.warn(`[${APP_TITLE} warn]:${message}`);
}

export function error(message: string) {
  throw new Error(`[${APP_TITLE} error]:${message}`);
}
