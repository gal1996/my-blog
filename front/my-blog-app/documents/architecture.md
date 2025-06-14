# フロントエンド開発ドキュメント

## 1. はじめに

本ドキュメントは、ブログアプリケーションのフロントエンド部分に関する開発情報を提供します。将来的にAIによる開発を想定し、システムの目的、技術スタック、アーキテクチャ、主要機能、開発手順などを網羅的に記述します。

### 1.1 システムの目的

ユーザーがブログ記事を閲覧できるWebインターフェースを提供します。バックエンドAPIから記事データを取得し、動的かつインタラクティブに表示します。

### 1.2 技術スタック

| カテゴリ     | 技術名          | バージョン (参考) | 説明                                   |
| :----------- | :-------------- | :---------------- | :------------------------------------- |
| フレームワーク | React           | ^18.2.0           | UI構築のためのJavaScriptライブラリ。   |
| 言語         | TypeScript      | ^5.2.2            | 静的型付けを導入し、開発効率と堅牢性を向上。 |
| ビルドツール   | Vite            | ^5.2.0            | 高速な開発サーバーとバンドル。         |
| パッケージ管理 | pnpm            | 最新              | 高速かつディスク効率の良いパッケージ管理。 |
| ルーティング   | React Router DOM | ^6.23.1           | クライアントサイドのルーティングを管理。 |
| スタイリング   | Tailwind CSS    | ^3.4.3            | ユーティリティファーストのCSSフレームワーク。 |
| Linting      | ESLint          | ^8.57.0           | コード品質とスタイルの一貫性を維持。     |
| フォーマッター | Prettier        | ^3.2.5            | コードの自動整形。                     |

### 1.3 ファイル構造

my-blog-app/
├── public/                 # 静的ファイル (index.html など)
│   └── index.html          # アプリケーションのエントリポイントHTML
├── src/                    # ソースコード
│   ├── assets/             # 画像などの静的アセット
│   ├── components/         # 再利用可能なReactコンポーネント
│   │   ├── ArticleList.tsx # 記事一覧表示コンポーネント
│   │   ├── ArticleList.css # (Tailwind移行済みのため基本空)
│   │   ├── ArticleDetail.tsx # 記事詳細表示コンポーネント
│   │   └── ArticleDetail.css # (Tailwind移行済みのため基本空)
│   ├── main.tsx            # アプリケーションの初期化とReactルーターの設定
│   ├── App.tsx             # メインアプリケーションコンポーネント (ルートコンポーネント)
│   ├── App.css             # (Tailwind移行済みのため基本空)
│   └── index.css           # グローバルCSS (Tailwindディレクティブのみ)
├── package.json            # プロジェクトのメタデータと依存関係
├── pnpm-lock.yaml          # pnpmのロックファイル
├── tailwind.config.js      # Tailwind CSS 設定
├── postcss.config.cjs      # PostCSS 設定 (CommonJS形式)
├── vite.config.ts          # Vite 設定
├── tsconfig.json           # TypeScript 設定
└── .dockerignore           # Dockerビルド時に無視するファイル/ディレクトリ

### 1.4 データフロー概要

1.  ブラウザが `http://localhost:5173` (またはデプロイされたURL) でフロントエンドにアクセス。
2.  Reactアプリケーションが起動し、`App.tsx` がルートとしてレンダリングされる。
3.  `ArticleList.tsx` または `ArticleDetail.tsx` が表示される際、`useEffect` フック内でバックエンドAPI (`http://localhost:3000/api/articles` または `http://localhost:3000/api/articles/[id]`) を `fetch` API で呼び出す。
4.  バックエンドAPIからJSON形式で記事データが返される。
5.  フロントエンドは取得したデータを `useState` で管理し、UIを更新して表示する。

---

## 2. 主要な機能とコンポーネント

### 2.1 `App.tsx` (ルートコンポーネント)

