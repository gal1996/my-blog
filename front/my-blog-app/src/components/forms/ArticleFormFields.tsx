import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { ImagePreview } from '../article/ImagePreview';
import type { ArticleFormData } from '../../hooks/useArticleForm';

interface ArticleFormFieldsProps {
  formData: ArticleFormData;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onImageUrlChange: (value: string) => void;
  disabled?: boolean;
}

export const ArticleFormFields: React.FC<ArticleFormFieldsProps> = ({
  formData,
  onTitleChange,
  onContentChange,
  onImageUrlChange,
  disabled = false
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e.target.value);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageUrlChange(e.target.value);
  };

  const handleContentChange = (value?: string) => {
    onContentChange(value || '');
  };

  return (
    <div className="space-y-6">
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
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="https://example.com/image.jpg"
        />
        <ImagePreview imageUrl={formData.imageUrl} />
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
    </div>
  );
};