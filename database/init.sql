-- ブログ記事テーブルの作成
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    author VARCHAR(100) DEFAULT 'Admin',
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_published BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの作成
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING GIN(tags);

-- 全文検索用のインデックス
CREATE INDEX IF NOT EXISTS idx_articles_search ON articles USING GIN(to_tsvector('japanese', title || ' ' || content));

-- 更新日時の自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at 
    BEFORE UPDATE ON articles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- サンプルデータの挿入
INSERT INTO articles (title, content, excerpt, slug, is_published) VALUES
('初回投稿', 'これは最初のブログ記事です。PostgreSQLを使用してデータを永続化できるようになりました。', 'PostgreSQLを使用した最初の記事', 'first-post', true),
('技術記事サンプル', 'Next.jsとPostgreSQLを組み合わせたブログシステムの構築について説明します。', 'Next.js + PostgreSQL でブログシステム構築', 'nextjs-postgresql-blog', true),
('下書き記事', 'この記事はまだ下書きです。', '下書きのサンプル記事', 'draft-article', false)
ON CONFLICT (slug) DO NOTHING;