* アプリケーションのメインレイアウト（ヘッダー、メインコンテンツ、フッター）を定義。
* `React Router DOM` の `Routes` と `Route` を使用して、URLパスに応じたコンポーネントをレンダリング。
* グローバルなスタイリングや共通要素の管理。

### 2.2 `ArticleList.tsx` (記事一覧表示)

* バックエンドAPI (`/api/articles`) から全記事データを取得し、一覧として表示。
* 各記事をカード形式で表示し、タイトル、抜粋、公開日、画像、詳細ページへのリンクを含む。
* ローディング状態 (`loading`) とエラー状態 (`error`) を管理し、ユーザーにフィードバックを提供。
* `Article` 型定義を保持し、取得データの型安全性を確保。

### 2.3 `ArticleDetail.tsx` (記事詳細表示)

* `React Router DOM` の `useParams` フックを使用し、URLから記事IDを取得。
* 取得した記事IDに基づいてバックエンドAPI (`/api/articles/[id]`) から特定の記事データを取得。
* 記事のタイトル、画像、公開日、本文などを詳細に表示。
* ローディング状態とエラー状態を管理。

### 2.4 API呼び出しパターン

`useEffect` フック内で非同期関数を定義し、`fetch` API を使用してHTTPリクエストを送信。

```typescript
// 例: src/components/ArticleList.tsx
import React, { useState, useEffect } from 'react';
// ...
const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/articles');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);
  // ...
};
```

3. 開発手順と環境構築
3.1 前提条件
Node.js (LTS推奨)
pnpm
Docker Desktop (Docker, Docker Compose)
Webブラウザ (Chrome, Firefoxなど)
コードエディタ (VS Code推奨)
3.2 ローカル開発サーバーの起動
フロントエンドのセットアップ:
Bash

cd my-blog-app
pnpm install
# 開発環境起動 (Vite)
pnpm dev
バックエンドのセットアップ:
Bash

cd my-blog-backend
pnpm install
# 開発環境起動 (Next.js API Routes)
pnpm dev
バックエンドが http://localhost:3000 で、フロントエンドが http://localhost:5173 (または自動割り当てられたポート) で起動していることを確認。
3.3 Docker Composeでの統合起動
フロントエンドとバックエンドの親ディレクトリに移動。
docker-compose.yml ファイルが存在することを確認。
コンテナイメージのビルド:
Bash

docker compose build
コンテナの起動:
Bash

docker compose up
ブラウザで http://localhost:5173 にアクセスし、アプリケーションが正常に動作していることを確認。
4. 注意点と制約
CORS: 開発環境では http://localhost:5173 からのアクセスをバックエンドで許可している。本番デプロイ時には、実際のフロントエンドドメインに Access-Control-Allow-Origin を変更する必要がある。
データ: 現在、記事データはバックエンドの静的なファイル (app/api/data.ts) にハードコードされている。将来的にはデータベース（例: PostgreSQL, MongoDB）との連携が必要。
認証/認可: ユーザー認証や記事の作成・編集・削除機能は未実装。
パフォーマンス: 大規模なデータセットに対する最適化（ページネーション、無限スクロールなど）は未実装。
エラーハンドリング: より堅牢なエラーハンドリング、UIへのエラー表示の改善余地あり。
テスト: コンポーネントテスト、E2Eテストは未実装。

---

## 5. アーキテクチャリファクタリング (2025/06/06)

### 5.1 概要

フロントエンドアプリケーションをモダンなアーキテクチャパターンで再構築しました。見た目とロジックを完全に分離し、テストしやすい設計に変更しました。

### 5.2 新しいアーキテクチャ構造

