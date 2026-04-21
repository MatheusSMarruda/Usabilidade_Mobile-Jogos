// GameBoard.jsx — Tela do tabuleiro com visual pixel-art RPG.
// Lógica de jogo 100% preservada do original; UI substituída pelo novo design.

import { useState, useEffect, useCallback } from 'react';
import WinModal from './WinModal';
import { CardSprite, CardBack } from './CardSprites';
import { createShuffledDeck, getDifficultyConfig } from '../data/animals';
import '../pixel-art.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DIFF_LABELS = { easy: 'FÁCIL', medium: 'MÉDIO', hard: 'DIFÍCIL' };

function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// ─── Sub-componentes visuais ───────────────────────────────────────────────────

function HudStat({ icon, label, value, color = 'var(--amber)' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 14px',
      background: 'var(--ink)',
      border: '3px solid var(--ink)',
      boxShadow: 'inset 0 0 0 2px var(--brown-1), 3px 3px 0 var(--brown-3)',
      minWidth: 100,
    }}>
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      <div>
        <div className="pa-title" style={{ fontSize: 7, color: 'var(--olive-1)', letterSpacing: '0.1em', marginBottom: 2 }}>
          {label}
        </div>
        <div className="pa-title" style={{ fontSize: 13, color }}>
          {value}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ current, total }) {
  const pct = Math.min(100, (current / total) * 100);
  return (
    <div style={{
      background: 'var(--ink)',
      border: '3px solid var(--ink)',
      boxShadow: 'inset 0 0 0 2px var(--brown-1), 3px 3px 0 var(--brown-3)',
      padding: 6,
      minWidth: 200,
    }}>
      <div className="pa-title" style={{ fontSize: 7, color: 'var(--olive-1)', marginBottom: 4, letterSpacing: '0.1em' }}>
        PROGRESSO · {current}/{total} PARES
      </div>
      <div style={{
        height: 12,
        background: 'var(--brown-3)',
        border: '2px solid var(--brown-1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: 0,
          width: `${pct}%`,
          background: 'repeating-linear-gradient(90deg, var(--orange-1) 0 4px, var(--orange-2) 4px 8px)',
          transition: 'width 0.3s',
        }} />
      </div>
    </div>
  );
}

function GameHud({ pairs, totalPairs, time, moves, difficulty, onRestart, onHome }) {
  return (
    <div style={{
      position: 'relative', zIndex: 10,
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '14px 20px',
      flexWrap: 'wrap',
      background: 'linear-gradient(180deg, rgba(10,15,10,0.75) 0%, transparent 100%)',
    }}>
      <ProgressBar current={pairs} total={totalPairs} />

      <HudStat
        label="TEMPO"
        value={time}
        icon={<div style={{ width: 14, height: 14, background: 'var(--amber)', border: '2px solid var(--orange-2)', borderRadius: '50%', boxShadow: 'inset 1px 1px 0 #fff4c4' }} />}
      />

      <HudStat
        label="MOVIMENTOS"
        value={moves}
        icon={<div style={{ width: 12, height: 12, background: 'var(--olive-1)', border: '2px solid var(--olive-3)' }} />}
      />

      <div style={{
        padding: '8px 14px',
        background: 'var(--red-leaf)',
        border: '3px solid var(--ink)',
        boxShadow: 'inset 0 0 0 2px #d94a2a, 3px 3px 0 var(--brown-3)',
      }}>
        <div className="pa-title" style={{ fontSize: 11, color: 'var(--cream)', letterSpacing: '0.08em' }}>
          {difficulty}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <button className="rpg-btn orange" style={{ fontSize: 9, padding: '8px 12px' }} onClick={onRestart}>
        ↻ REINICIAR
      </button>
      <button className="rpg-btn" style={{ fontSize: 9, padding: '8px 12px' }} onClick={onHome}>
        ⌂ MENU
      </button>
    </div>
  );
}

