import React from 'react';

interface ArticleFormActionsProps {
  isEditing: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
}

export const ArticleFormActions: React.FC<ArticleFormActionsProps> = ({
  isEditing,
  isSubmitting,
  onCancel
}) => {
  return (
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
        onClick={onCancel}
        disabled={isSubmitting}
        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        キャンセル
      </button>
    </div>
  );
};