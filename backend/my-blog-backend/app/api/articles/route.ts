import { articles } from '../../data/articles';

// GETリクエストを処理する関数
export async function GET() {
  const responseHeaders = new Headers();
  // ★重要★ フロントエンドのオリジンを許可する
  // 開発中は 'http://localhost:5173' を指定
  // 本番環境では、デプロイ先のフロントエンドのドメインを指定 (例: 'https://my-blog-front.example.com')
  // もし複数のオリジンを許可する場合は、カンマ区切りではなく、
  // リクエストのOriginヘッダーを見て動的に設定する必要がありますが、
  // 開発中はワイルドカード '*' を使うこともあります（ただし本番では非推奨）。
  responseHeaders.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  responseHeaders.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  ); // 許可するHTTPメソッド
  responseHeaders.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  ); // 許可するヘッダー
  // 実際にはデータベースからデータを取得する処理がここに書かれる
  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: responseHeaders,
  });
}
