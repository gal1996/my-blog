export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface UpdateArticleRequest {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface ArticleListResponse {
  articles: Article[];
}

export interface ArticleDetailResponse {
  article: Article;
}