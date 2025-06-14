import { describe, it, expect } from 'vitest';
import { validateArticleForm, getFirstValidationError } from '../validation';
import type { ArticleFormData } from '../../hooks/useArticleForm';

describe('validateArticleForm', () => {
  const validFormData: ArticleFormData = {
    title: 'Test Title',
    content: 'This is a test content with enough length',
    imageUrl: 'https://example.com/image.jpg'
  };

  it('有効なフォームデータの場合、isValidがtrueになる', () => {
    const result = validateArticleForm(validFormData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('タイトルが空の場合、エラーになる', () => {
    const invalidData = { ...validFormData, title: '' };
    const result = validateArticleForm(invalidData);
    
    expect(result.isValid).toBe(false);
    expect(result.errors.title).toBe('タイトルを入力してください');
  });

  it('タイトルが100文字を超える場合、エラーになる', () => {
    const longTitle = 'a'.repeat(101);
    const invalidData = { ...validFormData, title: longTitle };
    const result = validateArticleForm(invalidData);
    
    expect(result.isValid).toBe(false);
    expect(result.errors.title).toBe('タイトルは100文字以内で入力してください');
  });

  it('コンテンツが空の場合、エラーになる', () => {
    const invalidData = { ...validFormData, content: '' };
    const result = validateArticleForm(invalidData);
    
    expect(result.isValid).toBe(false);
    expect(result.errors.content).toBe('コンテンツを入力してください');
  });

  it('コンテンツが10文字未満の場合、エラーになる', () => {
    const invalidData = { ...validFormData, content: 'short' };
    const result = validateArticleForm(invalidData);
    
    expect(result.isValid).toBe(false);
    expect(result.errors.content).toBe('コンテンツは10文字以上で入力してください');
  });

  it('画像URLが無効な場合、エラーになる', () => {
    const invalidData = { ...validFormData, imageUrl: 'invalid-url' };
    const result = validateArticleForm(invalidData);
    
    expect(result.isValid).toBe(false);
    expect(result.errors.imageUrl).toBe('有効なURLを入力してください');
  });

  it('画像URLが空の場合、エラーにならない（任意項目）', () => {
    const validData = { ...validFormData, imageUrl: '' };
    const result = validateArticleForm(validData);
    
    expect(result.isValid).toBe(true);
    expect(result.errors.imageUrl).toBeUndefined();
  });
});

describe('getFirstValidationError', () => {
  it('エラーがない場合、nullを返す', () => {
    const validResult = { isValid: true, errors: {} };
    const error = getFirstValidationError(validResult);
    
    expect(error).toBe(null);
  });

  it('エラーがある場合、最初のエラーメッセージを返す', () => {
    const invalidResult = {
      isValid: false,
      errors: {
        title: 'タイトルエラー',
        content: 'コンテンツエラー'
      }
    };
    const error = getFirstValidationError(invalidResult);
    
    expect(error).toBe('タイトルエラー');
  });
});