
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MailOpen, ArrowRight, Heart } from 'lucide-react';
import { LOVE_NOTES } from '../constants';
import { playPop } from '../sfx';

interface LoveNotesProps {
  onComplete: () => void;
}

const LoveNotes: React.FC<LoveNotesProps> = ({ onComplete }) => {
  const [revealedIds, setRevealedIds] = useState<number[]>([]);

  const toggleNote = (id: number) => {
    if (!revealedIds.includes(id)) {
      setRevealedIds(prev => [...prev, id]);
      playPop();
    }
  };

  const allRevealed = revealedIds.length === LOVE_NOTES.length;

  return (
    <div className="space-y-10 w-full max-w-4xl px-6">
      <div className="text-center space-y-6">
        <div className="flex justify-center text-rose-600">
          <Heart size={40} fill="currentColor" />
        </div>
        <h2 className="text-5xl md:text-6xl font-playfair font-black text-slate-900 italic">Fragments of My Heart</h2>
        <p className="text-slate-700 font-bold text-sm tracking-[0.4em] uppercase">Read every letter to reveal the question.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {LOVE_NOTES.map((note, index) => {
          const isRevealed = revealedIds.includes(note.id);
          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              onClick={() => toggleNote(note.id)}
              data-sfx="click"
              className={`p-10 rounded-[2.5rem] cursor-pointer transition-all duration-700 relative min-h-[250px] flex items-center justify-center text-center border-4 overflow-hidden
                ${isRevealed 
                  ? 'glass-strong shadow-2xl border-white scale-105' 
                  : 'bg-white/80 border-white hover:bg-white hover:border-rose-100 shadow-sm'}
              `}
            >
              {!isRevealed ? (
                <div className="flex flex-col items-center gap-5 text-slate-400 group">
                  <Mail size={48} strokeWidth={1} className="group-hover:rotate-12 transition-transform duration-500 text-rose-300" />
                  <span className="text-xs font-black tracking-[0.3em] uppercase text-slate-500">Confidential</span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <MailOpen size={24} className="text-rose-600 mx-auto" strokeWidth={2} />
                  <p className="text-slate-800 font-playfair italic text-2xl md:text-3xl leading-relaxed font-medium">
                    "{note.message}"
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center pt-6">
        {allRevealed ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={onComplete}
            data-sfx="click"
            className="px-14 py-6 bg-slate-900 text-white rounded-full text-sm font-black tracking-[0.4em] uppercase shadow-2xl flex items-center gap-4 hover:bg-rose-700 transition-all"
          >
            The Moment of Truth <ArrowRight size={18} />
          </motion.button>
        ) : (
          <div className="text-slate-600 font-bold text-xs tracking-[0.5em] uppercase animate-pulse">
            Locked · {LOVE_NOTES.length - revealedIds.length} left to read
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveNotes;
