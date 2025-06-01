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

# アプリケーションをビルド
# (Viteのデフォルトのビルドコマンド)
RUN pnpm run build

# --- サービングステージ ---
# 最小限のNode.jsランタイムイメージをベースにする
FROM node:20-alpine AS runner

# 作業ディレクトリを設定
WORKDIR /app

# ビルドステージからビルド済みのファイルをコピー
COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./

# pnpmをインストール
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod

# 本番環境の依存関係のみをインストール (もしあれば)
# この例ではViteはビルド時に静的ファイルを生成するので、ランタイム依存は少ない
# 必要に応じて、pnpm prune --prod などを使う

# ポートを指定
EXPOSE 5173

# アプリケーションを起動 (静的ファイルをserveするWebサーバー)
# この例では Vite の preview コマンドを使用 (本番環境ではNginxやserveを使うのが一般的)
# または、Viteのプレビューサーバーを使わず、直接静的ファイルをサーブする軽量なHTTPサーバー (e.g. `serve`) を使用することも可能です
# 例: RUN npm install -g serve && serve -s dist -l 5173
CMD ["pnpm", "run", "preview"]