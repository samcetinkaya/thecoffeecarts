import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, canonicalUrl, ogImages, pagePath } from '@/lib/site';

const description = `${SITE_NAME} is a blog about mobile coffee carts and espresso bars.`;

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: {
    canonical: canonicalUrl('/about'),
  },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description,
    url: canonicalUrl('/about'),
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    images: ogImages,
  },
};

export default function AboutPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE_NAME}`,
    url: canonicalUrl('/about'),
    description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-12">
          <p className="hero-kicker text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            The blog
          </p>
          <h1 className="hero-title mt-3 font-serif text-5xl tracking-tight sm:text-6xl">About</h1>
          <p className="hero-copy mt-3 text-lg text-[var(--muted)]">
            Notes on mobile coffee carts and espresso bars
          </p>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-[var(--muted)]" data-reveal>
          <p>
            <span className="text-[var(--ink)]">{SITE_NAME}</span> is a blog about mobile coffee
            carts and espresso bars: the small counters on wheels that turn up at offices,
            weddings, conferences and street corners.
          </p>
          <p>
            We write practical guides for people thinking about booking a cart, and field notes
            for people who run one. Expect posts on pricing, menus, equipment, logistics, and
            what separates a good cart from a forgettable one.
          </p>
          <p>
            Start with the{' '}
            <Link href={pagePath('/posts')} className="link-underline text-[var(--ink)]">
              latest writing
            </Link>
            , or browse{' '}
            <Link href={pagePath('/tags')} className="link-underline text-[var(--ink)]">
              by topic
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
