import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { ArticleList } from './components/ArticleList'
import { articles } from './data/aricles'
import ArticleDetail from './components/ArticleDetail'

function App() {
  return (
    <>
    <header className="header">
      <div className="container">
        <h1>My Blog</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <Routes>
        <Route path="/" element={<ArticleList articles={articles} />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/about" element={<div className="container" style={{padding: '50px 20px'}}><h2>このブログについて</h2><p>まだ作成中ですが、当ブログではReactやフロントエンドに関する最新情報を発信していきます。</p></div>} />
        <Route path="/contact" element={<div className="container" style={{padding: '50px 20px'}}><h2>お問い合わせ</h2><p>何かご不明な点があれば、お気軽にお問い合わせください。</p></div>} />
        <Route path="*" element={<div className="container" style={{padding: '50px 20px'}}><h2>お探しのページは見つかりませんでした</h2><p>URLを確認してください。</p></div>} />
      </Routes>
    </main>

    <footer className="footer">
      <div className="container">
        <p>&copy; 2025 My Blog. All rights reserved.</p>
      </div>
    </footer>
    </>
  )
}

export default App
