import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GameMenu from './components/GameMenu';
import GameBoard from './components/GameBoard';

/**
 * App - Componente raiz que gerencia as fases do jogo.
 *
 * Fases: 'menu' → 'playing' → (win modal no GameBoard) → 'menu' | 'playing'
 */
const App = () => {
  const [phase, setPhase] = useState('menu'); // 'menu' | 'playing'
  const [difficulty, setDifficulty] = useState('easy');
  const [highScores, setHighScores] = useState([]);

  // Persiste recordes no localStorage – Heurística #1: Visibilidade
  useEffect(() => {
    const saved = localStorage.getItem('ods15_highscores');
    if (saved) {
      try {
        setHighScores(JSON.parse(saved));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const handleStart = (diff) => {
    setDifficulty(diff);
    setPhase('playing');
  };

  const handleHighScore = (newScore) => {
    setHighScores((prev) => {
      const updated = [...prev, newScore]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      localStorage.setItem('ods15_highscores', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="app-root">
      {phase === 'menu' && (
        <GameMenu onStart={handleStart} highScores={highScores} />
      )}
      {phase === 'playing' && (
        <GameBoard
          difficulty={difficulty}
          onMenu={() => setPhase('menu')}
          onHighScore={handleHighScore}
        />
      )}
    </div>
  );
};

export default App;
