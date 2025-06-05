import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useArticles } from '../../hooks/useArticles';
import { articlesApi } from '../../api';
import type { Article } from '../../types';

// Mock the API
vi.mock('../../api', () => ({
  articlesApi: {
    getAll: vi.fn(),
  },
}));

const mockArticlesApi = vi.mocked(articlesApi);

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Test Article 1',
    excerpt: 'Test excerpt 1',
    content: 'Test content 1',
    imageUrl: 'https://example.com/image1.jpg',
    publishedAt: '2023-01-01',
  },
  {
    id: 2,
    title: 'Test Article 2',
    excerpt: 'Test excerpt 2',
    content: 'Test content 2',
    imageUrl: 'https://example.com/image2.jpg',
    publishedAt: '2023-01-02',
  },
];

describe('useArticles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return loading state initially', () => {
    mockArticlesApi.getAll.mockResolvedValue(mockArticles);

    const { result } = renderHook(() => useArticles());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('should fetch articles successfully', async () => {
    mockArticlesApi.getAll.mockResolvedValue(mockArticles);

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockArticles);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch error', async () => {
    const errorMessage = 'Failed to fetch';
    mockArticlesApi.getAll.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(errorMessage);
  });
});