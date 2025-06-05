import type { Article } from '../types';
import { apiClient } from './client';

export const articlesApi = {
  getAll: (): Promise<Article[]> => {
    return apiClient.get<Article[]>('/articles');
  },

  getById: (id: number): Promise<Article> => {
    return apiClient.get<Article>(`/articles/${id}`);
  },
};

export default articlesApi;