```
src/
├── types/                  # 型定義層
│   ├── article.ts          # 記事関連の型定義
│   ├── common.ts           # 共通型定義
│   └── index.ts            # 型定義のエクスポート
├── api/                    # API通信層
│   ├── client.ts           # APIクライアント（HTTP通信の抽象化）
│   ├── articles.ts         # 記事API関数
│   └── index.ts            # API層のエクスポート
├── hooks/                  # ビジネスロジック層（Custom Hooks）
│   ├── useArticles.ts      # 記事一覧取得ロジック
│   ├── useArticle.ts       # 単一記事取得ロジック
│   └── index.ts            # hooks層のエクスポート
├── components/             # プレゼンテーション層
│   ├── ui/                 # 汎用UIコンポーネント
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── article/            # 記事関連コンポーネント
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleList.tsx
│   │   └── ArticleDetail.tsx
│   ├── layout/             # レイアウトコンポーネント
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── index.ts            # components層のエクスポート
├── pages/                  # コンテナ層（ビジネスロジックとUIの接続）
│   ├── HomePage.tsx        # ホームページコンテナ
│   ├── ArticlePage.tsx     # 記事詳細ページコンテナ
│   └── index.ts            # pages層のエクスポート
├── test/                   # テスト設定
│   └── setup.ts            # テスト環境設定
└── __tests__/              # テストファイル
    ├── hooks/              # Custom Hooksのテスト
    ├── components/         # コンポーネントのテスト
    └── api/                # API層のテスト
```

### 5.3 各層の責務

#### Types層（型定義）
- TypeScriptの型安全性を一元管理
- API レスポンス、コンポーネントプロパティ、状態管理の型定義
- 型の再利用性と保守性を向上

#### API層（データアクセス）
- HTTP通信の抽象化とエラーハンドリング
- RESTful APIとの通信をクラス化
- fetchの詳細をビジネスロジックから隠蔽

#### Hooks層（ビジネスロジック）
- Custom Hooksでステート管理とビジネスロジックを分離
- API呼び出し、エラーハンドリング、ローディング状態の管理
- コンポーネントから再利用可能なロジックを抽出

#### Components層（プレゼンテーション）
- 純粋なUIコンポーネント（ビジネスロジック非依存）
- propsを受け取ってUIを描画する責務のみ
- 汎用性と再利用性を重視した設計

#### Pages層（コンテナ）
- ビジネスロジック（hooks）とプレゼンテーション（components）を接続
- ページレベルの状態管理とデータフェッチング
- React Routerとの連携

### 5.4 テスト環境

#### テストフレームワーク
- **Vitest**: 高速なユニットテストフレームワーク
- **@testing-library/react**: Reactコンポーネントのテスト
- **@testing-library/jest-dom**: DOMアサーション拡張
- **jsdom**: ブラウザ環境のモック

#### テスト戦略
- **Unit Tests**: Custom Hooks、API関数、個別コンポーネント
- **Integration Tests**: コンポーネント間の連携
- **Mocking**: APIリクエストとモジュール依存関係

#### テストコマンド
```bash
pnpm test           # テスト実行（watch mode）
pnpm test:watch     # 明示的なwatch mode
pnpm test:ui        # Vitest UI使用
```

### 5.5 リファクタリングの効果

#### 保守性の向上
- 責務の明確な分離により、変更影響範囲を限定
- 型安全性により、実行時エラーの削減
- モジュール化により、機能追加・修正が容易

#### テスタビリティの向上
- ビジネスロジックをCustom Hooksで分離し、単体テスト可能
- プレゼンテーションコンポーネントの独立テスト
- APIレイヤーのモック化によるテスト安定性

#### 開発効率の向上
- 型定義の一元管理により、IDEの補完機能向上
- コンポーネントの再利用性向上
- エラーハンドリングとローディング状態の標準化

### 5.6 今後の拡張性

この新しいアーキテクチャにより、以下の機能追加が容易になりました：

- **状態管理**: Context API やRedux Toolkitの導入
- **パフォーマンス最適化**: React.memo、useMemo、useCallbackの適用
- **新機能追加**: 認証、検索、ページネーション等
- **E2Eテスト**: Playwright、Cypressなどの導入
- **アクセシビリティ**: WAI-ARIAガイドラインへの準拠

---

## 6. 記事エディター機能の実装とリファクタリング (2025/06/14)

### 6.1 概要

