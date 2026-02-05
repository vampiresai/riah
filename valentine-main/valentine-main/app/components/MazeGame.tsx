import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const MAZE_LAYOUT = [
  '################',
  '#S.....#.......#',
  '#.###.###.###..#',
  '#...#.....#....#',
  '###.#.#####.####',
  '#...#...#......#',
  '#.#####.#.####.#',
  '#.....#.#.#....#',
  '#.###.#.#.#.##.#',
  '#.#...#...#..#.#',
  '#.#.#######.#..#',
  '#...#.....#.#G.#',
  '################'
];

type CellType = 'wall' | 'path' | 'start' | 'goal';

const MazeGame: React.FC = () => {
  const maze = useMemo(() => MAZE_LAYOUT.map(row => row.split('')), []);
  const rows = maze.length;
  const cols = maze[0].length;

  const start = useMemo(() => {
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        if (maze[y][x] === 'S') return { x, y };
      }
    }
    return { x: 1, y: 1 };
  }, [cols, rows, maze]);

  const goal = useMemo(() => {
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        if (maze[y][x] === 'G') return { x, y };
      }
    }
    return { x: cols - 2, y: rows - 2 };
  }, [cols, rows, maze]);

  const titanPath = useMemo(() => {
    const candidates: { x: number; y: number }[] = [];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        if (maze[y][x] === '#') continue;
        if (x === goal.x && y === goal.y) continue;
        if (x === start.x && y === start.y) continue;
        const distToGoal = Math.abs(goal.x - x) + Math.abs(goal.y - y);
        const distToStart = Math.abs(start.x - x) + Math.abs(start.y - y);
        if (distToGoal < 2 || distToGoal > 4) continue;
        if (distToStart < 6) continue;
        candidates.push({ x, y });
      }
    }
    return candidates.length > 0 ? candidates : [{ x: Math.max(goal.x - 2, 1), y: goal.y }];
  }, [cols, rows, maze, goal, start]);

  const [position, setPosition] = useState(start);
  const [isWin, setIsWin] = useState(false);
  const [hitTitan, setHitTitan] = useState(false);
  const [titanIndex, setTitanIndex] = useState(0);

  const isWall = useCallback(
    (x: number, y: number) => maze[y][x] === '#',
    [maze]
  );

  const titan = titanPath[titanIndex % titanPath.length];

  const isTitanGuarded = useCallback(
    (x: number, y: number) => x === titan.x && y === titan.y,
    [titan]
  );

  const reset = () => {
    setPosition(start);
    setIsWin(false);
    setHitTitan(false);
    setTitanIndex(0);
  };

  const tryMove = useCallback(
    (dx: number, dy: number) => {
      if (isWin) return;
      const nextX = position.x + dx;
      const nextY = position.y + dy;
      if (nextX < 0 || nextY < 0 || nextX >= cols || nextY >= rows) return;
      if (isWall(nextX, nextY)) return;
      if (isTitanGuarded(nextX, nextY)) {
        setPosition(start);
        setIsWin(false);
        setHitTitan(true);
        return;
      }
      setHitTitan(false);
      setPosition({ x: nextX, y: nextY });
    },
    [cols, rows, isWall, isTitanGuarded, position, isWin, start]
  );

  useEffect(() => {
    if (position.x === goal.x && position.y === goal.y) {
      setIsWin(true);
    }
  }, [position, goal]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTitanIndex((prev) => (prev + 1) % titanPath.length);
    }, 650);
    return () => window.clearInterval(interval);
  }, [titanPath.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === 'arrowup' || key === 'w') tryMove(0, -1);
      if (key === 'arrowdown' || key === 's') tryMove(0, 1);
      if (key === 'arrowleft' || key === 'a') tryMove(-1, 0);
      if (key === 'arrowright' || key === 'd') tryMove(1, 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tryMove]);

  const tileSize = 'clamp(28px, 4vw, 46px)';

  const getCellType = (value: string): CellType => {
    if (value === '#') return 'wall';
    if (value === 'S') return 'start';
    if (value === 'G') return 'goal';
    return 'path';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-playfair italic text-slate-900">Maze to My Heart</h2>
        <p className="text-slate-700 text-sm tracking-widest uppercase">
          Guide Riah to Nikhil with the arrow keys or WASD.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 soft-card overflow-hidden">
        <div
          className="grid gap-1 justify-center"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${tileSize})`,
            gridTemplateRows: `repeat(${rows}, ${tileSize})`
          }}
        >
          {maze.map((row, y) =>
            row.map((cell, x) => {
              const cellType = getCellType(cell);
              const isPlayer = position.x === x && position.y === y;
              const isGoal = goal.x === x && goal.y === y;
              const isTitan = titan.x === x && titan.y === y;

              return (
                <div
                  key={`${x}-${y}`}
                  className="relative rounded-md bg-white/70 overflow-hidden"
                  style={{
                    width: tileSize,
                    height: tileSize,
                    backgroundImage:
                      cellType === 'wall'
                        ? "url('/images/block.jpeg')"
                        : "url('/images/grass.jpeg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {isGoal && (
                    <img
                      src="/images/nikhil.png"
                      alt="Nikhil"
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable={false}
                    />
                  )}
                  {isTitan && (
                    <img
                      src="/images/titan.png"
                      alt="Titan"
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable={false}
                    />
                  )}
                  {isPlayer && (
                    <motion.img
                      src="/images/riah.png"
                      alt="Riah"
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable={false}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {isWin && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-6">
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl border border-slate-100 text-center space-y-6 max-w-md w-full">
            <img
              src="/images/win.png"
              alt="You win"
              className="w-28 h-28 mx-auto drop-shadow-xl"
              draggable={false}
            />
            <div className="space-y-2">
              <h3 className="text-3xl font-playfair font-black text-slate-900">You made it!</h3>
              <p className="text-slate-600 text-sm font-bold tracking-[0.2em] uppercase">
                Play again?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                data-sfx="click"
                className="px-8 py-4 bg-slate-900 text-white rounded-full text-xs font-black tracking-[0.3em] uppercase hover:bg-rose-600 transition-all shadow-xl"
              >
                Play Again
              </button>
              <button
                onClick={() => setIsWin(false)}
                data-sfx="click"
                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full text-xs font-black tracking-[0.3em] uppercase hover:bg-slate-50 transition-all shadow-sm"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
      {hitTitan && !isWin && (
        <div className="text-center text-rose-600 text-xs font-bold tracking-[0.3em] uppercase">
          The titan is roaming. Time your move.
        </div>
      )}
    </div>
  );
};

export default MazeGame;
