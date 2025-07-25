import { defineStore } from 'pinia';
import { NotificationItem } from '@/interface';

const msgData = [
  {
    id: '123',
    content: '腾讯大厦一楼改造施工项目 已通过审核！',
    type: 'success' as const,
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'high' as const
  },
  {
    id: '124',
    content: '三季度生产原材料采购项目 开票成功！',
    type: 'info' as const,
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low' as const
  },
  {
    id: '125',
    content:
      '2021-01-01 10:00的【国家电网线下签约】会议即将开始，请提前10分钟前往 会议室1 进行签到！',
    type: 'warning' as const,
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'medium' as const
  },
  {
    id: '126',
    content: '一季度生产原材料采购项目 开票成功！',
    type: 'info' as const,
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low' as const
  },
  {
    id: '127',
    content: '二季度生产原材料采购项目 开票成功！',
    type: 'info' as const,
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low' as const
  },
  {
    id: '128',
    content: '三季度生产原材料采购项目 开票成功！',
    type: 'info' as const,
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low' as const
  }
];

type MsgDataType = typeof msgData;

export const useNotificationStore = defineStore({
  id: 'notification',
  state: () => ({
    msgData
  }),
  getters: {
    unreadMsg: state =>
      state.msgData.filter(item => item.status),
    readMsg: state =>
      state.msgData.filter(item => !item.status)
  },
  actions: {
    setMsgData(data: MsgDataType) {
      this.msgData = data;
    }
  },
  persist: true
});
