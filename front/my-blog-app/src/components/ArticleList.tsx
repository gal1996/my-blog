import React from "react";
import type { Article } from "../data/aricles";
import "./ArticleList.css";
import { Link } from "react-router-dom";

type ArticleListProps = {
  articles: Article[];
};

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <section className="article-list">
      <div className="container">
        <h2>最新の記事</h2>
        <div className="ariticles-grid">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="article-card-image"
              />
              <div className="article-card-content">
                <h3>{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <span className="article-=date">{article.publishedAt}</span>
                <Link to={`/articles/${article.id}`}>Read More</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
