# Claude Code Rules

## 会話言語
日本語

## プロジェクト概要
個人ブログシステム - 記事の作成・編集・削除・閲覧機能を持つWebアプリケーション

### 主要機能
- 記事CRUD操作（作成・読取・更新・削除）
- 記事一覧表示
- 記事詳細表示
- レスポンシブデザイン

## プロジェクト構成
- **フロントエンド**: React + Vite + TypeScript (`front/my-blog-app/`)
- **バックエンド**: Next.js + TypeScript (`backend/my-blog-backend/`)
- **データベース**: PostgreSQL + Prisma ORM
- **アーキテクチャ**: Clean Architecture (DDD)
- **Docker**: docker-compose による開発環境

## Package Manager
- このプロジェクトは **pnpm** を使用します
- npmの代わりに常にpnpmを使ってください

## Commands

### フロントエンド (`front/my-blog-app/`)
- Install dependencies: `pnpm install`
- Run dev server: `pnpm dev`
- Build: `pnpm build`
- Run tests: `pnpm test`
- Lint: `pnpm lint`

### バックエンド (`backend/my-blog-backend/`)
- Install dependencies: `pnpm install`
- Run dev server: `pnpm dev`
- Build: `pnpm build`
- Run tests: `pnpm test`
- Lint: `pnpm lint`

### Docker環境
- Start all services: `docker-compose up -d`
- Stop all services: `docker-compose down`
- View logs: `docker-compose logs -f [service-name]`

## Database
- **ORM**: Prisma
- **Migration**: `npx prisma migrate dev`
- **Generate client**: `npx prisma generate`
- **Prisma Studio**: `npx prisma studio`

## Code Quality Rules
- **anyの使用を絶対に禁止**: TypeScriptの`any`型は絶対に使用しないでください
- 適切な型定義を常に行い、型安全性を維持してください
- Clean Architectureの原則に従い、ドメイン層・アプリケーション層・インフラストラクチャ層を適切に分離してください
- テストはVitestを使用して記述してください

## Port Configuration
- フロントエンド: `5173`
- バックエンド: `3000`
- PostgreSQL: `5432`
- Redis: `16379`
- MinIO: `9000` (API), `9001` (Console)