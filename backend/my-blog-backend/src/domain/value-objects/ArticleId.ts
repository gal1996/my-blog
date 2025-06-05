export class ArticleId {
  constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('Article ID must be a positive number');
    }
  }

  getValue(): number {
    return this.value;
  }

  equals(other: ArticleId): boolean {
    return this.value === other.value;
  }
}