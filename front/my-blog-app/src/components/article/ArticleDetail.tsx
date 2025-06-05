import React from 'react';
import type { Article } from '../../types';

interface ArticleDetailProps {
  article: Article;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl bg-white rounded-lg shadow-xl p-8">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-80 object-cover rounded-lg mb-8 shadow-md" 
        />
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
          {article.title}
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          公開日: {article.publishedAt}
        </p>
        <div className="prose lg:prose-lg text-gray-800 leading-relaxed">
          <p>{article.content}</p>
          <p>
            記事の本文がここに続きます。これはダミーデータなので、実際のブログではさらに多くのコンテンツが表示されます。
            Tailwind CSSの `prose` クラスを使うことで、この中の通常のHTML要素（pタグなど）に読みやすいスタイルが自動的に適用されます。
          </p>
        </div>
      </div>
    </div>
  );
};