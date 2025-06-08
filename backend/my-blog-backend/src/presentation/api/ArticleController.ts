import { GetAllArticles } from '../../application/use-cases/GetAllArticles';
import { GetArticleById } from '../../application/use-cases/GetArticleById';
import { CreateArticle, CreateArticleRequest } from '../../application/use-cases/CreateArticle';
import { UpdateArticle, UpdateArticleRequest } from '../../application/use-cases/UpdateArticle';
import { DeleteArticle } from '../../application/use-cases/DeleteArticle';

export class ArticleController {
  constructor(
    private readonly getAllArticles: GetAllArticles,
    private readonly getArticleById: GetArticleById,
    private readonly createArticle: CreateArticle,
    private readonly updateArticle: UpdateArticle,
    private readonly deleteArticle: DeleteArticle
  ) {}

  async handleGetAllArticles(): Promise<Response> {
    try {
      const articles = await this.getAllArticles.execute();
      return this.createCorsResponse(JSON.stringify(articles.map(article => article.toJSON())), 200);
    } catch (error) {
      console.error('Error in handleGetAllArticles:', error);
      return this.createCorsResponse('Internal Server Error', 500);
    }
  }

  async handleGetArticleById(id: number): Promise<Response> {
    try {
      const article = await this.getArticleById.execute(id);
      if (!article) {
        return this.createCorsResponse('Article not found', 404);
      }
      return this.createCorsResponse(JSON.stringify(article.toJSON()), 200);
    } catch (error) {
      console.error('Error in handleGetArticleById:', error);
      return this.createCorsResponse('Internal Server Error', 500);
    }
  }

  async handleCreateArticle(request: CreateArticleRequest): Promise<Response> {
    try {
      const article = await this.createArticle.execute(request);
      return this.createCorsResponse(JSON.stringify(article.toJSON()), 201);
    } catch (error) {
      console.error('Error in handleCreateArticle:', error);
      return this.createCorsResponse('Internal Server Error', 500);
    }
  }

  async handleUpdateArticle(id: number, request: UpdateArticleRequest): Promise<Response> {
    try {
      const article = await this.updateArticle.execute(id, request);
      if (!article) {
        return this.createCorsResponse('Article not found', 404);
      }
      return this.createCorsResponse(JSON.stringify(article.toJSON()), 200);
    } catch (error) {
      console.error('Error in handleUpdateArticle:', error);
      return this.createCorsResponse('Internal Server Error', 500);
    }
  }

  async handleDeleteArticle(id: number): Promise<Response> {
    try {
      const success = await this.deleteArticle.execute(id);
      if (!success) {
        return this.createCorsResponse('Article not found', 404);
      }
      return this.createCorsResponse('', 204);
    } catch (error) {
      console.error('Error in handleDeleteArticle:', error);
      return this.createCorsResponse('Internal Server Error', 500);
    }
  }

  private createCorsResponse(body: string, status: number): Response {
    const responseHeaders = new Headers();
    responseHeaders.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return new Response(body, {
      status,
      headers: responseHeaders,
    });
  }
}