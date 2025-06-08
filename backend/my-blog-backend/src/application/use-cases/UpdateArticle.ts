import { Article } from '../../domain/entities/Article';
import { ArticleId } from '../../domain/value-objects/ArticleId';
import { ArticleRepository } from '../../domain/repositories/ArticleRepository';

export type UpdateArticleRequest = {
  title?: string;
  excerpt?: string;
  content?: string;
  imageUrl?: string;
  publishedAt?: string;
};

export class UpdateArticle {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(id: number, request: UpdateArticleRequest): Promise<Article | null> {
    const existingArticle = await this.articleRepository.findById(new ArticleId(id));
    if (!existingArticle) {
      return null;
    }

    const existingData = existingArticle.toJSON();
    
    const updatedArticle = new Article(
      new ArticleId(id),
      request.title ?? existingData.title,
      request.excerpt ?? existingData.excerpt,
      request.content ?? existingData.content,
      request.imageUrl ?? existingData.imageUrl,
      request.publishedAt ?? existingData.publishedAt
    );

    await this.articleRepository.save(updatedArticle);
    return updatedArticle;
  }
}