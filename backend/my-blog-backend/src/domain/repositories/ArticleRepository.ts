import { Article } from '../entities/Article';
import { ArticleId } from '../value-objects/ArticleId';

export interface ArticleRepository {
  findAll(): Promise<Article[]>;
  findById(id: ArticleId): Promise<Article | null>;
  save(article: Article): Promise<void>;
  delete(id: ArticleId): Promise<void>;
}