import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { loadRenderers } from 'astro:container';
import { getContainerRenderer as getMdxRenderer } from '@astrojs/mdx/container-renderer';
import { render } from 'astro:content';
import { getFeed, entryPath } from '../lib/content';
import { SITE } from '../consts';

// Full-content feed for both collections. Each entry is rendered to HTML with
// the Container API so math, tables, and highlighted code make it into the
// <content:encoded> body. MDX entries need the JSX renderer registered.
export async function GET(context: APIContext) {
  const renderers = await loadRenderers([getMdxRenderer()]);
  const container = await AstroContainer.create({ renderers });
  const feed = await getFeed();

  const items = [];
  for (const { type, entry } of feed) {
    const { Content } = await render(entry);
    const html = (await container.renderToString(Content)).replace(
      /^\s*<!doctype html>/i,
      '',
    );

    items.push({
      title: entry.data.title,
      description: entry.data.description ?? '',
      pubDate: entry.data.date,
      link: entryPath(type, entry.id),
      content: html,
      categories: entry.data.tags,
    });
  }

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? 'https://example.com',
    items,
    trailingSlash: true,
  });
}
