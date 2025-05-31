import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Article } from './ArticleList'

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
    if (!id) { // idがない場合は処理しない
      setError('記事IDが指定されていません。');
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        // Next.jsバックエンドのAPIエンドポイント
        const response = await fetch(`http://localhost:3000/api/articles/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Article = await response.json();
        setArticle(data);
      } catch (e: unknown) {
        const error = e as Error;
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]); // idが変更されたときに再度APIを呼び出す

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

    if (!article) {
        return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <p className="text-xl text-red-500">エラーが発生しました: {error}</p>
        </div>
        );
    }

    return (
        <div className="py-12 bg-gray-50"> 
            <div className="container mx-auto px-4 max-w-4xl bg-white rounded-lg shadow-xl p-8"> 
                <img src={article.imageUrl} alt={article.title} className="w-full h-80 object-cover rounded-lg mb-8 shadow-md" /> 
                <h1 className="text-5xl font-extrabold mb-4 text-gray-900 leading-tight">{article.title}</h1> 
                <p className="text-gray-600 text-lg mb-8">公開日: {article.publishedAt}</p> 
                <div className="prose lg:prose-lg text-gray-800 leading-relaxed"> 
                    <p>{article.content}</p>
                    <p>記事の本文がここに続きます。これはダミーデータなので、実際のブログではさらに多くのコンテンツが表示されます。Tailwind CSSの `prose` クラスを使うことで、この中の通常のHTML要素（pタグなど）に読みやすいスタイルが自動的に適用されます。</p>
                </div>
            </div>
        </div>
    )
}

export default ArticleDetail