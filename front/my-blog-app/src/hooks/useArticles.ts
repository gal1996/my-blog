import { useState, useEffect } from 'react';
import type { Article, AsyncState } from '../types';
import { articlesApi } from '../api';

export const useArticles = (): AsyncState<Article[]> => {
  const [state, setState] = useState<AsyncState<Article[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchArticles = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const articles = await articlesApi.getAll();
        setState({
          data: articles,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch articles',
        });
      }
    };

    fetchArticles();
  }, []);

  return state;
};