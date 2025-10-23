/**
 * @description 通知消息状态管理
 * @author 现代化重构版本
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/**
 * 消息类型
 */
export type MessageType = 'success' | 'info' | 'warning' | 'error';

/**
 * 消息优先级
 */
export type MessageQuality = 'high' | 'medium' | 'low';

/**
 * 消息接口
 */
export interface NotificationMessage {
  id: string;
  content: string;
  type: MessageType;
  status: boolean; // true: 未读, false: 已读
  collected: boolean;
  date: string;
  quality: MessageQuality;
}

/**
 * 初始消息数据
 */
const initialMsgData: NotificationMessage[] = [
  {
    id: '123',
    content: '腾讯大厦一楼改造施工项目 已通过审核！',
    type: 'success',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'high',
  },
  {
    id: '124',
    content: '三季度生产原材料采购项目 开票成功！',
    type: 'info',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low',
  },
  {
    id: '125',
    content: '2021-01-01 10:00的【国家电网线下签约】会议即将开始，请提前10分钟前往 会议室1 进行签到！',
    type: 'warning',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'medium',
  },
  {
    id: '126',
    content: '一季度生产原材料采购项目 开票成功！',
    type: 'info',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low',
  },
  {
    id: '127',
    content: '二季度生产原材料采购项目 开票成功！',
    type: 'info',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low',
  },
  {
    id: '128',
    content: '三季度生产原材料采购项目 开票成功！',
    type: 'info',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low',
  },
];

/**
 * 通知消息 Store - Setup Store 模式
 *
 * @example
 * ```ts
 * const notificationStore = useNotificationStore()
 * console.log(notificationStore.unreadCount) // 未读消息数量
 * notificationStore.markAsRead('123') // 标记为已读
 * ```
 */
export const useNotificationStore = defineStore(
  'notification',
  () => {
    // ==================== State ====================

    /**
     * 消息列表
     */
    const msgData = ref<NotificationMessage[]>([...initialMsgData]);

    // ==================== Getters ====================

    /**
     * 未读消息列表
     */
    const unreadMsg = computed<NotificationMessage[]>(() => msgData.value.filter((item) => item.status));

    /**
     * 已读消息列表
     */
    const readMsg = computed<NotificationMessage[]>(() => msgData.value.filter((item) => !item.status));

    /**
     * 未读消息数量
     */
    const unreadCount = computed<number>(() => unreadMsg.value.length);

    /**
     * 已收藏消息列表
     */
    const collectedMsg = computed<NotificationMessage[]>(() => msgData.value.filter((item) => item.collected));

    /**
     * 高优先级未读消息
     */
    const highPriorityUnread = computed<NotificationMessage[]>(() =>
      unreadMsg.value.filter((item) => item.quality === 'high')
    );

    // ==================== Actions ====================

    /**
     * 设置消息数据
     * @param data - 消息列表
     */
    function setMsgData(data: NotificationMessage[]): void {
      msgData.value = data;
    }

    /**
     * 添加消息
     * @param message - 消息对象
     */
    function addMessage(message: NotificationMessage): void {
      msgData.value.unshift(message);
    }

    /**
     * 标记消息为已读
     * @param id - 消息ID
     */
    function markAsRead(id: string): void {
      const message = msgData.value.find((item) => item.id === id);
      if (message) {
        message.status = false;
      }
    }

    /**
     * 标记所有消息为已读
     */
    function markAllAsRead(): void {
      msgData.value.forEach((item) => {
        item.status = false;
      });
    }

    /**
     * 收藏/取消收藏消息
     * @param id - 消息ID
     */
    function toggleCollect(id: string): void {
      const message = msgData.value.find((item) => item.id === id);
      if (message) {
        message.collected = !message.collected;
      }
    }

    /**
     * 删除消息
     * @param id - 消息ID
     */
    function deleteMessage(id: string): void {
      const index = msgData.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        msgData.value.splice(index, 1);
      }
    }

    /**
     * 批量删除消息
     * @param ids - 消息ID列表
     */
    function batchDelete(ids: string[]): void {
      msgData.value = msgData.value.filter((item) => !ids.includes(item.id));
    }

    /**
     * 清空所有消息
     */
    function clearAll(): void {
      msgData.value = [];
    }

    /**
     * 重置为初始数据
     */
    function reset(): void {
      msgData.value = [...initialMsgData];
    }

    // ==================== Return ====================

    return {
      // State
      msgData,

      // Getters
      unreadMsg,
      readMsg,
      unreadCount,
      collectedMsg,
      highPriorityUnread,

      // Actions
      setMsgData,
      addMessage,
      markAsRead,
      markAllAsRead,
      toggleCollect,
      deleteMessage,
      batchDelete,
      clearAll,
      reset,
    };
  },
  {
    persist: {
      paths: ['msgData'],
    },
  } as any
);
