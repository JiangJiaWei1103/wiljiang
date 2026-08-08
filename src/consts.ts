// ---------------------------------------------------------------------------
// Edit this file to make the site yours. Also update `site` in astro.config.mjs.
// ---------------------------------------------------------------------------

export const SITE = {
  /** Shown in the header, the browser tab, and the RSS feed title. */
  title: 'R(s,a|Wil)',
  /** Default meta description and RSS feed description. */
  description:
    'Worklogs and long-form notes on software, systems, and whatever I am building.',
  /** Used in the footer copyright line and as the RSS author. */
  author: 'Wil Jiang',
  /** Interface language (the <html lang> attribute). */
  lang: 'en',
} as const;

/** Three short lines for the homepage bio. Keep them terse. */
export const BIO: string[] = [
  'I build things and write about how they work.',
  'Systems, machine-learning infrastructure, and the occasional yak-shave.',
  'This is my worklog and notebook — mostly rough, sometimes finished.',
];

/** Primary navigation, rendered as: name + [log · posts · about · rss]. */
export const NAV: { label: string; href: string }[] = [
  { label: 'log', href: '/worklogs/' },
  { label: 'posts', href: '/posts/' },
  { label: 'about', href: '/about/' },
  { label: 'rss', href: '/rss.xml' },
];

/** Footer links. */
export const SOCIAL = {
  github: 'https://github.com/your-handle',
  x: 'https://x.com/your-handle',
} as const;
