
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Image as ImageIcon,
  Calendar,
  Clock,
  MessageSquare,
  Gift,
  Sparkles,
  Map
} from 'lucide-react';
import { MEMORIES, TIMELINE, LOVE_NOTES } from '../constants';
import MazeGame from './MazeGame';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'gallery' | 'timeline' | 'gifts' | 'maze'>('home');
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [flippedMemories, setFlippedMemories] = useState<number[]>([]);
  const gifts = [1, 2, 3, 4, 5];

  const toggleGift = (id: number) => {
    setOpenedGifts((prev) => (prev.includes(id) ? prev.filter((gift) => gift !== id) : [...prev, id]));
  };

  const toggleMemoryFlip = (id: number) => {
    setFlippedMemories((prev) => (prev.includes(id) ? prev.filter((mem) => mem !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      {/* Top Navigation */}
      <nav className="w-full bg-white/95 border-b border-slate-100 flex items-center justify-between py-4 px-6 z-50 sticky top-0 shadow-xl">
        <div className="text-rose-600 flex items-center justify-center">
          <Heart fill="currentColor" size={32} />
        </div>
        <div className="flex items-center gap-6 md:gap-10">
          <NavIcon active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<MessageSquare size={24} />} label="Wall" />
          <NavIcon active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon={<ImageIcon size={24} />} label="Gallery" />
          <NavIcon active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} icon={<Calendar size={24} />} label="Events" />
          <NavIcon active={activeTab === 'gifts'} onClick={() => setActiveTab('gifts')} icon={<Gift size={24} />} label="Gifts" />
          <NavIcon active={activeTab === 'maze'} onClick={() => setActiveTab('maze')} icon={<Map size={24} />} label="Maze" />
        </div>
        <div className="w-8" />
      </nav>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-14">
        <div className="rounded-[2.5rem] p-6 md:p-10 lg:p-12 bg-white/95 shadow-xl border border-slate-100">
        <header className="mb-10 border-b border-slate-100 pb-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-playfair font-black text-slate-900 mb-4 tracking-tight">Welcome Home, Riah.</h1>
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-rose-600 rounded-full" />
              <p className="text-slate-700 font-bold uppercase tracking-[0.3em] text-xs">Our Official Valentine Dashboard</p>
            </div>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="bg-white rounded-[2rem] p-8 border border-rose-100 shadow-xl soft-card flex flex-col md:flex-row items-center gap-6">
                <div className="shrink-0">
                  <img
                    src="/images/lillies.png"
                    alt="Spider lillies trophy"
                    className="w-20 h-20 drop-shadow-2xl"
                    draggable={false}
                  />
                </div>
                <div className="text-center md:text-left space-y-2">
                  <h3 className="text-2xl font-playfair font-black text-slate-900">Trophy Unlocked</h3>
                  <p className="text-slate-700 text-sm font-bold tracking-[0.2em] uppercase">
                    Spider lillies champion
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {LOVE_NOTES.map((note) => (
                  <div key={note.id} className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 relative group transition-all hover:-translate-y-1 soft-card">
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center text-white shadow-lg">
                      <Heart size={20} fill="currentColor" />
                    </div>
                    <p className="text-2xl font-playfair italic text-slate-900 leading-relaxed font-medium">"{note.message}"</p>
                    <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Personal Note</span>
                      <Sparkles size={14} className="text-rose-400" />
                    </div>
                  </div>
                ))}
                <div className="min-h-[250px] flex items-center justify-center">
                  <img
                    src="/images/cupid1.png"
                    alt="Cupid"
                    className="w-48 h-48 md:w-64 md:h-64 drop-shadow-xl object-contain"
                    draggable={false}
                    loading="eager"
                  />
                </div>
                <div className="min-h-[250px] flex items-center justify-center text-center px-6">
                  <p className="text-slate-800 text-xl md:text-2xl font-playfair italic leading-relaxed">
                    “Love is made of a single soul inhabiting two bodies.”
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {MEMORIES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => toggleMemoryFlip(m.id)}
                  data-sfx="click"
                  className="relative aspect-[3/4] rounded-[2.5rem] shadow-2xl border-8 border-white focus:outline-none"
                >
                  <div className={`flip-card ${flippedMemories.includes(m.id) ? 'is-flipped' : ''}`}>
                    <div className="flip-inner">
                      <div className="flip-face flip-front">
                        <img src={m.imageUrl} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent p-8 flex items-end">
                          <p className="text-white text-lg md:text-xl font-playfair italic leading-tight">
                            {m.quote}
                          </p>
                        </div>
                      </div>
                      <div className="flip-face flip-back bg-rose-50 flex flex-col items-center justify-center p-8 text-center">
                        <img
                          src={m.totemImageUrl}
                          alt={m.totemLabel}
                          className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-xl"
                          draggable={false}
                        />
                        <p className="mt-4 text-xs font-black tracking-[0.3em] uppercase text-rose-500">
                          Totem unlocked
                        </p>
                        <p className="text-xl md:text-2xl font-playfair italic text-slate-700">
                          {m.totemLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {activeTab === 'timeline' && (
            <motion.div key="timeline" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-3xl mx-auto py-10">
              {TIMELINE.map((event, idx) => (
                <div key={event.id} className="flex gap-10 mb-12 relative group">
                  {idx !== TIMELINE.length - 1 && <div className="absolute left-[31px] top-16 bottom-[-80px] w-1 bg-slate-100 rounded-full group-hover:bg-rose-100 transition-colors" />}
                  <div className="w-16 h-16 rounded-3xl bg-slate-900 text-white flex items-center justify-center shadow-2xl relative z-10 shrink-0 group-hover:bg-rose-600 transition-colors duration-500">
                    <Sparkles size={24} />
                  </div>
                  <div className="space-y-4 pt-1">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-rose-700 uppercase tracking-[0.3em] bg-rose-50 px-3 py-1 rounded-full">{event.date}</span>
                      <div className="h-px w-8 bg-slate-200" />
                    </div>
                    <h3 className="text-4xl font-playfair font-black text-slate-900">{event.title}</h3>
                    <p className="text-slate-700 text-lg leading-relaxed max-w-xl">{event.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'gifts' && (
            <motion.div key="gifts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-5xl mx-auto space-y-10">
              <div className="text-center space-y-3">
                <h2 className="text-4xl md:text-5xl font-playfair font-black text-slate-900">Gifts of Love</h2>
                <p className="text-slate-600 text-sm font-bold tracking-[0.3em] uppercase">Tap a gift to reveal the prize.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {gifts.map((giftId) => {
                  const isOpen = openedGifts.includes(giftId);
                  return (
                    <button
                      key={giftId}
                      onClick={() => toggleGift(giftId)}
                      data-sfx="click"
                      className="relative bg-white rounded-[2rem] p-8 shadow-xl border border-rose-100 hover:-translate-y-1 transition-all group min-h-[240px] flex items-center justify-center"
                    >
                      <img
                        src={isOpen ? `/images/prize${giftId}.png` : '/images/giftbox.png'}
                        alt={isOpen ? `Prize ${giftId}` : 'Gift box'}
                        className="w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-xl"
                        draggable={false}
                      />
                      {!isOpen && (
                        <span className="absolute bottom-6 text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                          Open
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'maze' && (
            <motion.div key="maze" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <MazeGame />
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

interface NavIconProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavIcon: React.FC<NavIconProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    data-sfx="click"
    className={`flex flex-col items-center gap-2 transition-all group ${active ? 'text-rose-700' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <div className={`p-4 rounded-[1.2rem] transition-all duration-300 ${active ? 'bg-rose-50 shadow-md shadow-rose-100 scale-110' : 'hover:bg-slate-50'}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-black uppercase tracking-[0.1em] transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}>
      {label}
    </span>
  </button>
);

export default Dashboard;
