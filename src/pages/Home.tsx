import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Newspaper, Radio, Mic, ChevronRight, Sparkles, RefreshCw, WifiOff } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import CategoryNav from '../components/CategoryNav';
import PodcastPlayer from '../components/PodcastPlayer';
import LiveStream from '../components/LiveStream';
import AdComponent from '../components/AdComponent';
import { NewsArticle, NewsCategory, PodcastEpisode } from '../types';
import { fetchAndStoreNews, getLocalNews } from '../services/rssService';

const MOCK_PODCAST: PodcastEpisode = {
  id: 'p1',
  title: 'The Morning Brief: Politics & Beyond',
  description: 'Join our senior editors as they dissect the biggest political stories of the day from West Bengal and India.',
  audioUrl: '#',
  duration: '45:20',
  publishedAt: new Date().toISOString(),
  imageUrl: 'https://picsum.photos/seed/podcast-1/600/600'
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('Politics');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    loadNews();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadNews = async () => {
    const localNews = await getLocalNews();
    if (localNews.length > 0) {
      const mappedNews: NewsArticle[] = localNews.map(item => ({
        id: item.guid,
        title: item.title,
        content: item.content,
        summary: item.contentSnippet,
        author: item.source,
        category: item.category,
        imageUrl: item.image,
        publishedAt: item.pubDate,
        source: item.source,
        likes: Math.floor(Math.random() * 1000),
        commentsCount: Math.floor(Math.random() * 100)
      }));
      setArticles(mappedNews);
    }
  };

  const handleSync = async () => {
    if (isOffline) return;
    setIsSyncing(true);
    await fetchAndStoreNews();
    await loadNews();
    setIsSyncing(false);
  };

  return (
    <div className="space-y-12">
      {/* Offline Alert */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-500 text-white px-6 py-3 rounded-2xl flex items-center justify-between shadow-lg shadow-red-500/20"
          >
            <div className="flex items-center gap-3">
              <WifiOff size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Offline Mode: Reading from local storage</span>
            </div>
            <button onClick={() => window.location.reload()} className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
              Retry
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Live Stream */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center shadow-lg">
              <Radio className="text-deep-blue" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tighter">Live Broadcasting</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Real-time coverage</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-deep-blue font-bold text-xs uppercase tracking-widest hover:text-gold transition-colors">
            <span>View All Streams</span>
            <ChevronRight size={16} />
          </button>
        </div>
        <LiveStream />
      </section>

      {/* Ad Slot 1 */}
      <AdComponent adSlot="1234567890" />

      {/* Category Navigation */}
      <section className="sticky top-16 z-40 bg-off-white/80 backdrop-blur-md py-4 -mx-4 px-4">
        <CategoryNav selected={selectedCategory} onSelect={setSelectedCategory} />
      </section>

      {/* News Feed */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 blue-gradient rounded-2xl flex items-center justify-center shadow-lg">
              <Newspaper className="text-gold" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tighter">Latest Updates</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Top stories for you</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
            <button 
              onClick={handleSync}
              disabled={isSyncing || isOffline}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                isSyncing ? 'bg-gray-100 text-gray-400' : 'bg-deep-blue text-white shadow-lg'
              }`}
            >
              <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
              {isSyncing ? 'Syncing...' : 'Sync News'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length > 0 ? (
            articles.map((article: NewsArticle, index: number) => (
              <NewsCard 
                key={article.id} 
                article={article} 
                isFeatured={index === 0} 
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                <Newspaper size={40} />
              </div>
              <p className="text-gray-400 font-bold uppercase tracking-widest">No news found. Please sync to fetch latest updates.</p>
            </div>
          )}
        </div>
      </section>

      {/* Podcast Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center shadow-lg">
              <Mic className="text-deep-blue" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tighter">Vision 24 Podcasts</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Listen on the go</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-deep-blue font-bold text-xs uppercase tracking-widest hover:text-gold transition-colors">
            <span>Browse Episodes</span>
            <ChevronRight size={16} />
          </button>
        </div>
        <PodcastPlayer episode={MOCK_PODCAST} />
      </section>

      {/* Market Updates / Stock / Gold (Bento Grid Style) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-[2.5rem] p-8 space-y-6 border-l-4 border-gold"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center text-gold">
                <TrendingUp size={20} />
              </div>
              <h3 className="font-bold tracking-tight">Market Watch</h3>
            </div>
            <Sparkles className="text-gold" size={16} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">NIFTY 50</span>
              <span className="text-sm font-bold text-green-500">+1.24%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">SENSEX</span>
              <span className="text-sm font-bold text-green-500">+0.86%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">GOLD (24K)</span>
              <span className="text-sm font-bold text-red-500">-0.12%</span>
            </div>
          </div>
          <button className="w-full py-3 bg-gray-50 text-deep-blue text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all">
            Full Market Report
          </button>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="md:col-span-2 blue-gradient rounded-[2.5rem] p-8 text-white flex flex-col justify-between"
        >
          <div className="space-y-2">
            <h3 className="text-3xl font-bold tracking-tighter">Local Reporting</h3>
            <p className="text-white/60 text-sm font-medium">Be the voice of your community. Submit local news, photos, and videos directly to our newsroom.</p>
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-deep-blue bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-deep-blue bg-gold flex items-center justify-center text-deep-blue text-xs font-bold">
                +12k
              </div>
            </div>
            <button className="px-8 py-4 gold-gradient text-deep-blue font-bold text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-gold/20 hover:scale-105 transition-transform">
              Submit News
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

