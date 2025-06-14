import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useArticleForm } from '../useArticleForm';
import type { Article } from '../../types';

describe('useArticleForm', () => {
  const mockArticle: Article = {
    id: 1,
    title: 'Test Article',
    excerpt: 'Test excerpt',
    content: 'Test content',
    imageUrl: 'https://example.com/image.jpg',
    publishedAt: '2023-01-01',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  };

  it('初期状態では空のフォームデータを返す', () => {
    const { result } = renderHook(() => useArticleForm());
    
    expect(result.current.formData).toEqual({
      title: '',
      content: '',
      imageUrl: ''
    });
  });

  it('初期記事データが提供された場合、フォームにセットされる', () => {
    const { result } = renderHook(() => 
      useArticleForm({ initialArticle: mockArticle })
    );
    
    expect(result.current.formData).toEqual({
      title: 'Test Article',
      content: 'Test content',
      imageUrl: 'https://example.com/image.jpg'
    });
  });

  it('updateTitle関数でタイトルを更新できる', () => {
    const { result } = renderHook(() => useArticleForm());
    
    act(() => {
      result.current.updateTitle('New Title');
    });
    
    expect(result.current.formData.title).toBe('New Title');
  });

  it('updateContent関数でコンテンツを更新できる', () => {
    const { result } = renderHook(() => useArticleForm());
    
    act(() => {
      result.current.updateContent('New Content');
    });
    
    expect(result.current.formData.content).toBe('New Content');
  });

  it('updateImageUrl関数で画像URLを更新できる', () => {
    const { result } = renderHook(() => useArticleForm());
    
    act(() => {
      result.current.updateImageUrl('https://new-image.com/image.jpg');
    });
    
    expect(result.current.formData.imageUrl).toBe('https://new-image.com/image.jpg');
  });

  it('resetForm関数でフォームをリセットできる', () => {
    const { result } = renderHook(() => useArticleForm());
    
    // データを設定
    act(() => {
      result.current.updateTitle('Title');
      result.current.updateContent('Content');
      result.current.updateImageUrl('https://image.com/img.jpg');
    });
    
    // リセット
    act(() => {
      result.current.resetForm();
    });
    
    expect(result.current.formData).toEqual({
      title: '',
      content: '',
      imageUrl: ''
    });
  });
});