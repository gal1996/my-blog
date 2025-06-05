import { Article } from '../../domain/entities/Article';
import { ArticleId } from '../../domain/value-objects/ArticleId';
import { ArticleRepository } from '../../domain/repositories/ArticleRepository';

export class GetArticleById {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(id: number): Promise<Article | null> {
    const articleId = new ArticleId(id);
    return await this.articleRepository.findById(articleId);
  }
}