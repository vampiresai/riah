
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Camera } from 'lucide-react';
import { MEMORIES } from '../constants';
import { Memory } from '../types';

interface MemoryGalleryProps {
  onComplete: () => void;
}

const MemoryGallery: React.FC<MemoryGalleryProps> = ({ onComplete }) => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <div className="space-y-8 w-full">
      <div className="text-center space-y-4">
        <div className="flex justify-center text-rose-300">
          <Camera size={32} strokeWidth={1} />
        </div>
        <h2 className="text-4xl md:text-5xl font-playfair italic text-slate-800 dark:text-rose-50">Moments Frozen in Time</h2>
        <p className="text-slate-400 dark:text-rose-300 text-sm tracking-widest uppercase">Click each frame to read a fragment of our story.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {MEMORIES.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedMemory(memory)}
            data-sfx="click"
            className="aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-2xl relative group border border-white/60 soft-card"
          >
            <img 
              src={memory.imageUrl} 
              alt="Memory" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-500" />
            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transition-transform text-xs tracking-widest uppercase">
              View Memory
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <motion.button
          onClick={onComplete}
          data-sfx="click"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center gap-3 px-12 py-5 bg-slate-900 text-white rounded-full text-sm font-bold tracking-[0.35em] uppercase overflow-hidden shadow-2xl transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-3">
            Continue Our Story
            <ArrowRight size={16} className="text-rose-300 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        </motion.button>
      </div>

      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md"
            data-sfx="click"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-strong rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl relative border border-white/20"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedMemory(null)}
                data-sfx="click"
                className="absolute top-6 right-6 p-2 bg-white/40 hover:bg-white/70 rounded-full transition-colors z-10 text-slate-800"
              >
                <X size={20} />
              </button>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img src={selectedMemory.imageUrl} alt="Selected" className="w-full h-full object-cover min-h-[300px]" />
                </div>
                <div className="md:w-1/2 p-10 flex flex-col items-center justify-center text-center bg-romantic-blush dark:bg-slate-800 space-y-6">
                  <img
                    src={selectedMemory.totemImageUrl}
                    alt={selectedMemory.totemLabel}
                    className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-xl"
                    draggable={false}
                  />
                  <div className="space-y-2">
                    <p className="text-xs font-black tracking-[0.3em] uppercase text-rose-500">
                      Totem unlocked
                    </p>
                    <p className="text-2xl md:text-3xl font-playfair italic text-slate-700 dark:text-rose-100 leading-relaxed">
                      {selectedMemory.totemLabel}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryGallery;
