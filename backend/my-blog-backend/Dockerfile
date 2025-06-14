# --- ビルドステージ ---
# Node.jsの公式イメージをベースにする (LTSバージョン)
FROM node:20-alpine AS builder

# 作業ディレクトリを設定
WORKDIR /app

# pnpmをインストール
RUN npm install -g pnpm

# 依存関係をインストール
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ソースコードをコピー
COPY . .

# Prisma Clientを生成
RUN pnpm db:generate

# Next.jsアプリケーションをビルド
# (App RouterベースのNext.jsは通常サーバーサイドで動作するため、buildコマンドで最適化)
RUN pnpm run build

# --- サービングステージ ---
# Next.jsの推奨する最小限のイメージをベースにする
FROM node:20-alpine AS runner

# 作業ディレクトリを設定
WORKDIR /app

# Next.jsの必要ファイルのみをコピー (より高度な最適化は .next/standalone を使う)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 環境変数をロードするための .env.local をコピーするならここ (本番ではsecretsで管理)
# COPY .env.local .env.local
RUN npm install -g pnpm

# ポートを指定
EXPOSE 3000

# アプリケーションを起動 (Next.jsのサーバー起動コマンド)
CMD ["pnpm", "run", "start"]