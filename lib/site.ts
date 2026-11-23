import config from '@/config.json';

export const SITE_URL = config.base_url.replace(/\/$/, '');
export const SITE_NAME = config.site_name;
export const SITE_TITLE = config.site_title;
export const SITE_DESCRIPTION = config.site_description;
export const AUTHOR_NAME = config.author_name;

/** Absolute canonical URL. Trailing slashes match next.config `trailingSlash: true`. */
export function canonicalUrl(path: string): string {
  if (!path || path === '/') {
    return `${SITE_URL}/`;
  }
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  if (/\.[a-z0-9]+$/i.test(withLeading)) {
    return `${SITE_URL}${withLeading}`;
  }
  const withTrailing = withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
  return `${SITE_URL}${withTrailing}`;
}

/** Internal link path with a trailing slash, e.g. `/posts/my-post/`. */
export function pagePath(path = '/'): string {
  if (!path || path === '/') return '/';
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

/** URL-safe form of a tag: "Coffee carts" becomes "coffee-carts". */
export function tagSlug(tag: string): string {
  const slug = tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || encodeURIComponent(tag.trim().toLowerCase());
}

export function formatDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export const defaultOgImage = '/og/default.png';
export const ogImages = [{ url: defaultOgImage, width: 1200, height: 630, alt: SITE_NAME }];
