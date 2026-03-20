import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Rss, Plus, Trash2, CheckCircle2, XCircle, Globe, Layout } from 'lucide-react';
import { getFeeds, addFeed, deleteFeed, toggleFeed } from '../services/rssService';
import { RSSFeed } from '../db';

export default function ManageRSS() {
  const [feeds, setFeeds] = useState<RSSFeed[]>([]);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('National');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadFeeds();
  }, []);

  const loadFeeds = async () => {
    const data = await getFeeds();
    setFeeds(data);
  };

  const handleAddFeed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newUrl) return;

    await addFeed({
      name: newName,
      url: newUrl,
      category: newCategory,
      isActive: true
    });

    setNewName('');
    setNewUrl('');
    setIsAdding(false);
    loadFeeds();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this feed?')) {
      await deleteFeed(id);
      loadFeeds();
    }
  };

  const handleToggle = async (id: number, currentStatus: boolean) => {
    await toggleFeed(id, !currentStatus);
    loadFeeds();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 blue-gradient rounded-2xl flex items-center justify-center shadow-lg">
            <Rss className="text-gold" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tighter">Manage RSS Feeds</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Connect external news sources</p>
          </div>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-6 py-3 bg-deep-blue text-white text-xs font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-deep-blue/20 hover:scale-105 transition-transform"
        >
          <Plus size={16} />
          <span>{isAdding ? 'Cancel' : 'Add New Feed'}</span>
        </button>
      </div>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2.5rem] p-8 border-2 border-gold/20"
        >
          <form onSubmit={handleAddFeed} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2">Source Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. BBC News"
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2">RSS URL</label>
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://example.com/feed"
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold transition-all"
              >
                <option value="National">National</option>
                <option value="Local">Local</option>
                <option value="International">International</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-4 gold-gradient text-deep-blue font-bold text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-gold/20 hover:scale-[1.02] transition-transform"
              >
                Save Feed
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {feeds.map((feed) => (
          <motion.div
            key={feed.id}
            layout
            className={`glass-card rounded-3xl p-6 flex items-center justify-between border-l-4 ${feed.isActive ? 'border-green-500' : 'border-gray-300'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${feed.isActive ? 'bg-green-50 text-green-500' : 'bg-gray-50 text-gray-400'}`}>
                <Globe size={20} />
              </div>
              <div>
                <h3 className="font-bold tracking-tight">{feed.name}</h3>
                <p className="text-xs text-gray-400 truncate max-w-[200px] md:max-w-md">{feed.url}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-[8px] font-bold uppercase tracking-widest rounded-md text-gray-500">
                  {feed.category}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => feed.id && handleToggle(feed.id, feed.isActive)}
                className={`p-2 rounded-xl transition-colors ${feed.isActive ? 'text-green-500 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}
                title={feed.isActive ? 'Deactivate' : 'Activate'}
              >
                {feed.isActive ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
              </button>
              <button
                onClick={() => feed.id && handleDelete(feed.id)}
                className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}

        {feeds.length === 0 && (
          <div className="py-20 text-center space-y-4 bg-white/50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
              <Rss size={32} />
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest">No feeds added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
