import './App.css'
import { ArticleList } from './components/ArticleList'
import { articles } from './data/aricles'

function App() {
  return (
    <>
    <header className="header">
      <div className="container">
        <h1>My Blog</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <ArticleList articles={articles} />

    <footer className="footer">
      <div className="container">
        <p>&copy; 2025 My Blog. All rights reserved.</p>
      </div>
    </footer>
    </>
  )
}

export default App
