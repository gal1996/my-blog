import { prisma } from '@/app/lib/prisma';

function setCORSHeaders(headers: Headers) {
  headers.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });

    const responseHeaders = new Headers();
    setCORSHeaders(responseHeaders);

    return new Response(JSON.stringify(articles), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('記事取得エラー:', error);
    const responseHeaders = new Headers();
    setCORSHeaders(responseHeaders);

    return new Response(JSON.stringify({ error: '記事の取得に失敗しました' }), {
      status: 500,
      headers: responseHeaders,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, excerpt, slug, author, tags, metaDescription, isPublished } = body;

    if (!title || !content || !slug) {
      const responseHeaders = new Headers();
      setCORSHeaders(responseHeaders);
      return new Response(JSON.stringify({ error: 'タイトル、内容、スラッグは必須です' }), {
        status: 400,
        headers: responseHeaders,
      });
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        excerpt,
        slug,
        author: author || 'Admin',
        tags: tags || [],
        metaDescription,
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    const responseHeaders = new Headers();
    setCORSHeaders(responseHeaders);

    return new Response(JSON.stringify(article), {
      status: 201,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('記事作成エラー:', error);
    const responseHeaders = new Headers();
    setCORSHeaders(responseHeaders);

    return new Response(JSON.stringify({ error: '記事の作成に失敗しました' }), {
      status: 500,
      headers: responseHeaders,
    });
  }
}

export async function OPTIONS() {
  const responseHeaders = new Headers();
  setCORSHeaders(responseHeaders);
  return new Response(null, { status: 200, headers: responseHeaders });
}
