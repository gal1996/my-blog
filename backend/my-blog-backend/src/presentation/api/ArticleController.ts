import { GetAllArticles } from '../../application/use-cases/GetAllArticles';
import { GetArticleById } from '../../application/use-cases/GetArticleById';

export class ArticleController {
  constructor(
    private readonly getAllArticles: GetAllArticles,
    private readonly getArticleById?: GetArticleById
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
    if (!this.getArticleById) {
      return this.createCorsResponse('GetArticleById use case not available', 500);
    }
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