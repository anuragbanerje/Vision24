import React, { useState } from 'react';
import { X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleTitle: string;
  commentsCount: number;
}

export default function CommentModal({ isOpen, onClose, articleTitle, commentsCount }: CommentModalProps) {
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', user: 'Ananya Das', text: 'খুবই গুরুত্বপূর্ণ খবর। ধন্যবাদ শেয়ার করার জন্য।', date: '২ ঘণ্টা আগে' },
    { id: '2', user: 'Rahul Sen', text: 'এই বিষয়ে আরও বিস্তারিত জানতে চাই।', date: '৫ ঘণ্টা আগে' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: 'You',
      text: newComment,
      date: 'Just now'
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep-blue/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h3 className="font-bold text-xl tracking-tight line-clamp-1">{articleTitle}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{comments.length} Comments</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gold/20 flex items-center justify-center text-gold shrink-0">
                    <User size={20} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{comment.user}</span>
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{comment.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full pl-6 pr-14 py-4 bg-white border-none rounded-2xl shadow-inner focus:ring-2 focus:ring-gold transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-deep-blue text-white rounded-xl hover:scale-105 transition-transform"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
