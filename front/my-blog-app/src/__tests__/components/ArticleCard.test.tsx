import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { ArticleCard } from '../../components/article/ArticleCard';
import type { Article } from '../../types';

const mockArticle: Article = {
  id: 1,
  title: 'Test Article',
  excerpt: 'This is a test excerpt',
  content: 'This is test content',
  imageUrl: 'https://example.com/test-image.jpg',
  publishedAt: '2023-01-01',
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ArticleCard', () => {
  it('should render article information correctly', () => {
    renderWithRouter(<ArticleCard article={mockArticle} />);

    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('This is a test excerpt')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('続きを読む »')).toBeInTheDocument();
  });

  it('should render article image with correct attributes', () => {
    renderWithRouter(<ArticleCard article={mockArticle} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Article');
  });

  it('should link to correct article detail page', () => {
    renderWithRouter(<ArticleCard article={mockArticle} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/articles/1');
  });
});