/**
 * @description 表单管理 Composable
 * @author 现代化重构版本
 */

import { ref, reactive, computed, type Ref } from 'vue';

/**
 * 表单验证规则
 */
export interface FormRule {
  /**
   * 是否必填
   */
  required?: boolean;

  /**
   * 错误提示信息
   */
  message?: string;

  /**
   * 最小长度
   */
  min?: number;

  /**
   * 最大长度
   */
  max?: number;

  /**
   * 正则表达式
   */
  pattern?: RegExp;

  /**
   * 自定义验证函数
   */
  validator?: (value: any) => boolean | string | Promise<boolean | string>;

  /**
   * 触发时机
   */
  trigger?: 'blur' | 'change' | 'submit';
}

/**
 * 表单字段规则
 */
export type FormRules<T> = {
  [K in keyof T]?: FormRule[];
};

/**
 * 表单错误
 */
export type FormErrors<T> = {
  [K in keyof T]?: string;
};

/**
 * 表单配置选项
 */
export interface UseFormOptions<T> {
  /**
   * 初始值
   */
  initialValues: T;

  /**
   * 验证规则
   */
  rules?: FormRules<T>;

  /**
   * 提交回调
   */
  onSubmit?: (values: T) => void | Promise<void>;

  /**
   * 验证失败回调
   */
  onValidateFailed?: (errors: FormErrors<T>) => void;
}

/**
 * 表单返回值
 */
export interface UseFormReturn<T> {
  /**
   * 表单值
   */
  values: T;

  /**
   * 错误信息
   */
  errors: Ref<FormErrors<T>>;

  /**
   * 是否正在提交
   */
  submitting: Ref<boolean>;

  /**
   * 是否已修改
   */
  isDirty: Ref<boolean>;

  /**
   * 是否有效
   */
  isValid: Ref<boolean>;

  /**
   * 设置字段值
   */
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;

  /**
   * 设置字段错误
   */
  setFieldError: <K extends keyof T>(field: K, error: string) => void;

  /**
   * 验证字段
   */
  validateField: <K extends keyof T>(field: K) => Promise<boolean>;

  /**
   * 验证表单
   */
  validate: () => Promise<boolean>;

  /**
   * 提交表单
   */
  submit: () => Promise<void>;

  /**
   * 处理提交（验证后提交）
   */
  handleSubmit: (e?: Event) => Promise<void>;

  /**
   * 重置表单
   */
  reset: () => void;

  /**
   * 清空错误
   */
  clearErrors: () => void;
}

/**
 * 表单管理 Hook
 *
 * @example
 * ```ts
 * interface LoginForm {
 *   username: string
 *   password: string
 * }
 *
 * const {
 *   values,
 *   errors,
 *   submitting,
 *   setFieldValue,
 *   validate,
 *   submit
 * } = useForm<LoginForm>({
 *   initialValues: {
 *     username: '',
 *     password: ''
 *   },
 *   rules: {
 *     username: [
 *       { required: true, message: '请输入用户名' },
 *       { min: 3, message: '用户名至少3个字符' }
 *     ],
 *     password: [
 *       { required: true, message: '请输入密码' },
 *       { min: 6, message: '密码至少6个字符' }
 *     ]
 *   },
 *   onSubmit: async (values) => {
 *     await loginApi(values)
 *   }
 * })
 * ```
 */
export function useForm<T extends Record<string, any>>(options: UseFormOptions<T>): UseFormReturn<T> {
  const { initialValues, rules = {}, onSubmit, onValidateFailed } = options;

  // State
  const values = reactive({ ...initialValues }) as T;
  const errors = ref<FormErrors<T>>({}) as Ref<FormErrors<T>>;
  const submitting = ref(false);
  const initialValuesRef = ref({ ...initialValues }) as Ref<T>;

  // Computed
  const isDirty = computed(() => {
    return Object.keys(values).some((key) => values[key] !== initialValuesRef.value[key]);
  });

  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0;
  });

  /**
   * 验证单个字段
   */
  async function validateField<K extends keyof T>(field: K): Promise<boolean> {
    const fieldRules = (rules as any)[field];
    if (!fieldRules || fieldRules.length === 0) {
      return true;
    }

    const value = (values as any)[field];

    for (const rule of fieldRules) {
      // 必填验证
      if (rule.required && !value) {
        errors.value[field] = rule.message || `${String(field)} 是必填项`;
        return false;
      }

      // 跳过空值的其他验证
      if (!value && !rule.required) {
        continue;
      }

      // 最小长度验证
      if (rule.min !== undefined && String(value).length < rule.min) {
        errors.value[field] = rule.message || `${String(field)} 至少 ${rule.min} 个字符`;
        return false;
      }

      // 最大长度验证
      if (rule.max !== undefined && String(value).length > rule.max) {
        errors.value[field] = rule.message || `${String(field)} 最多 ${rule.max} 个字符`;
        return false;
      }

      // 正则验证
      if (rule.pattern && !rule.pattern.test(String(value))) {
        errors.value[field] = rule.message || `${String(field)} 格式不正确`;
        return false;
      }

      // 自定义验证
      if (rule.validator) {
        const result = await rule.validator(value);
        if (result !== true) {
          errors.value[field] = typeof result === 'string' ? result : rule.message || '验证失败';
          return false;
        }
      }
    }

    // 验证通过，清除错误
    delete errors.value[field];
    return true;
  }

  /**
   * 验证整个表单
   */
  async function validate(): Promise<boolean> {
    const fields = Object.keys(rules) as (keyof T)[];
    const results = await Promise.all(fields.map((field) => validateField(field)));

    const isValid = results.every((result) => result);

    if (!isValid && onValidateFailed) {
      onValidateFailed(errors.value);
    }

    return isValid;
  }

  /**
   * 设置字段值
   */
  function setFieldValue<K extends keyof T>(field: K, value: T[K]): void {
    (values as any)[field] = value;

    // 自动验证（如果有规则）
    const fieldRules = (rules as any)[field];
    if (fieldRules && fieldRules.some((rule: FormRule) => rule.trigger === 'change')) {
      validateField(field);
    }
  }

  /**
   * 设置字段错误
   */
  function setFieldError<K extends keyof T>(field: K, error: string): void {
    errors.value[field] = error;
  }

  /**
   * 提交表单
   */
  async function submit(): Promise<void> {
    if (submitting.value) {
      return;
    }

    const isValid = await validate();
    if (!isValid) {
      return;
    }

    if (!onSubmit) {
      return;
    }

    submitting.value = true;
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('表单提交失败:', error);
      throw error;
    } finally {
      submitting.value = false;
    }
  }

  /**
   * 处理提交（验证后提交）
   */
  async function handleSubmit(e?: Event): Promise<void> {
    if (e) {
      e.preventDefault();
    }
    await submit();
  }

  /**
   * 重置表单
   */
  function reset(): void {
    Object.keys(values).forEach((key) => {
      (values as any)[key] = (initialValuesRef.value as any)[key];
    });
    clearErrors();
  }

  /**
   * 清空错误
   */
  function clearErrors(): void {
    errors.value = {};
  }

  return {
    values,
    errors,
    submitting,
    isDirty,
    isValid,
    setFieldValue,
    setFieldError,
    validateField,
    validate,
    submit,
    handleSubmit,
    reset,
    clearErrors,
  };
}
