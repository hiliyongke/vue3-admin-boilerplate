/**
 * @description useForm 单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import { useForm } from '../use-form';

describe('useForm', () => {
  it('should initialize with initial values', () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    const { values } = useForm({ initialValues });

    expect(values.name).toBe('John');
    expect(values.email).toBe('john@example.com');
  });

  it('should validate required fields', async () => {
    const { values, errors, validate } = useForm({
      initialValues: { name: '' },
      rules: {
        name: [{ required: true, message: 'Name is required' }],
      },
    });

    const isValid = await validate();

    expect(isValid).toBe(false);
    expect(errors.value.name).toBe('Name is required');
  });

  it('should validate field on change', async () => {
    const { values, errors, setFieldValue } = useForm({
      initialValues: { email: '' },
      rules: {
        email: [
          { required: true, message: 'Email is required' },
          {
            validator: (value: string) => /\S+@\S+\.\S+/.test(value),
            message: 'Invalid email format',
          },
        ],
      },
    });

    setFieldValue('email', 'invalid');
    await nextTick();

    expect(errors.value.email).toBe('Invalid email format');

    setFieldValue('email', 'test@example.com');
    await nextTick();

    expect(errors.value.email).toBeUndefined();
  });

  it('should handle form submission', async () => {
    const onSubmit = vi.fn();
    const { values, handleSubmit } = useForm({
      initialValues: { name: 'John' },
      onSubmit,
    });

    await handleSubmit();

    expect(onSubmit).toHaveBeenCalledWith(values);
  });

  it('should not submit if validation fails', async () => {
    const onSubmit = vi.fn();
    const onValidateFailed = vi.fn();

    const { handleSubmit } = useForm({
      initialValues: { name: '' },
      rules: {
        name: [{ required: true, message: 'Required' }],
      },
      onSubmit,
      onValidateFailed,
    });

    await handleSubmit();

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onValidateFailed).toHaveBeenCalled();
  });

  it('should reset form to initial values', () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    const { values, setFieldValue, reset } = useForm({ initialValues });

    setFieldValue('name', 'Jane');
    setFieldValue('email', 'jane@example.com');

    expect(values.name).toBe('Jane');

    reset();

    expect(values.name).toBe('John');
    expect(values.email).toBe('john@example.com');
  });

  it('should clear all errors', async () => {
    const { errors, validate, clearErrors } = useForm({
      initialValues: { name: '', email: '' },
      rules: {
        name: [{ required: true, message: 'Name required' }],
        email: [{ required: true, message: 'Email required' }],
      },
    });

    await validate();

    expect(errors.value.name).toBeDefined();
    expect(errors.value.email).toBeDefined();

    clearErrors();

    expect(errors.value.name).toBeUndefined();
    expect(errors.value.email).toBeUndefined();
  });

  it('should set field error manually', () => {
    const { errors, setFieldError } = useForm({
      initialValues: { name: '' },
    });

    setFieldError('name', 'Custom error');

    expect(errors.value.name).toBe('Custom error');
  });

  it('should handle custom validators', async () => {
    const customValidator = vi.fn((value: string) => value.length >= 3);

    const { values, errors, validate } = useForm({
      initialValues: { username: 'ab' },
      rules: {
        username: [
          {
            validator: customValidator,
            message: 'Username must be at least 3 characters',
          },
        ],
      },
    });

    await validate();

    expect(customValidator).toHaveBeenCalledWith('ab');
    expect(errors.value.username).toBe('Username must be at least 3 characters');
  });

  it('should track submitting state', async () => {
    const onSubmit = vi.fn().mockImplementation(() => {
      return new Promise((resolve) => setTimeout(resolve, 100));
    });

    const { submitting, handleSubmit } = useForm({
      initialValues: { name: 'John' },
      onSubmit,
    });

    expect(submitting.value).toBe(false);

    const promise = handleSubmit();
    expect(submitting.value).toBe(true);

    await promise;
    expect(submitting.value).toBe(false);
  });

  it('should validate single field', async () => {
    const { errors, validateField } = useForm({
      initialValues: { name: '', email: '' },
      rules: {
        name: [{ required: true, message: 'Name required' }],
        email: [{ required: true, message: 'Email required' }],
      },
    });

    await validateField('name');

    expect(errors.value.name).toBe('Name required');
    expect(errors.value.email).toBeUndefined();
  });
});
