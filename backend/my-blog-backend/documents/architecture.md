# バックエンド開発ドキュメント

## 1. はじめに

本ドキュメントは、ブログアプリケーションのバックエンド部分に関する開発情報を提供します。将来的にAIによる開発を想定し、システムの目的、技術スタック、アーキテクチャ、API仕様、開発手順などを網羅的に記述します。

### 1.1 システムの目的

フロントエンド（Reactアプリケーション）に対して、ブログ記事データを提供するRESTful APIエンドポイントを提供します。

### 1.2 技術スタック

| カテゴリ     | 技術名          | バージョン (参考) | 説明                                   |
| ----------- | -------------- | ---------------- | ------------------------------------- |
| フレームワーク | Next.js         | 最新 (App Router) | Reactフレームワーク、API Routes機能を使用。 |
| 言語         | TypeScript      | ^5.2.2            | 静的型付けを導入し、開発効率と堅牢性を向上。 |
| パッケージ管理 | pnpm            | 最新              | 高速かつディスク効率の良いパッケージ管理。 |
| Linting      | ESLint          | ^8.57.0           | コード品質とスタイルの一貫性を維持。     |
| フォーマッター | Prettier        | ^3.2.5            | コードの自動整形。                     |

### 1.3 ファイル構造
my-blog-backend/
├── app/                    # Next.js App Router のルート
│   ├── api/                # API Routes の定義ディレクトリ
│   │   ├── articles/       # 記事関連API
│   │   │   ├── route.ts    # 全記事取得 API (/api/articles)
│   │   │   └── [id]/       # 特定記事取得 API (/api/articles/[id])
│   │   │       └── route.ts
│   │   └── data.ts         # 共有ダミー記事データと型定義
│   └── layout.tsx          # Next.js のルートレイアウト (API Routesには直接影響しない)
│   └── page.tsx            # Next.js のルートページ (API Routesには直接影響しない)
├── public/                 # 静的ファイル (API Routesには直接影響しない)
├── package.json            # プロジェクトのメタデータと依存関係
├── pnpm-lock.yaml          # pnpmのロックファイル
├── next.config.js          # Next.js 設定
├── tailwind.config.ts      # Tailwind CSS 設定
├── postcss.config.js       # PostCSS 設定
├── tsconfig.json           # TypeScript 設定
└── .dockerignore           # Dockerビルド時に無視するファイル/ディレクトリ

### 1.4 データフロー概要

1.  フロントエンドからHTTPリクエスト（GET）がバックエンドAPI (`http://localhost:3000/api/...`) に送信される。
2.  Next.jsのAPI Routesがリクエストを受信し、対応する `route.ts` ファイルの関数（`GET`）を実行。
3.  `data.ts` からダミー記事データを取得。
4.  JSON形式でデータをフロントエンドに返す。

---

## 2. APIエンドポイント仕様

### 2.1 共有データ型

`app/api/data.ts` で以下の `Article` 型を定義し、各APIルートで共有しています。

```typescript
// app/api/data.ts
export type Article = {
  id: number;
  title: string;
  excerpt: string; // 抜粋
  content: string;
  imageUrl: string;
  publishedAt: string;
};
```

2.2 全記事取得
エンドポイント: /api/articles
HTTPメソッド: GET
レスポンス:
200 OK: Article オブジェクトの配列 (Article[]) をJSON形式で返します。
Content-Type: application/json ヘッダーが含まれます。
Access-Control-Allow-Origin などのCORSヘッダーが含まれます。
例:
```json
[
  {
    "id": 1,
    "title": "Reactのフック入門",
    "excerpt": "...",
    "content": "...",
    "imageUrl": "...",
    "publishedAt": "2023-04-01"
  },
  {
    "id": 2,
    "title": "TypeScriptで型安全なReact開発",
    "excerpt": "...",
    "content": "...",
    "imageUrl": "...",
    "publishedAt": "2023-04-15"
  }
]
```

2.3 個別記事取得
エンドポイント: /api/articles/{id}
HTTPメソッド: GET
パスパラメーター:
id (number): 取得したい記事のID。
レスポンス:
200 OK: 指定された Article オブジェクトをJSON形式で返します。
404 Not Found: 指定されたIDの記事が見つからない場合。
Content-Type: application/json ヘッダーが含まれます（200 OKの場合）。
Access-Control-Allow-Origin などのCORSヘッダーが含まれます。
例 (200 OK):
```json
{
  "id": 1,
  "title": "Reactのフック入門",
  "excerpt": "...",
  "content": "...",
  "imageUrl": "...",
  "publishedAt": "2023-04-01"
}
例 (404 Not Found): (ボディは Article not found の文字列、ステータスは404)
```

3. 開発手順と環境構築
3.1 前提条件
Node.js (LTS推奨)
pnpm
Docker Desktop (Docker, Docker Compose)
コードエディタ (VS Code推奨)
3.2 ローカル開発サーバーの起動
バックエンドのセットアップ:

```bash
cd my-blog-backend
pnpm install
# 開発環境起動 (Next.js API Routes)
pnpm dev
```

バックエンドが http://localhost:3000 で起動していることを確認。
3.3 Docker Composeでの統合起動
フロントエンドとバックエンドの親ディレクトリに移動。
docker-compose.yml ファイルが存在することを確認。
コンテナイメージのビルド:

```bash
docker compose build
```

コンテナの起動:

```bash
docker compose up
```

ブラウザで http://localhost:3000/api/articles にアクセスし、APIが正常にデータを返していることを確認。
4. 注意点と制約
CORSポリシー: 開発環境では Access-Control-Allow-Origin: http://localhost:5173 がハードコードされている。本番デプロイ時には、実際のフロントエンドドメインに合わせた動的または固定のオリジン設定が必要。
データソース: 現在、データはメモリ上の静的な配列 (app/api/data.ts) に保存されている。永続化のためにはデータベース（例: PostgreSQL, MongoDB, DynamoDB）への連携が必須。
CRUD操作: 現在は GET メソッドのみをサポート。記事の作成 (POST)、更新 (PUT/PATCH)、削除 (DELETE) 機能は未実装。
認証/認可: APIへのアクセス制御（認証・認可）は未実装。
エラーハンドリング: より詳細なエラーメッセージやロギングの強化が必要。
パフォーマンス: 大規模なデータセットに対するクエリ最適化やページネーションは未実装。
