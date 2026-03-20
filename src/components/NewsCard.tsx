import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Clock, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { NewsArticle } from '../types';
import { formatDistanceToNow } from 'date-fns';
import CommentModal from './CommentModal';
import NewsDetailModal from './NewsDetailModal';

interface NewsCardProps {
  article: NewsArticle;
  isFeatured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, isFeatured }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likes);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: article.title,
      text: article.summary,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCommentModalOpen(true);
  };

  const handleCardClick = () => {
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        onClick={handleCardClick}
        className={`glass-card rounded-3xl overflow-hidden group cursor-pointer ${
          isFeatured ? 'col-span-1 md:col-span-2 lg:col-span-2' : ''
        }`}
      >
        <div className={`relative ${isFeatured ? 'h-64 md:h-96' : 'h-48'}`}>
          <img
            src={article.imageUrl || `https://picsum.photos/seed/${article.id}/800/600`}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/90 via-deep-blue/20 to-transparent"></div>
          
          {article.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                <Play size={32} fill="currentColor" />
              </div>
            </div>
          )}

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-gold text-deep-blue text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
              {article.category}
            </span>
            {isFeatured && (
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
                Featured
              </span>
            )}
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); /* Bookmark logic */ }}
            className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-gold hover:text-deep-blue transition-all border border-white/20"
          >
            <Bookmark size={18} />
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className={`font-bold text-white leading-tight tracking-tight group-hover:text-gold transition-colors ${
              isFeatured ? 'text-2xl md:text-4xl' : 'text-lg'
            }`}>
              {article.title}
            </h3>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
            {article.summary}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-4 text-gray-400">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1.5 transition-colors group/btn ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
              >
                <Heart size={18} className={isLiked ? 'fill-red-500' : 'group-hover/btn:fill-red-500'} />
                <span className="text-xs font-medium">{likesCount}</span>
              </button>
              <button 
                onClick={handleCommentClick}
                className="flex items-center gap-1.5 hover:text-deep-blue transition-colors group/btn"
              >
                <MessageCircle size={18} />
                <span className="text-xs font-medium">{article.commentsCount}</span>
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-deep-blue transition-colors group/btn"
              >
                <Share2 size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={14} />
              <span className="text-[10px] font-medium uppercase tracking-wider">
                {formatDistanceToNow(new Date(article.publishedAt))} ago
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <CommentModal 
        isOpen={isCommentModalOpen} 
        onClose={() => setIsCommentModalOpen(false)} 
        articleTitle={article.title}
        commentsCount={article.commentsCount}
      />

      <NewsDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        article={article}
      />
    </>
  );
};

export default NewsCard;

