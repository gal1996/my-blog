import type { Article, CreateArticleRequest, UpdateArticleRequest } from '../types';
import { apiClient } from './client';

export const articlesApi = {
  getAll: (): Promise<Article[]> => {
    return apiClient.get<Article[]>('/articles');
  },

  getById: (id: number): Promise<Article> => {
    return apiClient.get<Article>(`/articles/${id}`);
  },

  create: (data: CreateArticleRequest): Promise<Article> => {
    return apiClient.post<Article>('/articles', data);
  },

  update: (id: string, data: UpdateArticleRequest): Promise<Article> => {
    return apiClient.put<Article>(`/articles/${id}`, data);
  },

  delete: (id: string): Promise<void> => {
    return apiClient.delete(`/articles/${id}`);
  },
};

export const createArticle = articlesApi.create;
export const updateArticle = articlesApi.update;
export const deleteArticle = articlesApi.delete;

export default articlesApi;