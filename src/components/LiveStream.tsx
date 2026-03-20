import React from 'react';
import { Play, Radio, Users, Eye, Share2, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

export default function LiveStream() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-[2.5rem] overflow-hidden group shadow-2xl bg-black aspect-video md:aspect-[21/9]"
    >
      {/* Mock Video Placeholder */}
      <img
        src="https://picsum.photos/seed/news-live/1920/1080"
        alt="Live Stream"
        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
        referrerPolicy="no-referrer"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40"></div>

      {/* Live Badge */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse shadow-lg shadow-red-600/20">
          <Radio size={12} />
          <span className="uppercase tracking-[0.2em]">Live Now</span>
        </div>
        <div className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
          <Eye size={12} />
          <span className="uppercase tracking-[0.2em]">12.4K Watching</span>
        </div>
      </div>

      {/* Controls Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/30 shadow-2xl"
        >
          <Play size={32} fill="currentColor" className="ml-1" />
        </motion.button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-[0.2em]">
            <Radio size={14} />
            <span>Vision 24 Live Broadcasting</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tighter leading-none">
            West Bengal Election Updates: Live from Kolkata
          </h2>
          <div className="flex items-center gap-4 text-white/60 text-xs font-medium uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <Users size={14} />
              <span>Kolkata Bureau</span>
            </div>
            <span>•</span>
            <span>Started 45m ago</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all border border-white/10">
            <Share2 size={20} />
          </button>
          <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all border border-white/10">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
