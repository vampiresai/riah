
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Landing from './components/Landing';
import HeartCatcherGame from './components/HeartCatcherGame';
import MemoryGallery from './components/MemoryGallery';
import LoveNotes from './components/LoveNotes';
import FinalProposal from './components/FinalProposal';
import SparkleTrail from './components/SparkleTrail';
import Dashboard from './components/Dashboard';
import { AppStage } from './types';
import { playClick, setSfxEnabled } from './sfx';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('landing');
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Floating controls removed per request.

  const nextStage = () => {
    const sequence: AppStage[] = ['landing', 'proposal', 'game', 'gallery', 'notes', 'dashboard'];
    const currentIndex = sequence.indexOf(stage);
    if (currentIndex < sequence.length - 1) {
      setStage(sequence[currentIndex + 1]);
    }
  };

  const handleStartJourney = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => undefined);
    }
    nextStage();
  };

  useEffect(() => {
    setSfxEnabled(true);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: Event) => {
      const target = event.target as Element | null;
      if (!target) return;
      const clickable = target.closest('button, a, [data-sfx]');
      if (clickable) {
        playClick();
      }
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => undefined);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, []);

  return (
    <div className="min-h-screen text-slate-900 font-inter overflow-x-hidden relative app-shell">
      <audio ref={audioRef} src="/audio/lovers%20rock.mp3" preload="auto" loop />
      <div className="valentine-3d" />
      <LoadingScreen isVisible={isLoading} />
      <SparkleTrail />
      
      {/* Background Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="heart-particle text-rose-200/40"
            style={{
              '--duration': `${25 + Math.random() * 15}s`,
              '--left': `${Math.random() * 100}%`,
              '--delay': `${Math.random() * 5}s`
            } as any}
          >
            <Heart size={16 + Math.random() * 24} fill="currentColor" stroke="none" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className={`relative z-10 w-full ${stage === 'dashboard' ? '' : 'max-w-6xl mx-auto px-6 py-12 md:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]'}`}>
        <AnimatePresence mode="wait">
          {stage === 'landing' && <Landing onStart={handleStartJourney} key="landing" />}
          {stage === 'game' && <HeartCatcherGame onWin={nextStage} key="game" />}
          {stage === 'gallery' && <MemoryGallery onComplete={nextStage} key="gallery" />}
          {stage === 'notes' && <LoveNotes onComplete={nextStage} key="notes" />}
          {stage === 'proposal' && <FinalProposal key="proposal" onAccepted={nextStage} />}
          {stage === 'dashboard' && <Dashboard key="dashboard" />}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
