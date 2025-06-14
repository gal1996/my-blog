import type { ArticleFormData } from '../hooks/useArticleForm';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateArticleForm = (formData: ArticleFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  // タイトルのバリデーション
  if (!formData.title.trim()) {
    errors.title = 'タイトルを入力してください';
  } else if (formData.title.trim().length > 100) {
    errors.title = 'タイトルは100文字以内で入力してください';
  }

  // コンテンツのバリデーション
  if (!formData.content.trim()) {
    errors.content = 'コンテンツを入力してください';
  } else if (formData.content.trim().length < 10) {
    errors.content = 'コンテンツは10文字以上で入力してください';
  }

  // 画像URLのバリデーション（任意項目）
  if (formData.imageUrl.trim() && !isValidUrl(formData.imageUrl.trim())) {
    errors.imageUrl = '有効なURLを入力してください';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getFirstValidationError = (validationResult: ValidationResult): string | null => {
  if (validationResult.isValid) {
    return null;
  }
  
  const firstError = Object.values(validationResult.errors)[0];
  return firstError || null;
};