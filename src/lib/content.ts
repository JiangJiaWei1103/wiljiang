import { getCollection, type CollectionEntry } from 'astro:content';

/** Drafts are visible in `astro dev` but excluded from production builds. */
const includeDrafts = import.meta.env.DEV;

export type Worklog = CollectionEntry<'worklogs'>;
export type Post = CollectionEntry<'posts'>;

export type FeedItem =
  | { type: 'worklog'; entry: Worklog }
  | { type: 'post'; entry: Post };

function byDateDesc<T extends { data: { date: Date } }>(a: T, b: T): number {
  return b.data.date.valueOf() - a.data.date.valueOf();
}

export async function getWorklogs(): Promise<Worklog[]> {
  const entries = await getCollection(
    'worklogs',
    ({ data }) => includeDrafts || !data.draft,
  );
  return entries.sort(byDateDesc);
}

export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection(
    'posts',
    ({ data }) => includeDrafts || !data.draft,
  );
  return entries.sort(byDateDesc);
}

/** Unified, reverse-chronological feed mixing both collections. */
export async function getFeed(): Promise<FeedItem[]> {
  const [worklogs, posts] = await Promise.all([getWorklogs(), getPosts()]);
  const items: FeedItem[] = [
    ...worklogs.map((entry): FeedItem => ({ type: 'worklog', entry })),
    ...posts.map((entry): FeedItem => ({ type: 'post', entry })),
  ];
  return items.sort((a, b) => byDateDesc(a.entry, b.entry));
}

/** URL for an entry, e.g. `/worklogs/set-up-the-blog/`. */
export function entryPath(type: 'worklog' | 'post', id: string): string {
  return `/${type === 'worklog' ? 'worklogs' : 'posts'}/${id}/`;
}

/** Human date, formatted in UTC so it never drifts a day across timezones. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
