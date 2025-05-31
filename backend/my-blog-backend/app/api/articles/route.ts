// ダミーデータ（フロントエンドの src/data/articles.ts と同じ内容をコピー＆ペースト）
export type Article = {
  id: number;
  title: string;
  excerpt: string; // 抜粋
  content: string;
  imageUrl: string;
  publishedAt: string;
};

export const articles: Article[] = [
  {
    id: 1,
    title: 'Reactのフック入門',
    excerpt:
      'useState, useEffect, useContextなど、Reactの主要なフックについて解説します。',
    content:
      'Reactのフックは、関数コンポーネントで状態やライフサイクルなどのReactの機能を「フック」できるようにするものです。これにより、クラスコンポーネントを書かずにReactの全ての機能を活用できます。この記事では、最もよく使われるuseState、useEffect、useContextについて詳しく見ていきます。',
    imageUrl: 'https://via.placeholder.com/600x400?text=React+Hooks',
    publishedAt: '2023-04-01',
  },
  {
    id: 2,
    title: 'TypeScriptで型安全なReact開発',
    excerpt:
      'JavaScriptに静的型付けをもたらすTypeScriptの基本と、Reactでの活用方法を紹介します。',
    content:
      'TypeScriptは、JavaScriptに静的型付けを追加したプログラミング言語です。これにより、開発中にエラーを早期に発見し、コードの可読性と保守性を向上させることができます。ReactプロジェクトにTypeScriptを導入する方法と、PropsやStateに型を適用する基本的なパターンを学びましょう。',
    imageUrl: 'https://via.placeholder.com/600x400?text=TypeScript+React',
    publishedAt: '2023-04-15',
  },
  {
    id: 3,
    title: 'CSS ModulesでReactのスタイルを管理',
    excerpt:
      'CSSのグローバルな問題を解決するCSS Modulesの導入と使用方法について解説します。',
    content:
      'CSSは強力ですが、グローバルスコープが原因で大規模なプロジェクトではスタイル衝突の問題が発生しやすいです。CSS Modulesは、各CSSクラス名を自動的にユニークなものにスコープすることで、この問題を解決します。ReactプロジェクトでCSS Modulesを設定し、コンポーネントに適用する手順を学びましょう。',
    imageUrl: 'https://via.placeholder.com/600x400?text=CSS+Modules',
    publishedAt: '2023-05-01',
  },
];

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
