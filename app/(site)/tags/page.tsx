import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { SITE_NAME, canonicalUrl, ogImages, pagePath, tagSlug } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Browse The Coffee Carts by topic.',
  alternates: {
    canonical: canonicalUrl('/tags'),
  },
  openGraph: {
    title: `Topics | ${SITE_NAME}`,
    description: 'Browse The Coffee Carts by topic.',
    url: canonicalUrl('/tags'),
    siteName: SITE_NAME,
    images: ogImages,
    type: 'website',
    locale: 'en_US',
  },
};

export default async function TagsPage() {
  const posts = await getAllPosts();
  const counts = posts.reduce<Record<string, number>>((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
  const tags = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="hero-kicker text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Index</p>
      <h1 className="hero-title mt-3 font-serif text-5xl tracking-tight sm:text-6xl">Topics</h1>
      <p className="hero-copy mt-5 max-w-xl text-lg text-[var(--muted)]">
        Everything on the blog, sorted by subject.
      </p>
      <ul className="mt-14 grid gap-3 sm:grid-cols-2">
        {tags.map(([tag, count], index) => (
          <li
            key={tag}
            data-reveal
            style={{ '--reveal-delay': Math.min(index, 8) } as CSSProperties}
          >
            <Link
              href={pagePath(`/tags/${tagSlug(tag)}`)}
              className="lift-card flex items-baseline justify-between rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-5 py-4"
            >
              <span className="font-serif text-2xl tracking-tight">{tag}</span>
              <span className="text-sm text-[var(--faint)]">
                {count} {count === 1 ? 'post' : 'posts'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
