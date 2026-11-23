# The Coffee Carts

The blog at [thecoffeecarts.com](https://thecoffeecarts.com): guides and field notes on mobile coffee carts and espresso bars.

It is a static site built with Next.js, TypeScript and Tailwind CSS. Posts are Markdown files; the build turns them into plain HTML that any static host can serve.

## Run it on your computer

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Add a post

Create a file in `content/posts/` ending in `.mdx`. Copy `welcome-to-the-coffee-carts.mdx` as a starting point:

```markdown
---
slug: "how-much-does-a-coffee-cart-cost"
title: "How Much Does a Coffee Cart Cost?"
date: 2026-12-01
tags:
  - Pricing
description: "One or two sentences shown in lists and in search results."
---

Your post, written in Markdown.
```

- `slug` becomes the address: `thecoffeecarts.com/posts/how-much-does-a-coffee-cart-cost/`.
- `tags` become the pages under Topics.
- A post dated in the future stays hidden on the live site until that day. See `SCHEDULED_POSTS.md`.
- Use `##` headings inside a post; they feed the "On this page" list beside it.

## Change the site name or description

Edit `config.json`. The home page text is in `app/(site)/page.tsx` and the About page is in `app/(site)/about/page.tsx`.

## Check before publishing

```bash
npm run typecheck
npm run lint
npm run build
```

The finished site is written to `out/`.

## Put it live

See `DEPLOYMENT.md`.

## Credits

The design and blog engine are adapted from [SaidYaka-Work/SaidYakaBlog](https://github.com/SaidYaka-Work/SaidYakaBlog), which is built on the MIT-licensed [nextjs-seo-blog-starter](https://github.com/GanLiuuuu/nextjs-seo-blog-starter).
