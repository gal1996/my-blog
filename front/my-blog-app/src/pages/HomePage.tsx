import React from 'react';
import { useArticles } from '../hooks';
import { ArticleList, LoadingContainer, ErrorContainer } from '../components';

export const HomePage: React.FC = () => {
  const { data: articles, loading, error } = useArticles();

  if (loading) {
    return <LoadingContainer />;
  }

  if (error) {
    return <ErrorContainer error={error} />;
  }

  if (!articles) {
    return <ErrorContainer error="記事の取得に失敗しました" />;
  }

  return <ArticleList articles={articles} />;
};