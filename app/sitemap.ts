import { MetadataRoute } from 'next';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { canonicalUrl, tagSlug } from '@/lib/site';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts({ includeFuture: false });
  const tags = await getAllTags();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: canonicalUrl('/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: canonicalUrl('/posts'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: canonicalUrl('/tags'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: canonicalUrl('/about'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const postRoutes = posts.map((post) => ({
    url: canonicalUrl(`/posts/${post.slug}`),
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const tagRoutes = Array.from(new Set(tags.map(tagSlug))).map((tag) => ({
    url: canonicalUrl(`/tags/${tag}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
