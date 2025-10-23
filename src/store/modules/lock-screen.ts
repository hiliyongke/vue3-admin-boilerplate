/**
 * @description 锁屏状态管理
 * @author 现代化重构版本
 */

import { defineStore } from 'pinia';
import { logger } from '@/shared/utils';
import { ref, computed } from 'vue';
import { IS_LOCK_SCREEN } from '@/enums/cache-enum';
import { Storage } from '@/utils/storage';
import { DEFAULT_LOCK_TIME } from '@/constants/app';

/**
 * 锁屏 Store - Setup Store 模式
 *
 * @example
 * ```ts
 * const lockScreenStore = useLockScreenStore()
 * lockScreenStore.lock() // 锁定屏幕
 * lockScreenStore.unlock('password') // 解锁屏幕
 * ```
 */
export const useLockScreenStore = defineStore(
  'lock-screen',
  () => {
    // ==================== State ====================

    /**
     * 是否锁屏
     */
    const isLock = ref<boolean>(Storage.get(IS_LOCK_SCREEN, false) === true);

    /**
     * 锁屏时间（分钟）
     */
    const lockTime = ref<number>(isLock.value ? DEFAULT_LOCK_TIME : 0);

    /**
     * 锁屏密码
     */
    const lockPassword = ref<string>('');

    /**
     * 最后活动时间
     */
    const lastActiveTime = ref<number>(Date.now());

    // ==================== Getters ====================

    /**
     * 是否启用自动锁屏
     */
    const isAutoLockEnabled = computed<boolean>(() => lockTime.value > 0);

    /**
     * 距离自动锁屏的剩余时间（毫秒）
     */
    const remainingTime = computed<number>(() => {
      if (!isAutoLockEnabled.value || isLock.value) {
        return 0;
      }
      const elapsed = Date.now() - lastActiveTime.value;
      const lockTimeMs = lockTime.value * 60 * 1000;
      return Math.max(0, lockTimeMs - elapsed);
    });

    /**
     * 是否即将锁屏（剩余时间少于1分钟）
     */
    const isAboutToLock = computed<boolean>(
      () => isAutoLockEnabled.value && !isLock.value && remainingTime.value < 60000
    );

    // ==================== Actions ====================

    /**
     * 锁定屏幕
     * @param password - 锁屏密码（可选）
     */
    function lock(password?: string): void {
      isLock.value = true;
      if (password) {
        lockPassword.value = password;
      }
      Storage.set(IS_LOCK_SCREEN, true);
      logger.debug('🔒 屏幕已锁定');
    }

    /**
     * 解锁屏幕
     * @param password - 解锁密码
     * @returns 是否解锁成功
     */
    function unlock(password: string): boolean {
      if (!lockPassword.value || password === lockPassword.value) {
        isLock.value = false;
        lockPassword.value = '';
        lastActiveTime.value = Date.now();
        Storage.set(IS_LOCK_SCREEN, false);
        logger.debug('🔓 屏幕已解锁');
        return true;
      }
      logger.warn('❌ 密码错误');
      return false;
    }

    /**
     * 设置锁屏状态
     * @param locked - 是否锁定
     */
    function setLock(locked: boolean): void {
      if (locked) {
        lock();
      } else {
        isLock.value = false;
        Storage.set(IS_LOCK_SCREEN, false);
      }
    }

    /**
     * 设置自动锁屏时间
     * @param time - 锁屏时间（分钟），0 表示禁用自动锁屏
     */
    function setLockTime(time: number = DEFAULT_LOCK_TIME): void {
      lockTime.value = Math.max(0, time);
      lastActiveTime.value = Date.now();
      logger.debug(`⏰ 自动锁屏时间已设置为 ${time} 分钟`);
    }

    /**
     * 更新最后活动时间
     */
    function updateLastActiveTime(): void {
      if (!isLock.value) {
        lastActiveTime.value = Date.now();
      }
    }

    /**
     * 检查是否需要自动锁屏
     * @returns 是否需要锁屏
     */
    function checkAutoLock(): boolean {
      if (isAutoLockEnabled.value && !isLock.value && remainingTime.value === 0) {
        lock();
        return true;
      }
      return false;
    }

    /**
     * 重置锁屏状态
     */
    function reset(): void {
      isLock.value = false;
      lockTime.value = 0;
      lockPassword.value = '';
      lastActiveTime.value = Date.now();
      Storage.remove(IS_LOCK_SCREEN);
    }

    // ==================== Return ====================

    return {
      // State
      isLock,
      lockTime,
      lockPassword,
      lastActiveTime,

      // Getters
      isAutoLockEnabled,
      remainingTime,
      isAboutToLock,

      // Actions
      lock,
      unlock,
      setLock,
      setLockTime,
      updateLastActiveTime,
      checkAutoLock,
      reset,
    };
  },
  {
    persist: {
      paths: ['lockTime', 'lockPassword'],
    },
  } as any
);
