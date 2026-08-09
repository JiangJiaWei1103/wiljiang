# blog

A minimal, content-first personal blog built with [Astro](https://astro.build)
and TypeScript. Fully static, **zero client-side JavaScript**.

- Two content collections: **log** (short, frequent worklog entries) and **posts** (long-form).
- Homepage: a 3-line bio + one reverse-chronological feed mixing both.
- Markdown / MDX with LaTeX (KaTeX), GFM tables + footnotes, and dual-theme
  syntax highlighting (Shiki `github-light` / `github-dark`).
- Dark mode via `prefers-color-scheme`. No analytics, comments, or tracking.

## Requirements

- **Node ≥ 22.12** (Astro 7). This repo was set up with Node 22.23 via `nvm`.

If you use `nvm`:

```sh
nvm use 22   # or: nvm install 22
```

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output → ./dist
npm run preview  # serve the build locally
```

Drafts (`draft: true`) are visible in `npm run dev` but excluded from `build`.

## Make it yours

1. **`src/consts.ts`** — your name, bio (3 lines), nav, and GitHub/X links.
2. **`astro.config.mjs`** — set `site` to your production URL (used for
   canonical links and absolute RSS links).

## Writing

Add a Markdown (`.md`) or MDX (`.mdx`) file to:

- `src/content/log/` — short entries
- `src/content/posts/` — long-form

The filename (without extension) becomes the URL slug. Frontmatter:

```yaml
---
title: Your title
date: 2026-08-08 # required; drives feed + RSS ordering
description: Optional one-liner (used in <meta> and RSS).
tags: [optional, list]
draft: false # optional, defaults to false
---
```

### Markdown features

- **Math** — `$inline$` and `$$display$$` (LaTeX via remark-math + KaTeX).
  In `.mdx`, avoid literal `{ }` in math (they're MDX expressions) or use `.md`.
- **Tables & footnotes** — standard GFM. Wide tables scroll horizontally.
- **Code** — fenced blocks are highlighted at build time, light + dark.
- **Images** — co-locate next to the `.md` file and reference relatively:
  `![alt](./diagram.png)`. Astro optimizes them at build (via `sharp`).
- **Full-bleed** — break a figure or table out of the reading column:

  ```html
  <figure class="full-bleed">
    <img src="..." alt="..." />
    <figcaption>Wide figure.</figcaption>
  </figure>
  ```

## Routes

| Path               | What                                             |
| ------------------ | ------------------------------------------------ |
| `/`                | Bio + mixed reverse-chronological feed           |
| `/log/`            | Worklog index                                    |
| `/log/[slug]`      | A worklog entry                                  |
| `/posts/`          | Posts index                                      |
| `/posts/[slug]`    | A post                                           |
| `/about/`          | About page                                       |
| `/rss.xml`         | Full-content RSS feed (both collections)         |

## Deploy to Vercel

This is a static site, so no adapter is needed. Import the repo at
[vercel.com/new](https://vercel.com/new); Vercel auto-detects Astro:

- **Build command:** `astro build` (default)
- **Output directory:** `dist` (default)

Set your domain, update `site` in `astro.config.mjs` to match, and redeploy.

## Structure

```
src/
  content/
    log/               # short entries (.md / .mdx)
    posts/             # long-form (.md / .mdx)
  content.config.ts    # collection schema
  consts.ts            # site name, bio, nav, social links
  lib/content.ts       # feed helpers, date formatting
  layouts/             # Base (html shell) + Entry (article)
  components/          # Header, Footer
  pages/               # routes, incl. rss.xml.ts
  styles/global.css    # the whole design system
public/favicon.svg
astro.config.mjs       # site URL, MDX, math, Shiki dual theme
```
