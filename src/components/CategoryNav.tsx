import React from 'react';
import { motion } from 'motion/react';
import { NewsCategory } from '../types';

interface CategoryNavProps {
  selected: NewsCategory;
  onSelect: (category: NewsCategory) => void;
}

export default function CategoryNav({ selected, onSelect }: CategoryNavProps) {
  const categories: NewsCategory[] = ['Politics', 'Sports', 'Crime', 'National', 'Market', 'Jobs', 'Local'];

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`relative px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
            selected === category
              ? 'text-white'
              : 'text-gray-400 hover:text-deep-blue hover:bg-gray-100'
          }`}
        >
          {selected === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 blue-gradient rounded-2xl shadow-lg -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {category}
        </button>
      ))}
    </div>
  );
}
