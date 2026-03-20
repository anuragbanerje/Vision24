import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlayCircle, Mic, User, Menu, Search, Bell, Send, Rss } from 'lucide-react';
import { motion } from 'motion/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: PlayCircle, label: 'Videos', path: '/videos' },
    { icon: Send, label: 'Publish', path: '/publish' },
    { icon: Rss, label: 'RSS', path: '/manage-rss' },
    { icon: Mic, label: 'Podcasts', path: '/podcasts' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-off-white">
      {/* Header */}
      <header className="sticky top-0 z-50 blue-gradient text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-full lg:hidden">
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-deep-blue font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter hidden sm:block">
                VISION <span className="text-gold">24</span>
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
              <input
                type="text"
                placeholder="Search news..."
                className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:bg-white/20 transition-all placeholder:text-white/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-white/10 rounded-full relative">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full border-2 border-deep-blue"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
              <User size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 pb-24 lg:pb-12">
        {children}
        
        {/* Footer Info for AdSense Compliance */}
        <footer className="mt-20 py-8 border-t border-gray-200 text-center space-y-4">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            © 2026 Vision 24 News Network. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/privacy" className="text-[10px] font-bold text-deep-blue uppercase tracking-widest hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-[10px] font-bold text-deep-blue uppercase tracking-widest hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </footer>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-deep-blue' : 'text-gray-400'
              }`}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`p-1 rounded-xl ${isActive ? 'bg-gold/20' : ''}`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <span className="text-[10px] font-medium uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop Sidebar (Optional, but let's keep it simple for now) */}
    </div>
  );
}
