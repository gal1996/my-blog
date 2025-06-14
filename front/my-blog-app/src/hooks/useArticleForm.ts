import { useState, useEffect } from 'react';
import type { Article } from '../types';

export interface ArticleFormData {
  title: string;
  content: string;
  imageUrl: string;
}

interface UseArticleFormProps {
  initialArticle?: Article | null;
}

export const useArticleForm = ({ initialArticle }: UseArticleFormProps = {}) => {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    imageUrl: ''
  });

  // 初期データの設定
  useEffect(() => {
    if (initialArticle) {
      setFormData({
        title: initialArticle.title,
        content: initialArticle.content,
        imageUrl: initialArticle.imageUrl || ''
      });
    }
  }, [initialArticle]);

  const updateField = (field: keyof ArticleFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateTitle = (value: string) => updateField('title', value);
  const updateContent = (value: string) => updateField('content', value);
  const updateImageUrl = (value: string) => updateField('imageUrl', value);

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      imageUrl: ''
    });
  };

  return {
    formData,
    updateTitle,
    updateContent,
    updateImageUrl,
    resetForm,
    setFormData
  };
};