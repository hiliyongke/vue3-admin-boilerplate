/*
 * @Description: 锁屏
 */
import { defineStore } from 'pinia';
import { IS_LOCK_SCREEN } from '@/enums/cache-enum';
import { Storage } from '@/utils/storage';
import { DEFAULT_LOCK_TIME } from '@/constants/app';

const isLock = Storage.get(IS_LOCK_SCREEN, false);

export type LockScreenState = {
  isLock: boolean; // 是否锁屏
  lockTime: number;
};

export const useLockScreenStore = defineStore({
  id: 'lock-screen',
  state: (): LockScreenState => ({
    isLock: isLock === true, // 是否锁屏
    lockTime: isLock == 'true' ? DEFAULT_LOCK_TIME : 0
  }),
  actions: {
    setLock(isLock: boolean) {
      this.isLock = isLock;
      Storage.set(IS_LOCK_SCREEN, this.isLock);
    },
    setLockTime(lockTime = DEFAULT_LOCK_TIME) {
      this.lockTime = lockTime;
    }
  }
});
