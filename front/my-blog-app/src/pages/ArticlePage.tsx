import React from 'react';
import { useParams } from 'react-router-dom';
import { useArticle } from '../hooks';
import { ArticleDetail, LoadingContainer, ErrorContainer } from '../components';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: article, loading, error } = useArticle(id || null);

  if (loading) {
    return <LoadingContainer />;
  }

  if (error) {
    return <ErrorContainer error={error} />;
  }

  if (!article) {
    return <ErrorContainer error="記事が見つかりません" />;
  }

  return <ArticleDetail article={article} />;
};