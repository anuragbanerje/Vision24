export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  category: string;
  imageUrl?: string;
  videoUrl?: string;
  publishedAt: string;
  source: string;
  likes: number;
  commentsCount: number;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: string;
  publishedAt: string;
  imageUrl: string;
}

export type NewsCategory = 'Politics' | 'Sports' | 'Crime' | 'National' | 'Market' | 'Jobs' | 'Local';