Markdownベースの記事作成・編集機能を実装し、テスト容易性とメンテナビリティを重視したリファクタリングを行いました。

### 6.2 新機能の実装

#### 記事エディター機能
- **新規記事作成**: `/articles/new` ルート
- **既存記事編集**: `/articles/:id/edit` ルート
- **Markdownエディター**: `@uiw/react-md-editor` を使用
- **画像URL設定**: 画像URLの入力とリアルタイムプレビュー
- **バリデーション**: タイトル・コンテンツの必須入力チェック

#### 追加された依存関係
```json
{
  "@uiw/react-md-editor": "^4.0.7"
}
```

### 6.3 リファクタリング後のファイル構造

```
src/
├── hooks/
│   ├── useArticleForm.ts       # フォーム状態管理
│   ├── useArticleMutation.ts   # API呼び出し管理
│   ├── useArticle.ts
│   ├── useArticles.ts
│   └── index.ts
├── utils/
│   ├── validation.ts           # バリデーションロジック
│   └── __tests__/
│       └── validation.test.ts  # バリデーションテスト
├── components/
│   ├── article/
│   │   └── ImagePreview.tsx    # 画像プレビューコンポーネント
│   ├── forms/
│   │   ├── ArticleFormFields.tsx   # フォームフィールド
│   │   └── ArticleFormActions.tsx  # フォームアクション
│   ├── ui/
│   └── ...
├── pages/
│   ├── ArticleEditorPage.tsx   # リファクタリング済みエディター
│   └── ...
├── types/
│   └── article.ts             # 拡張された型定義
└── api/
    ├── client.ts              # PUT/DELETE メソッド追加
    └── articles.ts            # CRUD API完備
```

### 6.4 アーキテクチャパターンの適用

#### 責務分離の実現

**Before (単一の大きなコンポーネント)**
```typescript
// ArticleEditorPage.tsx (200行超)
export const ArticleEditorPage = () => {
  // フォーム管理
  const [formData, setFormData] = useState(/* ... */);
  
  // API呼び出し
  const handleSubmit = async (e) => {
    // バリデーション
    // API呼び出し
    // エラーハンドリング
  };
  
  // 大量のJSX
  return (/* 複雑なフォーム */);
};
```

**After (責務分離)**
```typescript
// ArticleEditorPage.tsx (50行程度)
export const ArticleEditorPage = () => {
  const { formData, updateTitle, updateContent, updateImageUrl } = useArticleForm({ 
    initialArticle: article 
  });
  const { isSubmitting, createNewArticle, updateExistingArticle } = useArticleMutation();
  
  const handleSubmit = async (e) => {
    const validationResult = validateArticleForm(formData);
    // 簡潔なロジック
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <ArticleFormFields /* props */ />
      <ArticleFormActions /* props */ />
    </form>
  );
};
```

#### カスタムフックによるロジック分離

**useArticleForm.ts**: フォーム状態管理
```typescript
export const useArticleForm = ({ initialArticle }: UseArticleFormProps = {}) => {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    imageUrl: ''
  });

  const updateField = (field: keyof ArticleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    updateTitle: (value: string) => updateField('title', value),
    updateContent: (value: string) => updateField('content', value),
    updateImageUrl: (value: string) => updateField('imageUrl', value),
    resetForm: () => setFormData({ title: '', content: '', imageUrl: '' })
  };
};
```

**useArticleMutation.ts**: API呼び出し管理
```typescript
export const useArticleMutation = (): UseArticleMutationResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewArticle = async (formData: ArticleFormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      await createArticle(/* mapped data */);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, error, createNewArticle, updateExistingArticle };
};
```

#### バリデーションロジックの分離

**validation.ts**: 純粋関数による検証
```typescript
export const validateArticleForm = (formData: ArticleFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!formData.title.trim()) {
    errors.title = 'タイトルを入力してください';
  } else if (formData.title.trim().length > 100) {
    errors.title = 'タイトルは100文字以内で入力してください';
  }

  if (!formData.content.trim()) {
    errors.content = 'コンテンツを入力してください';
  } else if (formData.content.trim().length < 10) {
    errors.content = 'コンテンツは10文字以上で入力してください';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
```

