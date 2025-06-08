import { PrismaClient } from '@prisma/client';
import { Article } from '../../domain/entities/Article';
import { ArticleId } from '../../domain/value-objects/ArticleId';
import { ArticleRepository } from '../../domain/repositories/ArticleRepository';

type PrismaArticleData = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  publishedAt: Date;
  status: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

// ArticleIdとPrismaのstring IDのマッピング用
const articleIdMap = new Map<number, string>();
const reverseArticleIdMap = new Map<string, number>();
let nextNumericId = 1;

export class PrismaArticleRepository implements ArticleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Article[]> {
    const articles = await this.prisma.article.findMany({
      where: {
        status: 'PUBLISHED'
      },
      orderBy: {
        publishedAt: 'desc'
      }
    });
    
    return articles.map(this.toDomainEntity);
  }

  async findById(id: ArticleId): Promise<Article | null> {
    const prismaId = articleIdMap.get(id.getValue());
    if (!prismaId) {
      return null;
    }

    const article = await this.prisma.article.findUnique({
      where: {
        id: prismaId
      }
    });

    if (!article) {
      return null;
    }

    return this.toDomainEntity(article);
  }

  async save(article: Article): Promise<void> {
    const json = article.toJSON();
    const numericId = json.id;
    
    // 既存IDがある場合はそれを使用、なければ新規作成
    const prismaId = articleIdMap.get(numericId);
    
    const data = {
      title: json.title,
      excerpt: json.excerpt || null,
      content: json.content,
      imageUrl: json.imageUrl || null,
      publishedAt: new Date(json.publishedAt),
      status: 'PUBLISHED' as const,
      slug: this.generateSlug(json.title)
    };

    if (prismaId) {
      // 更新
      await this.prisma.article.update({
        where: { id: prismaId },
        data: {
          ...data,
          updatedAt: new Date()
        }
      });
    } else {
      // 新規作成
      const created = await this.prisma.article.create({
        data: {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      // IDマッピングを保存
      articleIdMap.set(numericId, created.id);
      reverseArticleIdMap.set(created.id, numericId);
    }
  }

  async delete(id: ArticleId): Promise<void> {
    const prismaId = articleIdMap.get(id.getValue());
    if (!prismaId) {
      return;
    }

    await this.prisma.article.delete({
      where: {
        id: prismaId
      }
    });

    // マッピングからも削除
    articleIdMap.delete(id.getValue());
    reverseArticleIdMap.delete(prismaId);
  }

  private toDomainEntity(prismaData: PrismaArticleData): Article {
    // Prismaのstring IDを数値IDにマッピング
    let numericId = reverseArticleIdMap.get(prismaData.id);
    if (!numericId) {
      numericId = nextNumericId++;
      reverseArticleIdMap.set(prismaData.id, numericId);
      articleIdMap.set(numericId, prismaData.id);
    }

    return new Article(
      new ArticleId(numericId),
      prismaData.title,
      prismaData.excerpt || '',
      prismaData.content,
      prismaData.imageUrl || '',
      prismaData.publishedAt.toISOString().split('T')[0]
    );
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
}