import { db_local, NewsItem, RSSFeed } from '../db';

const DEFAULT_FEEDS: RSSFeed[] = [
  { name: 'ABP Ananda', url: 'https://bangla.abplive.com/home/feed', category: 'National', isActive: true },
  { name: 'Sangbad Pratidin', url: 'https://www.sangbadpratidin.in/feed/', category: 'National', isActive: true },
  { name: 'Google News West Bengal', url: 'https://news.google.com/rss/search?q=West+Bengal&hl=bn&gl=IN&ceid=IN:bn', category: 'Local', isActive: true }
];

export async function initializeFeeds() {
  const count = await db_local.feeds.count();
  if (count === 0) {
    await db_local.feeds.bulkAdd(DEFAULT_FEEDS);
  }
}

export async function fetchAndStoreNews() {
  try {
    await initializeFeeds();
    const feeds = await db_local.feeds.where('isActive').equals(1).toArray();
    
    for (const feed of feeds) {
      // Using rss2json as a proxy to avoid CORS
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`);
      const data = await response.json();

      if (data.status === 'ok') {
        const items: NewsItem[] = data.items.map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          content: item.content,
          contentSnippet: item.description,
          guid: item.guid,
          isoDate: item.pubDate,
          category: feed.category,
          image: item.thumbnail || item.enclosure?.link,
          source: feed.name
        }));

        // Store in Dexie (IndexedDB)
        for (const item of items) {
          const exists = await db_local.news.where('guid').equals(item.guid).first();
          if (!exists) {
            await db_local.news.add(item);
          }
        }
      }
    }
    console.log('News synced successfully');
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

export async function getLocalNews() {
  return await db_local.news.orderBy('pubDate').reverse().toArray();
}

export async function getFeeds() {
  return await db_local.feeds.toArray();
}

export async function addFeed(feed: RSSFeed) {
  return await db_local.feeds.add(feed);
}

export async function deleteFeed(id: number) {
  return await db_local.feeds.delete(id);
}

export async function toggleFeed(id: number, isActive: boolean) {
  return await db_local.feeds.update(id, { isActive });
}
