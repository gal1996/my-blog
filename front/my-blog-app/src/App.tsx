import { Route, Routes } from 'react-router-dom';
import { Header, Footer } from './components';
import { HomePage, ArticlePage } from './pages';

function App() {
  return (
    <>
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/about" element={
            <div className="container" style={{padding: '50px 20px'}}>
              <h2>About</h2>
              <p>まだ作成中ですが、当ブログではReactやフロントエンドに関する最新情報を発信していきます。</p>
            </div>
          } />
          <Route path="/contact" element={
            <div className="container" style={{padding: '50px 20px'}}>
              <h2>Contact</h2>
              <p>何かご不明な点があれば、お気軽にお問い合わせください。</p>
            </div>
          } />
          <Route path="*" element={
            <div className="container" style={{padding: '50px 20px'}}>
              <h2>Page not found</h2>
              <p>Please check the URL.</p>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App
