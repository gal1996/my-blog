import { GetAllArticles } from '../../../../src/application/use-cases/GetAllArticles';
import { GetArticleById } from '../../../../src/application/use-cases/GetArticleById';
import { CreateArticle } from '../../../../src/application/use-cases/CreateArticle';
import { UpdateArticle } from '../../../../src/application/use-cases/UpdateArticle';
import { DeleteArticle } from '../../../../src/application/use-cases/DeleteArticle';
import { PrismaArticleRepository } from '../../../../src/infrastructure/repositories/PrismaArticleRepository';
import { ArticleController } from '../../../../src/presentation/api/ArticleController';
import { prisma } from '../../../../src/infrastructure/database/prisma';
import { NextRequest } from 'next/server';

function createController() {
  const repository = new PrismaArticleRepository(prisma);
  const getAllArticles = new GetAllArticles(repository);
  const getArticleById = new GetArticleById(repository);
  const createArticle = new CreateArticle(repository);
  const updateArticle = new UpdateArticle(repository);
  const deleteArticle = new DeleteArticle(repository);
  
  return new ArticleController(
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const controller = createController();
  return await controller.handleGetArticleById(Number(id));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  
  if (isNaN(Number(id))) {
    return new Response('Invalid ID', { status: 400 });
  }

  try {
    const body = await request.json();
    const controller = createController();
    return await controller.handleUpdateArticle(Number(id), body);
  } catch {
    return new Response('Bad Request', { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  
  if (isNaN(Number(id))) {
    return new Response('Invalid ID', { status: 400 });
  }

  const controller = createController();
  return await controller.handleDeleteArticle(Number(id));
}

export async function OPTIONS() {
  const responseHeaders = new Headers();
  responseHeaders.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return new Response('', {
    status: 200,
    headers: responseHeaders,
  });
}
