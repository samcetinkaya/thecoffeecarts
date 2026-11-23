import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { SITE_NAME, canonicalUrl, formatDate, pagePath, tagSlug } from '@/lib/site';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return Array.from(new Set(tags.map(tagSlug))).map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const slug = decodeURIComponent(tag);
  const decoded = (await getAllTags()).find((item) => tagSlug(item) === slug) || slug;
  const title = `Posts tagged ${decoded}`;
  const url = canonicalUrl(`/tags/${slug}`);
  return {
    title,
    description: `Posts tagged ${decoded} on ${SITE_NAME}.`,
    alternates: {
      canonical: url,
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: tagParam } = await params;
  const tag = decodeURIComponent(tagParam);
  const posts = (await getAllPosts()).filter((post) =>
    post.tags.some((item) => tagSlug(item) === tag)
  );

  if (posts.length === 0) notFound();

  const label = posts[0].tags.find((item) => tagSlug(item) === tag) || tag;

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="hero-kicker text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Topic</p>
      <h1 className="hero-title mt-3 font-serif text-5xl tracking-tight">{label}</h1>
      <p className="mt-4 text-[var(--muted)]">
        {posts.length} {posts.length === 1 ? 'post' : 'posts'}
      </p>
      <ol className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {posts.map((post, index) => (
          <li
            key={post.slug}
            className="py-7"
            data-reveal
            style={{ '--reveal-delay': Math.min(index, 8) } as CSSProperties}
          >
            <time dateTime={post.date} className="text-sm text-[var(--faint)]">
              {formatDate(post.date)}
            </time>
            <h2 className="mt-2 font-serif text-3xl tracking-tight">
              <Link
                href={pagePath(`/posts/${post.slug}`)}
                className="link-underline hover:text-[var(--accent)]"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">{post.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
