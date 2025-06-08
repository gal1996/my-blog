import { Article } from '../../domain/entities/Article';
import { ArticleId } from '../../domain/value-objects/ArticleId';
import { ArticleRepository } from '../../domain/repositories/ArticleRepository';

export type CreateArticleRequest = {
  title: string;
  excerpt?: string;
  content: string;
  imageUrl?: string;
  publishedAt?: string;
};

export class CreateArticle {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(request: CreateArticleRequest): Promise<Article> {
    // 新しいIDを生成（簡易実装）
    const id = Date.now();
    
    const article = new Article(
      new ArticleId(id),
      request.title,
      request.excerpt || '',
      request.content,
      request.imageUrl || '',
      request.publishedAt || new Date().toISOString().split('T')[0]
    );

    await this.articleRepository.save(article);
    return article;
  }
}