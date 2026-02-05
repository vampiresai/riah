
import React, { useState, useEffect } from 'react';
import { TARGET_DATE } from '../constants';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{days:number, hours:number, minutes:number, seconds:number} | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE.getTime() - now;

      if (distance < 0) {
        setTimeLeft(null);
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return <span className="tracking-widest text-slate-800 font-bold">Valentine's Day Has Arrived! ❤️</span>;

  return (
    <div className="flex gap-6 font-inter text-xs tracking-[0.2em]">
      <div className="flex flex-col items-center">
        <span className="text-rose-700 font-black text-lg">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="text-[10px] text-slate-700 font-bold uppercase">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-rose-700 font-black text-lg">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[10px] text-slate-700 font-bold uppercase">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-rose-700 font-black text-lg">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-[10px] text-slate-700 font-bold uppercase">Mins</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-rose-700 font-black text-lg">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-[10px] text-slate-700 font-bold uppercase">Secs</span>
      </div>
    </div>
  );
};

export default Countdown;
