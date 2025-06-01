import { GET } from './route';
import { Article } from '../../data/articles';
import { describe, expect, test } from 'vitest';

describe('GET /api/articles', () => {
  test('should return a list of articles', async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const articles: Article[] = await response.json();
    expect(Array.isArray(articles)).toBe(true);
    expect(articles.length).toBeGreaterThan(0);
  });
});
