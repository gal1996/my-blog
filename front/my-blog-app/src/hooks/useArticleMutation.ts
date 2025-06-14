import { useState } from 'react';
import { createArticle, updateArticle } from '../api';
import type { CreateArticleRequest, UpdateArticleRequest } from '../types';
import type { ArticleFormData } from './useArticleForm';

interface UseArticleMutationResult {
  isSubmitting: boolean;
  error: string | null;
  createNewArticle: (formData: ArticleFormData) => Promise<void>;
  updateExistingArticle: (id: string, formData: ArticleFormData) => Promise<void>;
  clearError: () => void;
}

export const useArticleMutation = (): UseArticleMutationResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const createNewArticle = async (formData: ArticleFormData): Promise<void> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const createData: CreateArticleRequest = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        imageUrl: formData.imageUrl.trim() || undefined
      };
      
      await createArticle(createData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '記事の作成に失敗しました';
      setError(errorMessage);
      throw err; // 呼び出し元でハンドリングできるように再スロー
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateExistingArticle = async (id: string, formData: ArticleFormData): Promise<void> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const updateData: UpdateArticleRequest = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        imageUrl: formData.imageUrl.trim() || undefined
      };
      
      await updateArticle(id, updateData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '記事の更新に失敗しました';
      setError(errorMessage);
      throw err; // 呼び出し元でハンドリングできるように再スロー
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    createNewArticle,
    updateExistingArticle,
    clearError
  };
};