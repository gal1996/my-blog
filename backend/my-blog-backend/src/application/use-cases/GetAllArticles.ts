import { Article } from '../../domain/entities/Article';
import { ArticleRepository } from '../../domain/repositories/ArticleRepository';

export class GetAllArticles {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(): Promise<Article[]> {
    return await this.articleRepository.findAll();
  }
}