import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  canonicalUrl,
  formatDate,
  ogImages,
  pagePath,
} from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: canonicalUrl('/'),
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: canonicalUrl('/'),
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    images: ogImages,
  },
};

export default async function HomePage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;
  const recent = rest.slice(0, 6);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en',
    description: SITE_DESCRIPTION,
    potentialAction: {
      '@type': 'ReadAction',
      target: canonicalUrl('/posts'),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="hero-shell mx-auto max-w-6xl px-5 pb-8 pt-16 sm:px-8 sm:pt-24">
        <div className="hero-accent" aria-hidden="true" />
        <p className="hero-kicker text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
          A coffee cart journal
        </p>
        <h1 className="hero-title mt-5 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight text-[var(--ink)] sm:text-7xl">
          Everything worth knowing about coffee carts.
        </h1>
        <p className="hero-copy mt-8 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
          Guides and field notes on mobile coffee carts and espresso bars: how they work, what
          they cost, and what makes one worth booking.
        </p>
        <div className="hero-actions mt-10 flex flex-wrap items-center gap-6">
          <Link
            href={pagePath('/posts')}
            className="pressable inline-flex items-center rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm text-[var(--bg)]"
          >
            Read the writing
          </Link>
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <div
            data-reveal
            className="lift-card overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--bg-elevated)]"
          >
            <Link href={pagePath(`/posts/${featured.slug}`)} className="group block p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-[var(--faint)]">
                <span>Latest</span>
                <span aria-hidden="true">·</span>
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
              </div>
              <h2 className="mt-5 max-w-4xl font-serif text-3xl leading-tight tracking-tight text-[var(--ink)] sm:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                {featured.description}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--ink)]">
                Continue reading
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </div>
        </section>
      )}

      {recent.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-6 sm:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-serif text-3xl tracking-tight">Recent writing</h2>
            <Link
              href={pagePath('/posts')}
              className="link-underline text-sm text-[var(--muted)] hover:text-[var(--ink)]"
            >
              All posts
            </Link>
          </div>
          <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {recent.map((post, index) => (
              <li
                key={post.slug}
                data-reveal
                style={{ '--reveal-delay': index } as CSSProperties}
              >
                <Link
                  href={pagePath(`/posts/${post.slug}`)}
                  className="group grid gap-2 py-6 sm:grid-cols-[7rem_1fr] sm:gap-8"
                >
                  <time
                    dateTime={post.date}
                    className="pt-1 text-sm text-[var(--faint)]"
                  >
                    {formatDate(post.date)}
                  </time>
                  <div>
                    <h3 className="font-serif text-2xl tracking-tight text-[var(--ink)] group-hover:text-[var(--accent)]">
                      {post.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="pb-24" />
      )}
    </>
  );
}
