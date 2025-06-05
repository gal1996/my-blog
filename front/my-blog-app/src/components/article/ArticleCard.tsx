import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <img 
        src={article.imageUrl} 
        alt={article.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 min-h-[3rem]">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 text-base leading-relaxed">
          {article.excerpt}
        </p>
        <span className="block text-sm text-gray-500 mb-4">
          {article.publishedAt}
        </span>
        <Link 
          to={`/articles/${article.id}`} 
          className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          続きを読む &raquo;
        </Link>
      </div>
    </div>
  );
};