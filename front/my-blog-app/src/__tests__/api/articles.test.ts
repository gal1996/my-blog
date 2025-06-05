import { describe, it, expect, beforeEach, vi } from 'vitest';
import { articlesApi } from '../../api/articles';
import type { Article } from '../../types';

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Test Article 1',
    excerpt: 'Test excerpt 1',
    content: 'Test content 1',
    imageUrl: 'https://example.com/image1.jpg',
    publishedAt: '2023-01-01',
  },
];

describe('articlesApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  describe('getAll', () => {
    it('should fetch all articles successfully', async () => {
      const mockFetch = vi.mocked(global.fetch);
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockArticles),
      } as Response);

      const result = await articlesApi.getAll();

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/articles', {
        method: 'GET',
      });
      expect(result).toEqual(mockArticles);
    });

    it('should throw error when fetch fails', async () => {
      const mockFetch = vi.mocked(global.fetch);
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(articlesApi.getAll()).rejects.toThrow('HTTP error! status: 500');
    });
  });

  describe('getById', () => {
    it('should fetch article by id successfully', async () => {
      const mockArticle = mockArticles[0];
      const mockFetch = vi.mocked(global.fetch);
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockArticle),
      } as Response);

      const result = await articlesApi.getById(1);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/articles/1', {
        method: 'GET',
      });
      expect(result).toEqual(mockArticle);
    });
  });
});