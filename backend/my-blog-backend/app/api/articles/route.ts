import { ArticleController } from '../../../src/presentation/api/ArticleController';
import { GetAllArticles } from '../../../src/application/use-cases/GetAllArticles';
import { InMemoryArticleRepository } from '../../../src/infrastructure/repositories/InMemoryArticleRepository';

const articleRepository = new InMemoryArticleRepository();
const getAllArticles = new GetAllArticles(articleRepository);
const articleController = new ArticleController(getAllArticles, null as any);

export async function GET() {
  return await articleController.handleGetAllArticles();
}
