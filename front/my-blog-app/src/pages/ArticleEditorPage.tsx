import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useArticle } from '../hooks';
import { createArticle, updateArticle } from '../api';
import { LoadingSpinner, ErrorMessage } from '../components/ui';
import type { CreateArticleRequest, UpdateArticleRequest } from '../types';

interface ArticleFormData {
  title: string;
  content: string;
  imageUrl: string;
}

export const ArticleEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: article, loading, error: fetchError } = useArticle(isEditing ? id! : null);

  useEffect(() => {
    if (isEditing && article) {
      setFormData({
        title: article.title,
        content: article.content,
        imageUrl: article.imageUrl || ''
      });
    }
  }, [isEditing, article]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: e.target.value
    }));
  };

  const handleContentChange = (value?: string) => {
    setFormData(prev => ({
      ...prev,
      content: value || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('タイトルと内容を入力してください');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (isEditing && id) {
        const updateData: UpdateArticleRequest = {
          title: formData.title.trim(),
          content: formData.content.trim(),
          imageUrl: formData.imageUrl.trim() || undefined
        };
        await updateArticle(id, updateData);
      } else {
        const createData: CreateArticleRequest = {
          title: formData.title.trim(),
          content: formData.content.trim(),
          imageUrl: formData.imageUrl.trim() || undefined
        };
        await createArticle(createData);
      }
      
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '記事の保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (isEditing && loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (isEditing && fetchError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage error={fetchError} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {isEditing ? '記事を編集' : '新しい記事を作成'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* タイトル入力 */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="記事のタイトルを入力してください"
              required
            />
          </div>

          {/* 画像URL入力 */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
              画像URL（任意）
            </label>
            <input
              type="url"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            {formData.imageUrl && (
              <div className="mt-2">
                <img
                  src={formData.imageUrl}
                  alt="プレビュー"
                  className="max-w-xs max-h-48 object-cover rounded-md border border-gray-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Markdownエディター */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              内容（Markdown形式）
            </label>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <MDEditor
                value={formData.content}
                onChange={handleContentChange}
                height={500}
                preview="edit"
                hideToolbar={false}
                visibleDragbar={false}
                data-color-mode="light"
              />
            </div>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <ErrorMessage error={error} />
          )}

          {/* ボタン */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '保存中...' : isEditing ? '更新' : '作成'}
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};