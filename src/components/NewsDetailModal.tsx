import React, { useState } from 'react';
import { X, Clock, User, Globe, Share2, Heart, Maximize2, Minimize2, Volume2, VolumeX, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsArticle } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface NewsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: NewsArticle;
}

export default function NewsDetailModal({ isOpen, onClose, article }: NewsDetailModalProps) {
  const [isMediaExpanded, setIsMediaExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep-blue/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] bg-white sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header Media Area */}
            <div className={`relative shrink-0 transition-all duration-500 ease-in-out ${isMediaExpanded ? 'h-[50vh] sm:h-[60vh]' : 'h-64 sm:h-96'}`}>
              {article.videoUrl ? (
                <div className="w-full h-full bg-black relative">
                  <video
                    src={article.videoUrl}
                    className="w-full h-full object-contain"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-all border border-white/20"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                </div>
              ) : (
                <img
                  src={article.imageUrl || `https://picsum.photos/seed/${article.id}/1200/800`}
                  alt={article.title}
                  className={`w-full h-full transition-all duration-500 ${isMediaExpanded ? 'object-contain bg-black/5' : 'object-cover'}`}
                  referrerPolicy="no-referrer"
                />
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent ${isMediaExpanded ? 'opacity-0' : 'opacity-100'}`}></div>
              
              <div className="absolute top-6 right-6 flex gap-2">
                <button 
                  onClick={() => setIsMediaExpanded(!isMediaExpanded)}
                  className="p-3 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white transition-all border border-white/20"
                  title={isMediaExpanded ? "Minimize Media" : "Expand Media"}
                >
                  {isMediaExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                <button 
                  onClick={onClose}
                  className="p-3 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white transition-all border border-white/20"
                >
                  <X size={20} />
                </button>
              </div>

              {!isMediaExpanded && (
                <div className="absolute bottom-6 left-8 right-8">
                  <span className="bg-gold text-deep-blue text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg inline-block mb-4">
                    {article.category}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-bold text-deep-blue leading-tight tracking-tighter">
                    {article.title}
                  </h2>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12">
              {isMediaExpanded && (
                <div className="mb-8">
                  <span className="bg-gold text-deep-blue text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg inline-block mb-4">
                    {article.category}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-bold text-deep-blue leading-tight tracking-tighter mb-6">
                    {article.title}
                  </h2>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-deep-blue">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Author</p>
                    <p className="text-sm font-bold text-deep-blue">{article.author}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Published</p>
                    <p className="text-sm font-bold text-deep-blue">{formatDistanceToNow(new Date(article.publishedAt))} ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <Globe size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Source</p>
                    <p className="text-sm font-bold text-deep-blue">{article.source}</p>
                  </div>
                </div>
              </div>

              {/* Main Text Content */}
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-serif"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                  <span className="text-sm font-bold">{article.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-deep-blue transition-colors">
                  <Share2 size={20} />
                  <span className="text-sm font-bold">Share Story</span>
                </button>
              </div>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-deep-blue text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-deep-blue/20"
              >
                Close Article
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
