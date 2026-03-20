import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Send, Image as ImageIcon, MapPin, Globe, CheckCircle2, AlertCircle, Type, Heading1, Heading2, AlignLeft, Maximize2, Minimize2, Palette, Play } from 'lucide-react';
import { db_local } from '../db';
import { NewsArticle } from '../types';

export default function PublishNews() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Vision 24 User');
  const [category, setCategory] = useState('Local');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Editor States
  const [fontSize, setFontSize] = useState('text-base');
  const [fontFamily, setFontFamily] = useState('font-sans');
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalContent = editorRef.current?.innerHTML || content;
    if (!title || !finalContent) return;

    setIsSubmitting(true);
    
    const newArticle: NewsArticle = {
      id: `local-${Date.now()}`,
      title,
      summary: finalContent.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      content: finalContent,
      author,
      category,
      publishedAt: new Date().toISOString(),
      source: 'Vision 24 Community',
      likes: 0,
      commentsCount: 0,
      imageUrl: imageUrl || `https://picsum.photos/seed/${Date.now()}/800/600`,
      videoUrl: videoUrl || undefined
    };

    try {
      await db_local.news.add({
        title: newArticle.title,
        link: '#',
        pubDate: newArticle.publishedAt,
        content: newArticle.content,
        contentSnippet: newArticle.summary,
        guid: newArticle.id,
        isoDate: newArticle.publishedAt,
        category: newArticle.category,
        image: newArticle.imageUrl,
        source: newArticle.source
      });
      
      setIsSuccess(true);
      setTitle('');
      if (editorRef.current) editorRef.current.innerHTML = '';
      setContent('');
      setImageUrl('');
      setVideoUrl('');
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error publishing news:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-8 px-4"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 blue-gradient rounded-2xl flex items-center justify-center text-gold shadow-lg">
          <Send size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">খবর প্রকাশ করুন</h1>
          <p className="text-gray-500 font-medium">Publish your news with rich formatting</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card rounded-[2.5rem] p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-4">
              শিরোনাম (Title)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="আপনার খবরের শিরোনাম লিখুন..."
              className="w-full bg-off-white/50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold transition-all text-xl font-bold"
              dir="auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-4">
                আপনার নাম (Author)
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-off-white/50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-4">
                বিভাগ (Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-off-white/50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold transition-all"
              >
                <option value="Local">Local (স্থানীয়)</option>
                <option value="Politics">Politics (রাজনীতি)</option>
                <option value="Sports">Sports (খেলাধুলা)</option>
                <option value="Entertainment">Entertainment (বিনোদন)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-4">
                অবস্থান (Location)
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="আপনার শহর..."
                  className="w-full bg-off-white/50 border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-gold transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-4">
                ছবির লিঙ্ক (Image URL)
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-off-white/50 border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-gold transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-4">
                ভিডিওর লিঙ্ক (Video URL)
              </label>
              <div className="relative">
                <Play className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="w-full bg-off-white/50 border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-gold transition-all"
                />
              </div>
            </div>
          </div>

          {/* Rich Text Toolbar */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-4">
              বিস্তারিত খবর (Rich Text Editor)
            </label>
            
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex flex-wrap items-center gap-1 p-3 bg-gray-50 border-b border-gray-100">
                <button type="button" onClick={() => execCommand('formatBlock', '<h1>')} className="p-2 hover:bg-gold/20 rounded-lg transition-colors" title="Heading 1"><Heading1 size={18} /></button>
                <button type="button" onClick={() => execCommand('formatBlock', '<h2>')} className="p-2 hover:bg-gold/20 rounded-lg transition-colors" title="Heading 2"><Heading2 size={18} /></button>
                <button type="button" onClick={() => execCommand('formatBlock', '<p>')} className="p-2 hover:bg-gold/20 rounded-lg transition-colors" title="Paragraph"><AlignLeft size={18} /></button>
                <div className="w-px h-6 bg-gray-200 mx-1"></div>
                
                <button type="button" onClick={() => setFontSize('text-sm')} className={`p-2 rounded-lg transition-colors ${fontSize === 'text-sm' ? 'bg-gold text-deep-blue' : 'hover:bg-gold/20'}`} title="Small Text"><Minimize2 size={18} /></button>
                <button type="button" onClick={() => setFontSize('text-base')} className={`p-2 rounded-lg transition-colors ${fontSize === 'text-base' ? 'bg-gold text-deep-blue' : 'hover:bg-gold/20'}`} title="Normal Text"><Type size={18} /></button>
                <button type="button" onClick={() => setFontSize('text-xl')} className={`p-2 rounded-lg transition-colors ${fontSize === 'text-xl' ? 'bg-gold text-deep-blue' : 'hover:bg-gold/20'}`} title="Large Text"><Maximize2 size={18} /></button>
                
                <div className="w-px h-6 bg-gray-200 mx-1"></div>
                
                <select 
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest focus:ring-0 cursor-pointer"
                >
                  <option value="font-sans">Sans Serif</option>
                  <option value="font-serif">Serif (Classic)</option>
                  <option value="font-mono">Monospace</option>
                </select>

                <div className="w-px h-6 bg-gray-200 mx-1"></div>
                
                <button type="button" onClick={() => execCommand('bold')} className="p-2 hover:bg-gold/20 rounded-lg font-bold">B</button>
                <button type="button" onClick={() => execCommand('italic')} className="p-2 hover:bg-gold/20 rounded-lg italic">I</button>
                <button type="button" onClick={() => execCommand('underline')} className="p-2 hover:bg-gold/20 rounded-lg underline">U</button>
              </div>

              <div 
                ref={editorRef}
                contentEditable
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
                className={`w-full min-h-[300px] p-8 focus:outline-none leading-relaxed prose prose-sm max-w-none ${fontSize} ${fontFamily}`}
                placeholder="বিস্তারিত খবর এখানে লিখুন..."
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl transition-all">
              <Globe size={20} />
              <span>ভাষা পরিবর্তন (Change Language)</span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full blue-gradient text-gold font-bold py-5 rounded-3xl shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSuccess ? (
            <>
              <CheckCircle2 size={24} />
              <span>সফলভাবে প্রকাশিত হয়েছে!</span>
            </>
          ) : (
            <>
              <Send size={24} />
              <span>খবর প্রকাশ করুন (Publish Now)</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-12 p-6 bg-gold/10 rounded-3xl border border-gold/20">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gold mb-2 flex items-center gap-2">
          <AlertCircle size={16} />
          নির্দেশিকা (Guidelines)
        </h3>
        <ul className="text-xs text-gray-500 space-y-2 list-disc pl-4">
          <li>আপনার খবরটি বাংলা, হিন্দি বা ইংরেজি যেকোনো ভাষায় লিখতে পারেন।</li>
          <li>সঠিক তথ্য প্রদান করুন এবং কোনো বিভ্রান্তিকর খবর ছড়াবেন না।</li>
          <li>খবরটি প্রকাশিত হওয়ার পর সরাসরি হোম পেজে দেখা যাবে।</li>
        </ul>
      </div>
    </motion.div>
  );
}
