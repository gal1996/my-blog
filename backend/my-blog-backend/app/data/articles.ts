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
    imageUrl:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqHt4gM_PfErKEWISE_oS0P16JVxZjS8074VA8N-rxHsgCHKvjMuxMXQ0ljtwaY-9za3u1Pxer8uNjZ_68xTsJrNbeOaSLdPXUtwgx5ptmFZXfXxxGlWFYkHHNU5QdnffzHm-QSxS6PPFE/s1600/hacker_white_woman1_smile.png',
    publishedAt: '2023-04-01',
  },
  {
    id: 2,
    title: 'TypeScriptで型安全なReact開発',
    excerpt:
      'JavaScriptに静的型付けをもたらすTypeScriptの基本と、Reactでの活用方法を紹介します。',
    content:
      'TypeScriptは、JavaScriptに静的型付けを追加したプログラミング言語です。これにより、開発中にエラーを早期に発見し、コードの可読性と保守性を向上させることができます。ReactプロジェクトにTypeScriptを導入する方法と、PropsやStateに型を適用する基本的なパターンを学びましょう。',
    imageUrl:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2lnzZrso6V94UBM-Cm_2z-4zG0nX3H5MbrEeGltf6gu3IU7Kaka7dRv0k4MgUd1AUiNfNj-tbqER9K0lwiCy_upjRWaTMpbTX5VAwj4Vzau-1bc0Af0WUe-FTU7s3CKtaBHwBQ0Gs2A8/s800/hacker_cracker2_angry.png',
    publishedAt: '2023-04-15',
  },
  {
    id: 3,
    title: 'CSS ModulesでReactのスタイルを管理',
    excerpt:
      'CSSのグローバルな問題を解決するCSS Modulesの導入と使用方法について解説します。',
    content:
      'CSSは強力ですが、グローバルスコープが原因で大規模なプロジェクトではスタイル衝突の問題が発生しやすいです。CSS Modulesは、各CSSクラス名を自動的にユニークなものにスコープすることで、この問題を解決します。ReactプロジェクトでCSS Modulesを設定し、コンポーネントに適用する手順を学びましょう。',
    imageUrl:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJWP8a9vbGKmeUKbagxvtnL6XsYxKaKeQ01Vm8uiQPdkAdpUQtSGaICZO9MY5P-uzPFhJ_i6txSb8aSjOlxNEgMTJEi8bh0QkHNv8L-96G4uERtiwIEDn7F9dj8Vie7_vCLxqOIH6Qtt0B/s800/job_programmer.png',
    publishedAt: '2023-05-01',
  },
];
