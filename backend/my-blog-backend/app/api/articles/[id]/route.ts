import { ArticleController } from '../../../../src/presentation/api/ArticleController';
import { GetAllArticles } from '../../../../src/application/use-cases/GetAllArticles';
import { GetArticleById } from '../../../../src/application/use-cases/GetArticleById';
import { InMemoryArticleRepository } from '../../../../src/infrastructure/repositories/InMemoryArticleRepository';
import { NextRequest } from 'next/server';

const articleRepository = new InMemoryArticleRepository();
const getAllArticles = new GetAllArticles(articleRepository);
const getArticleById = new GetArticleById(articleRepository);
const articleController = new ArticleController(getAllArticles, getArticleById);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  return await articleController.handleGetArticleById(Number(id));
}
