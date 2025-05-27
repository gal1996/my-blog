import React from 'react'
import { useParams } from 'react-router-dom'
import { articles } from '../data/aricles'

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const article = articles.find((article) => article.id === Number(id))

    if (!article) {
        return <div>記事が見つかりません</div>
    }

    return (
        <div className="article-detail">
            <div className="container">
                <img src={article.imageUrl} alt={article.title} className="article-detail-image" />
                <h1>{article.title}</h1>
                <p className="article-detail-date">{article.publishedAt}</p>
                <div className="article-detail-content">
                    <p>{article.content}</p>
                    <p>記事の本文がここに続きます。これはダミーデータです。</p>
                </div>
            </div>
        </div>
    )
}

export default ArticleDetail