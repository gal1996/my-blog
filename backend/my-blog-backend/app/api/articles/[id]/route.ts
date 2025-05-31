import { articles } from '@/app/data/articles'; // 全ての記事データをインポート
import { NextRequest } from 'next/server'; // Next.jsのRequest型をインポート

// 動的なパラメーターの型定義
// GETリクエストを処理する関数
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id; // URLからidを取得

  const article = articles.find((a) => a.id === Number(id)); // idに一致する記事を探す (数値に変換)

  const responseHeaders = new Headers();
  responseHeaders.set('Access-Control-Allow-Origin', 'http://localhost:5173'); // ここもフロントエンドのオリジンを指定
  responseHeaders.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  responseHeaders.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  if (!article) {
    return new Response('Article not found', { status: 404 }); // 記事が見つからない場合は404エラー
  }

  return new Response(JSON.stringify(article), {
    status: 200,
    headers: responseHeaders,
  });
}
