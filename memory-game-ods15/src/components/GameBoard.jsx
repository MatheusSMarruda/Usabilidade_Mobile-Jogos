import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import ScoreBoard from './ScoreBoard';
import WinModal from './WinModal';
import { createShuffledDeck, getDifficultyConfig } from '../data/animals';

/**
 * GameBoard - Componente principal do jogo da memória.
 *
 * Heurísticas de Nielsen aplicadas:
 * - #1 Visibilidade do status: timer + movimentos em tempo real
 * - #3 Controle e liberdade: reiniciar e voltar ao menu a qualquer momento
 * - #5 Prevenção de erros: bloqueia cliques durante animação e em cartas já viradas
 * - #6 Reconhecimento em vez de memorização: cartas pareadas ficam visíveis
 * - #8 Estética minimalista: grade limpa e focada
 */
const GameBoard = ({ difficulty, onMenu, onHighScore }) => {
  const config = getDifficultyConfig(difficulty);

  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);       // UIDs das 2 cartas viradas no turno atual
  const [matched, setMatched] = useState(new Set()); // IDs dos pares encontrados
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isChecking, setIsChecking] = useState(false); // bloqueia cliques durante animação
  const [gameWon, setGameWon] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  // ───── Inicializa o tabuleiro ─────
  const initGame = useCallback(() => {
    setDeck(createShuffledDeck(config.pairs));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setSeconds(0);
    setIsChecking(false);
    setGameWon(false);
    setShowRestartConfirm(false);
  }, [config.pairs]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // ───── Timer – useEffect com cleanup ─────
  useEffect(() => {
    if (gameWon) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [gameWon]);

  // ───── Lógica de comparação de cartas ─────
  useEffect(() => {
    if (flipped.length !== 2) return;

    setIsChecking(true);
    setMoves((m) => m + 1);

    const [uid1, uid2] = flipped;
    const card1 = deck.find((c) => c.uid === uid1);
    const card2 = deck.find((c) => c.uid === uid2);

    if (card1.id === card2.id) {
      // Par encontrado
      setMatched((prev) => {
        const next = new Set(prev);
        next.add(card1.id);
        return next;
      });
      setFlipped([]);
      setIsChecking(false);
    } else {
      // Não corresponde — vira de volta após 1s
      const timeout = setTimeout(() => {
        setFlipped([]);
        setIsChecking(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [flipped, deck]);

  // ───── Detecção de vitória ─────
  useEffect(() => {
    if (deck.length > 0 && matched.size === config.pairs) {
      setGameWon(true);
    }
  }, [matched, config.pairs, deck.length]);

  // ───── Cálculo da pontuação ─────
  const calculateScore = () => {
    const base = config.pairs * 100;
    const timePenalty = Math.floor(seconds / 5) * 5;
    const movePenalty = Math.max(0, moves - config.pairs) * 10;
    const diffBonus = difficulty === 'hard' ? 200 : difficulty === 'medium' ? 100 : 0;
    return Math.max(0, base - timePenalty - movePenalty + diffBonus);
  };

  // ───── Handler de clique em carta ─────
  const handleCardClick = (uid) => {
    if (isChecking) return;
    if (flipped.includes(uid)) return;
    if (flipped.length === 2) return;
    setFlipped((prev) => [...prev, uid]);
  };

  // ───── Reiniciar com confirmação – Heurística #5: Prevenção de Erros ─────
  const handleRestartClick = () => {
    if (moves === 0) {
      initGame();
    } else {
      setShowRestartConfirm(true);
    }
  };

  const matchedAnimalsData = deck
    .filter((c) => matched.has(c.id))
    .reduce((acc, c) => {
      if (!acc.find((a) => a.id === c.id)) acc.push(c);
      return acc;
    }, []);

  return (
    <div className="game-board-container container-fluid py-3">
      {/* ScoreBoard */}
      <ScoreBoard
        moves={moves}
        seconds={seconds}
        matched={matched.size}
        total={config.pairs}
        difficulty={difficulty}
        onRestart={handleRestartClick}
        onMenu={onMenu}
      />

      {/* Confirmação de reinício – Heurística #5: Prevenção de erros */}
      {showRestartConfirm && (
        <div className="alert alert-warning d-flex align-items-center justify-content-between mb-3" role="alert">
          <span>⚠️ Tem certeza que deseja reiniciar? Seu progresso será perdido.</span>
          <div className="d-flex gap-2 ms-3">
            <button className="btn btn-warning btn-sm" onClick={initGame}>
              Sim, reiniciar
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowRestartConfirm(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Grade de cartas */}
      <div
        className={`cards-grid cols-${config.cols}`}
        role="grid"
        aria-label={`Tabuleiro do jogo da memória — ${config.pairs} pares`}
      >
        {deck.map((animal) => (
          <Card
            key={animal.uid}
            animal={animal}
            isFlipped={flipped.includes(animal.uid)}
            isMatched={matched.has(animal.id)}
            onClick={handleCardClick}
            disabled={isChecking}
          />
        ))}
      </div>

      {/* Modal de vitória */}
      {gameWon && (
        <WinModal
          result={{
            score: calculateScore(),
            moves,
            seconds,
            difficulty,
            matchedAnimals: matchedAnimalsData,
          }}
          onPlayAgain={() => {
            onHighScore({ score: calculateScore(), moves, seconds: seconds, difficulty });
            initGame();
          }}
          onMenu={() => {
            onHighScore({ score: calculateScore(), moves, seconds: seconds, difficulty });
            onMenu();
          }}
        />
      )}
    </div>
  );
};

export default GameBoard;
