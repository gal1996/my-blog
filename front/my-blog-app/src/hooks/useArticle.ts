import { useState, useEffect } from 'react';
import type { Article, AsyncState } from '../types';
import { articlesApi } from '../api';

export const useArticle = (id: string | null): AsyncState<Article> => {
  const [state, setState] = useState<AsyncState<Article>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setState({
        data: null,
        loading: false,
        error: null,
      });
      return;
    }

    const fetchArticle = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const article = await articlesApi.getById(Number(id));
        setState({
          data: article,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch article',
        });
      }
    };

    fetchArticle();
  }, [id]);

  return state;
};