### 6.5 UIコンポーネントの細分化

#### ArticleFormFields.tsx
```typescript
interface ArticleFormFieldsProps {
  formData: ArticleFormData;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onImageUrlChange: (value: string) => void;
  disabled?: boolean;
}

export const ArticleFormFields: React.FC<ArticleFormFieldsProps> = ({
  formData,
  onTitleChange,
  onContentChange,
  onImageUrlChange,
  disabled = false
}) => {
  return (
    <div className="space-y-6">
      {/* タイトル入力 */}
      {/* 画像URL入力 + プレビュー */}
      {/* Markdownエディター */}
    </div>
  );
};
```

#### ImagePreview.tsx
```typescript
export const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  imageUrl, 
  alt = 'プレビュー'
}) => {
  if (!imageUrl.trim()) return null;

  return (
    <div className="mt-2">
      <img
        src={imageUrl}
        alt={alt}
        className="max-w-xs max-h-48 object-cover rounded-md border border-gray-300"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </div>
  );
};
```

### 6.6 テスト実装

#### バリデーションロジックのテスト
```typescript
// validation.test.ts
describe('validateArticleForm', () => {
  it('有効なフォームデータの場合、isValidがtrueになる', () => {
    const validFormData = {
      title: 'Test Title',
      content: 'This is a test content with enough length',
      imageUrl: 'https://example.com/image.jpg'
    };
    
    const result = validateArticleForm(validFormData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('タイトルが空の場合、エラーになる', () => {
    const invalidData = { ...validFormData, title: '' };
    const result = validateArticleForm(invalidData);
    
    expect(result.isValid).toBe(false);
    expect(result.errors.title).toBe('タイトルを入力してください');
  });
});
```

#### カスタムフックのテスト
```typescript
// useArticleForm.test.ts
describe('useArticleForm', () => {
  it('updateTitle関数でタイトルを更新できる', () => {
    const { result } = renderHook(() => useArticleForm());
    
    act(() => {
      result.current.updateTitle('New Title');
    });
    
    expect(result.current.formData.title).toBe('New Title');
  });
});
```

### 6.7 API層の拡張

#### HTTP メソッドの追加
```typescript
// client.ts
export class ApiClient {
  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async delete<T = void>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}
```

#### CRUD API の完備
```typescript
// articles.ts
export const articlesApi = {
  getAll: (): Promise<Article[]> => apiClient.get('/articles'),
  getById: (id: number): Promise<Article> => apiClient.get(`/articles/${id}`),
  create: (data: CreateArticleRequest): Promise<Article> => apiClient.post('/articles', data),
  update: (id: string, data: UpdateArticleRequest): Promise<Article> => apiClient.put(`/articles/${id}`, data),
  delete: (id: string): Promise<void> => apiClient.delete(`/articles/${id}`)
};
```

### 6.8 型安全性の向上

#### 拡張された型定義
```typescript
// types/article.ts
export interface CreateArticleRequest {
  title: string;
  content: string;
  imageUrl?: string;  // 新規追加
}

export interface UpdateArticleRequest {
  title: string;
  content: string;
  imageUrl?: string;  // 新規追加
}
```

### 6.9 リファクタリングの効果

#### テスト容易性の向上
- **単体テスト**: 各フック・関数を独立してテスト可能
- **結合テスト**: コンポーネント間の連携を分離してテスト
- **モック**: API呼び出しを簡単にモック化

#### メンテナビリティの向上
- **責務分離**: 変更時の影響範囲を最小化
- **再利用性**: フックとコンポーネントの他画面での再利用
- **可読性**: コードの意図が明確で理解しやすい

#### 開発効率の向上
- **型安全**: コンパイル時エラーによる早期バグ発見
- **Hot Reload**: 変更の即座な反映
- **デバッグ**: 問題の原因特定が容易