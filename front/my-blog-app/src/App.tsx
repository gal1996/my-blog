import { Link, Route, Routes } from 'react-router-dom'
import { ArticleList } from './components/ArticleList'
import { articles } from './data/aricles'
import ArticleDetail from './components/ArticleDetail'

function App() {
  return (
    <>
    <header className="bg-gray-800 text-white p-4 shadow-md"> 
        <div className="container mx-auto flex justify-between items-center px-4"> 
          <h1 className="text-2xl font-bold"> 
            <Link to="/" className="hover:text-gray-300">My Blog</Link>
          </h1>
          <nav>
            <ul className="flex space-x-6"> 
              <li><Link to="/" className="font-semibold hover:text-gray-300 transition duration-300">Home</Link></li>
              <li><Link to="/about" className="font-semibold hover:text-gray-300 transition duration-300">About</Link></li>
              <li><Link to="/contact" className="font-semibold hover:text-gray-300 transition duration-300">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

    <main>
      <Routes>
        <Route path="/" element={<ArticleList articles={articles} />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/about" element={<div className="container" style={{padding: '50px 20px'}}><h2>About</h2><p>まだ作成中ですが、当ブログではReactやフロントエンドに関する最新情報を発信していきます。</p></div>} />
        <Route path="/contact" element={<div className="container" style={{padding: '50px 20px'}}><h2>Contact</h2><p>何かご不明な点があれば、お気軽にお問い合わせください。</p></div>} />
        <Route path="*" element={<div className="container" style={{padding: '50px 20px'}}><h2>Page not found</h2><p>Please check the URL.</p></div>} />
      </Routes>
    </main>

    <footer className="bg-gray-800 text-white py-6 text-center mt-12">
        <div className="container mx-auto px-4">
          <p className="text-sm">&copy; 2025 My Blog. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App
