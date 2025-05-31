import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export type Article = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

export const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 


  useEffect(() => {
    const fetchArticlts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArticlts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50"> 
      <div className="container mx-auto px-4"> 
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">最新の記事</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"> 
              <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" /> 
              <div className="p-6"> 
                <h3 className="text-xl font-bold mb-2 text-gray-900 min-h-[3rem]">{article.title}</h3> 
                <p className="text-gray-600 mb-4 text-base leading-relaxed">{article.excerpt}</p> 
                <span className="block text-sm text-gray-500 mb-4">{article.publishedAt}</span> 
                <Link to={`/articles/${article.id}`} className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                  続きを読む &raquo;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>  
    );
};
