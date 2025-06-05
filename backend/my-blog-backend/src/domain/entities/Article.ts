import { ArticleId } from '../value-objects/ArticleId';

export class Article {
  constructor(
    private readonly id: ArticleId,
    private readonly title: string,
    private readonly excerpt: string,
    private readonly content: string,
    private readonly imageUrl: string,
    private readonly publishedAt: string
  ) {}

  getId(): ArticleId {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getExcerpt(): string {
    return this.excerpt;
  }

  getContent(): string {
    return this.content;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getPublishedAt(): string {
    return this.publishedAt;
  }

  toJSON() {
    return {
      id: this.id.getValue(),
      title: this.title,
      excerpt: this.excerpt,
      content: this.content,
      imageUrl: this.imageUrl,
      publishedAt: this.publishedAt,
    };
  }
}