/**
 * @description 弹窗Hook - 统一处理弹窗逻辑
 * @author 现代化架构
 */

import { ref, type Ref } from 'vue';

/**
 * 弹窗选项接口
 */
export interface UseModalOptions {
  /** 默认是否可见 */
  defaultVisible?: boolean;
  /** 打开前的回调 */
  onBeforeOpen?: () => boolean | Promise<boolean>;
  /** 打开后的回调 */
  onOpen?: () => void;
  /** 关闭前的回调 */
  onBeforeClose?: () => boolean | Promise<boolean>;
  /** 关闭后的回调 */
  onClose?: () => void;
}

/**
 * 弹窗返回值接口
 */
export interface UseModalReturn {
  /** 是否可见 */
  visible: Ref<boolean>;
  /** 打开弹窗 */
  open: () => Promise<void>;
  /** 关闭弹窗 */
  close: () => Promise<void>;
  /** 切换弹窗 */
  toggle: () => Promise<void>;
}

/**
 * 弹窗Hook
 */
export function useModal(options: UseModalOptions = {}): UseModalReturn {
  const { defaultVisible = false, onBeforeOpen, onOpen, onBeforeClose, onClose } = options;

  // 是否可见
  const visible = ref(defaultVisible);

  /**
   * 打开弹窗
   */
  const open = async (): Promise<void> => {
    // 打开前的回调
    if (onBeforeOpen) {
      const canOpen = await onBeforeOpen();
      if (!canOpen) {
        return;
      }
    }

    visible.value = true;

    // 打开后的回调
    onOpen?.();
  };

  /**
   * 关闭弹窗
   */
  const close = async (): Promise<void> => {
    // 关闭前的回调
    if (onBeforeClose) {
      const canClose = await onBeforeClose();
      if (!canClose) {
        return;
      }
    }

    visible.value = false;

    // 关闭后的回调
    onClose?.();
  };

  /**
   * 切换弹窗
   */
  const toggle = async (): Promise<void> => {
    if (visible.value) {
      await close();
    } else {
      await open();
    }
  };

  return {
    visible,
    open,
    close,
    toggle,
  };
}

/**
 * 确认弹窗Hook
 */
export interface UseConfirmOptions {
  /** 标题 */
  title?: string;
  /** 内容 */
  content?: string;
  /** 确认按钮文字 */
  confirmText?: string;
  /** 取消按钮文字 */
  cancelText?: string;
  /** 确认回调 */
  onConfirm?: () => void | Promise<void>;
  /** 取消回调 */
  onCancel?: () => void;
}

export interface UseConfirmReturn extends UseModalReturn {
  /** 确认中状态 */
  confirming: Ref<boolean>;
  /** 确认 */
  confirm: () => Promise<void>;
  /** 取消 */
  cancel: () => void;
}

/**
 * 确认弹窗Hook
 */
export function useConfirm(options: UseConfirmOptions = {}): UseConfirmReturn {
  const { onConfirm, onCancel } = options;

  const modal = useModal();
  const confirming = ref(false);

  /**
   * 确认
   */
  const confirm = async (): Promise<void> => {
    if (!onConfirm) {
      await modal.close();
      return;
    }

    confirming.value = true;

    try {
      await onConfirm();
      await modal.close();
    } catch (error) {
      console.error('确认操作失败:', error);
      throw error;
    } finally {
      confirming.value = false;
    }
  };

  /**
   * 取消
   */
  const cancel = (): void => {
    onCancel?.();
    modal.close();
  };

  return {
    ...modal,
    confirming,
    confirm,
    cancel,
  };
}

export default useModal;
