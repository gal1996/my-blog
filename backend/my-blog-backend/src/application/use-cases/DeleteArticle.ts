import { ArticleId } from '../../domain/value-objects/ArticleId';
import { ArticleRepository } from '../../domain/repositories/ArticleRepository';

export class DeleteArticle {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(id: number): Promise<boolean> {
    const existingArticle = await this.articleRepository.findById(new ArticleId(id));
    if (!existingArticle) {
      return false;
    }

    await this.articleRepository.delete(new ArticleId(id));
    return true;
  }
}