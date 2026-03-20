import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Mic, List, Heart, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PodcastEpisode } from '../types';

interface PodcastPlayerProps {
  episode: PodcastEpisode;
}

export default function PodcastPlayer({ episode }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // Mock progress

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="blue-gradient rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-gold/20 transition-all duration-700"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        {/* Album Art */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full border-4 border-white/20 p-2 relative"
          >
            <img
              src={episode.imageUrl || `https://picsum.photos/seed/${episode.id}/400/400`}
              alt={episode.title}
              className="w-full h-full object-cover rounded-full shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-black/40"></div>
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-deep-blue rounded-full border-4 border-white/20 shadow-inner"></div>
        </div>

        {/* Info & Controls */}
        <div className="flex-1 w-full space-y-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold font-bold text-xs uppercase tracking-[0.2em]">
              <Mic size={14} />
              <span>Vision 24 Originals</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none">
              {episode.title}
            </h2>
            <p className="text-white/60 text-sm md:text-base font-medium line-clamp-2">
              {episode.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group/progress">
              <div 
                className="absolute top-0 left-0 h-full gold-gradient rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity"
                style={{ left: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
              <span>12:45</span>
              <span>{episode.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center md:justify-start gap-8">
            <button className="text-white/40 hover:text-white transition-colors">
              <SkipBack size={28} fill="currentColor" />
            </button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center text-deep-blue shadow-xl shadow-gold/20"
            >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </motion.button>

            <button className="text-white/40 hover:text-white transition-colors">
              <SkipForward size={28} fill="currentColor" />
            </button>

            <div className="hidden lg:flex items-center gap-4 ml-auto">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Share2 size={20} />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <List size={20} />
              </button>
              <div className="flex items-center gap-2 text-white/60">
                <Volume2 size={20} />
                <div className="w-20 h-1 bg-white/10 rounded-full">
                  <div className="w-1/2 h-full bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
