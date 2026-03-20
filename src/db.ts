import Dexie, { Table } from 'dexie';

export interface NewsItem {
  id?: number;
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
  category: string;
  image?: string;
  source: string;
}

export interface RSSFeed {
  id?: number;
  name: string;
  url: string;
  category: string;
  isActive: boolean;
}

export class Vision24Database extends Dexie {
  news!: Table<NewsItem>;
  feeds!: Table<RSSFeed>;

  constructor() {
    super('Vision24DB');
    this.version(2).stores({
      news: '++id, guid, category, source, pubDate',
      feeds: '++id, name, url, category'
    });
  }
}

export const db_local = new Vision24Database();
