import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticle, useArticleForm, useArticleMutation } from '../hooks';
import { LoadingSpinner, ErrorMessage } from '../components/ui';
import { ArticleFormFields } from '../components/forms/ArticleFormFields';
import { ArticleFormActions } from '../components/forms/ArticleFormActions';
import { validateArticleForm, getFirstValidationError } from '../utils/validation';

export const ArticleEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  
  const { data: article, loading, error: fetchError } = useArticle(isEditing ? id! : null);
  const { formData, updateTitle, updateContent, updateImageUrl } = useArticleForm({ 
    initialArticle: article 
  });
  const { isSubmitting, error: mutationError, createNewArticle, updateExistingArticle } = useArticleMutation();
  const [validationError, setValidationError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション
    const validationResult = validateArticleForm(formData);
    if (!validationResult.isValid) {
      const errorMessage = getFirstValidationError(validationResult);
      setValidationError(errorMessage);
      return;
    }
    
    // バリデーション成功時はエラーをクリア
    setValidationError(null);

    try {
      if (isEditing && id) {
        await updateExistingArticle(id, formData);
      } else {
        await createNewArticle(formData);
      }
      
      navigate('/');
    } catch {
      // エラーはuseArticleMutationで管理されている
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

  const displayError = validationError || mutationError || fetchError;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {isEditing ? '記事を編集' : '新しい記事を作成'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ArticleFormFields
            formData={formData}
            onTitleChange={updateTitle}
            onContentChange={updateContent}
            onImageUrlChange={updateImageUrl}
            disabled={isSubmitting}
          />

          {/* エラーメッセージ */}
          {displayError && (
            <ErrorMessage error={displayError} />
          )}

          <ArticleFormActions
            isEditing={isEditing}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
          />
        </form>
      </div>
    </div>
  );
};