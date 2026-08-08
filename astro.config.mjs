// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  // IMPORTANT: set this to your production URL. It is used for canonical
  // links, Open Graph URLs, and absolute links in the RSS feed.
  site: 'https://example.com',

  markdown: {
    // Astro 7 configures Markdown plugins via a `unified()` processor.
    // remark-math parses `$…$` / `$$…$$`; rehype-katex renders it to static
    // HTML + MathML at build time (no client JS). GFM (tables, footnotes,
    // strikethrough, task lists) stays on by default (via `shared.gfm`), and
    // MDX inherits this processor's plugins too.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: false,
    },
  },

  // MDX inherits the Markdown config above (remark/rehype plugins, Shiki, GFM).
  integrations: [mdx()],

  // Default static output. Vercel auto-detects Astro and serves `dist/`.
});