function MemoryCard({ card, isFlipped, isMatched, onClick, disabled }) {
  const state = isMatched ? 'matched' : isFlipped ? 'revealed' : 'hidden';
  const isRevealed = state === 'revealed' || state === 'matched';

  const handleClick = () => {
    if (!disabled && state === 'hidden') onClick(card.uid);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      aria-label={isRevealed ? `Carta: ${card.name}` : 'Carta virada para baixo'}
      aria-pressed={isRevealed}
      tabIndex={disabled || isMatched ? -1 : 0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      style={{
        width: 104, height: 128,
        position: 'relative',
        cursor: state === 'hidden' ? 'pointer' : 'default',
        transition: 'transform 0.15s',
      }}
      onMouseEnter={(e) => { if (state === 'hidden') e.currentTarget.style.transform = 'translate(-2px,-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
    >
      <div style={{
        width: '100%', height: '100%',
        background: isMatched ? 'var(--amber)' : 'var(--cream)',
        border: '4px solid var(--ink)',
        boxShadow: isMatched
          ? 'inset 0 0 0 3px #ffd87a, inset 0 0 0 6px var(--gold), 5px 5px 0 var(--ink)'
          : 'inset 0 0 0 3px var(--cream-2), inset 0 0 0 6px var(--parchment), 5px 5px 0 var(--ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        gap: 4,
        padding: 8,
        boxSizing: 'border-box',
      }}>
        {isRevealed ? (
          <>
            <CardSprite animal={card.pixelId} size={4} />
            <div className="pa-title" style={{ fontSize: 6, color: 'var(--brown-3)', letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.4 }}>
              {card.name.toUpperCase()}
            </div>
            {isMatched && (
              <div style={{
                position: 'absolute', top: 4, right: 4,
                background: 'var(--olive-2)', color: 'var(--cream)',
                border: '2px solid var(--ink)',
                width: 18, height: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10,
              }}>✓</div>
            )}
          </>
        ) : (
          <CardBack size={3} />
        )}
      </div>
    </div>
  );
}

// ─── Diálogo de confirmação de reinício ────────────────────────────────────────

function RestartConfirmDialog({ onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.75)',
    }}>
      <div className="rpg-window" style={{ maxWidth: 380, textAlign: 'center', padding: '28px 32px' }}>
        <div className="pa-title" style={{ fontSize: 12, color: 'var(--orange-1)', marginBottom: 14 }}>
          REINICIAR JOGO?
        </div>
        <div className="pa-body" style={{ color: 'var(--brown-3)', marginBottom: 22, fontSize: 20 }}>
          Seu progresso atual será perdido.
        </div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <button className="rpg-btn orange" onClick={onConfirm}>
            SIM
          </button>
          <button className="rpg-btn" onClick={onCancel}>
            NÃO
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Componente principal ──────────────────────────────────────────────────────

/**
 * GameBoard - Componente principal do jogo da memória.
 *
 * Heurísticas de Nielsen aplicadas:
 * - #1 Visibilidade do status: timer + movimentos + barra de progresso em tempo real
 * - #3 Controle e liberdade: reiniciar e voltar ao menu a qualquer momento
 * - #5 Prevenção de erros: confirmação antes de reiniciar, bloqueio durante animação
 * - #6 Reconhecimento em vez de memorização: cartas pareadas ficam visíveis com ✓
 * - #8 Estética minimalista: grade pixel-art limpa e focada
 */
const GameBoard = ({ difficulty, onMenu, onHighScore }) => {
  const config = getDifficultyConfig(difficulty);

  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  // ── Inicializa o tabuleiro ──
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

  // ── Timer ──
  useEffect(() => {
    if (gameWon) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [gameWon]);

  // ── Lógica de comparação de cartas ──
  useEffect(() => {
    if (flipped.length !== 2) return;

    setIsChecking(true);
    setMoves((m) => m + 1);

    const [uid1, uid2] = flipped;
    const card1 = deck.find((c) => c.uid === uid1);
    const card2 = deck.find((c) => c.uid === uid2);

    if (card1.id === card2.id) {
      setMatched((prev) => {
        const next = new Set(prev);
        next.add(card1.id);
        return next;
      });
      setFlipped([]);
      setIsChecking(false);
    } else {
      const timeout = setTimeout(() => {
        setFlipped([]);
        setIsChecking(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [flipped, deck]);

  // ── Detecção de vitória ──
  useEffect(() => {
    if (deck.length > 0 && matched.size === config.pairs) {
      setGameWon(true);
    }
  }, [matched, config.pairs, deck.length]);

  // ── Cálculo da pontuação ──
  const calculateScore = () => {
    const base = config.pairs * 100;
    const timePenalty = Math.floor(seconds / 5) * 5;
    const movePenalty = Math.max(0, moves - config.pairs) * 10;
    const diffBonus = difficulty === 'hard' ? 200 : difficulty === 'medium' ? 100 : 0;
    return Math.max(0, base - timePenalty - movePenalty + diffBonus);
  };

  // ── Handler de clique em carta ──
  const handleCardClick = (uid) => {
    if (isChecking) return;
    if (flipped.includes(uid)) return;
    if (flipped.length === 2) return;
    setFlipped((prev) => [...prev, uid]);
  };

  // ── Reiniciar com confirmação ──
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

  // ── Render ──
  return (
    <div className="pixel-home">
      <div style={{
        width: '100%', minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(180deg, #1a2e1a 0%, #0f1f12 100%)',
      }}>
        {/* Vinheta */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }} />

        {/* Padrão pixel de fundo */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent 0 32px, rgba(92,112,64,0.04) 32px 33px),
            repeating-linear-gradient(90deg, transparent 0 32px, rgba(92,112,64,0.04) 32px 33px)
          `,
        }} />

        {/* HUD superior */}
        <GameHud
          pairs={matched.size}
          totalPairs={config.pairs}
          time={fmtTime(seconds)}
          moves={moves}
          difficulty={DIFF_LABELS[difficulty] ?? difficulty.toUpperCase()}
          onRestart={handleRestartClick}
          onHome={onMenu}
        />

        {/* Grade de cartas */}
        <div
          role="grid"
          aria-label={`Tabuleiro — ${config.pairs} pares`}
          style={{
            position: 'relative', zIndex: 5,
            display: 'grid',
            gridTemplateColumns: `repeat(${config.cols}, 104px)`,
            gap: 14,
            justifyContent: 'center',
            padding: '24px 40px 40px',
          }}
        >
          {deck.map((card) => (
            <MemoryCard
              key={card.uid}
              card={card}
              isFlipped={flipped.includes(card.uid)}
              isMatched={matched.has(card.id)}
              onClick={handleCardClick}
              disabled={isChecking}
            />
          ))}
        </div>

        {/* Diálogo de confirmação de reinício */}
        {showRestartConfirm && (
          <RestartConfirmDialog
            onConfirm={initGame}
            onCancel={() => setShowRestartConfirm(false)}
          />
        )}

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
              onHighScore({ score: calculateScore(), moves, seconds, difficulty });
              initGame();
            }}
            onMenu={() => {
              onHighScore({ score: calculateScore(), moves, seconds, difficulty });
              onMenu();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GameBoard;
