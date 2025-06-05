# Claude Code Rules

## Package Manager
- このプロジェクトは **pnpm** を使用します
- npmの代わりに常にpnpmを使ってください

## Commands
- Install dependencies: `pnpm install`
- Run tests: `pnpm test`
- Run dev server: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`

## Code Quality Rules
- **anyの使用を絶対に禁止**: TypeScriptの`any`型は絶対に使用しないでください
- 適切な型定義を常に行い、型安全性を維持してください