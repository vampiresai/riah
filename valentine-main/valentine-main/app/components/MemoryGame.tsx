
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Music, Camera, Coffee, Sun, Cloud, Moon } from 'lucide-react';
import { playPop, playSuccess } from '../sfx';

interface MemoryGameProps {
  onWin: () => void;
}

const ICONS = [Heart, Star, Music, Camera, Coffee, Sun, Cloud, Moon];

interface Card {
  id: number;
  iconIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onWin }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const initialCards: Card[] = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((_, index, array) => {
        const iconIndex = ICONS.findIndex(icon => icon === array[index]);
        return {
          id: index,
          iconIndex,
          isFlipped: false,
          isMatched: false,
        };
      });
    setCards(initialCards);
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    playPop();

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      const [first, second] = newFlipped;

      if (cards[first].iconIndex === cards[second].iconIndex) {
        // Match found
        setTimeout(() => {
          setCards(prev => {
            const updated = [...prev];
            updated[first].isMatched = true;
            updated[second].isMatched = true;
            return updated;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => {
            const updated = [...prev];
            updated[first].isFlipped = false;
            updated[second].isFlipped = false;
            return updated;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const isGameWon = cards.length > 0 && cards.every(card => card.isMatched);

  useEffect(() => {
    if (isGameWon) {
      playSuccess();
      setTimeout(onWin, 1500);
    }
  }, [isGameWon, onWin]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-playfair italic text-slate-800">Matching the Small Things</h2>
        <p className="text-slate-400 text-sm tracking-widest uppercase">Find the pairs that remind me of us.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 p-4 glass rounded-3xl aspect-square md:aspect-video soft-card">
        {cards.map((card, index) => {
          const Icon = ICONS[card.iconIndex];
          return (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(index)}
              data-sfx="click"
              className="relative cursor-pointer perspective-1000"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`w-full h-full rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm border
                  ${card.isFlipped || card.isMatched ? 'bg-white border-rose-100 rotate-y-180' : 'bg-rose-50 border-white/50'}
                `}
                animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
              >
                {card.isFlipped || card.isMatched ? (
                  <div className="rotate-y-180">
                    <Icon className="text-rose-400" size={32} strokeWidth={1.5} />
                  </div>
                ) : (
                  <Heart size={20} className="text-rose-200" fill="currentColor" />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {isGameWon && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-rose-500 font-medium tracking-widest uppercase text-sm animate-pulse"
          >
            Perfect Match Found...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryGame;
