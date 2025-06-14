import { prisma } from '@/app/lib/prisma';
import { NextRequest } from 'next/server';

function setCORSHeaders(headers: Headers) {
  headers.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
    });

    const responseHeaders = new Headers();
    setCORSHeaders(responseHeaders);

    if (!article) {
      return new Response(JSON.stringify({ error: '記事が見つかりません' }), {
        status: 404,
        headers: responseHeaders,
      });
    }

    return new Response(JSON.stringify(article), {
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const body = await request.json();
    const { title, content, excerpt, slug, author, tags, metaDescription, isPublished } = body;

    const existingArticle = await prisma.article.findUnique({
      where: { id: Number(id) },
    });

    if (!existingArticle) {
      const responseHeaders = new Headers();
      setCORSHeaders(responseHeaders);
      return new Response(JSON.stringify({ error: '記事が見つかりません' }), {
        status: 404,
        headers: responseHeaders,
      });
    }

    const updatedData: {
      title?: string;
      content?: string;
      excerpt?: string | null;
      slug?: string;
      author?: string;
      tags?: string[];
      metaDescription?: string | null;
      isPublished?: boolean;
      publishedAt?: Date | null;
    } = {
      title,
      content,
      excerpt,
      slug,
      author,
      tags,
      metaDescription,
      isPublished,
    };

    if (isPublished && !existingArticle.isPublished) {
      updatedData.publishedAt = new Date();
    } else if (!isPublished) {
      updatedData.publishedAt = null;
    }

    const article = await prisma.article.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    const responseHeaders = new Headers();
    setCORSHeaders(responseHeaders);

    return new Response(JSON.stringify(article), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('記事更新エラー:', error);
    const responseHeaders = new Headers();
    setCORSHeaders(responseHeaders);

    return new Response(JSON.stringify({ error: '記事の更新に失敗しました' }), {
      status: 500,
      headers: responseHeaders,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const existingArticle = await prisma.article.findUnique({
      where: { id: Number(id) },
    });

    if (!existingArticle) {
      const responseHeaders = new Headers();
      setCORSHeaders(responseHeaders);
      return new Response(JSON.stringify({ error: '記事が見つかりません' }), {
        status: 404,
        headers: responseHeaders,
      });
    }

    await prisma.article.delete({
      where: { id: Number(id) },
    });

    const responseHeaders = new Headers();
    setCORSHeaders(responseHeaders);

    return new Response(JSON.stringify({ message: '記事を削除しました' }), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('記事削除エラー:', error);
    const responseHeaders = new Headers();
    setCORSHeaders(responseHeaders);

    return new Response(JSON.stringify({ error: '記事の削除に失敗しました' }), {
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
