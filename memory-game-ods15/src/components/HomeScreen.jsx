// HomeScreen.jsx — Tela inicial com visual pixel-art (Amazônia).
// Baseado no WireAmazonia do amazonia-standalone, integrado ao back-end.

import { useState } from 'react';
import '../pixel-art.css';
import { SceneAmazonia } from './Scenes';
import { SpriteAnt, SpriteSpringbok, SpriteOnca, SpriteSign } from './Sprites';

// Mapeamento de dificuldade: visual → back-end
const DIFF_MAP = { facil: 'easy', medio: 'medium', dificil: 'hard' };

function RPGTitlePlate({ title, subtitle }) {
  return (
    <div style={{
      display: 'inline-block',
      background: 'var(--ink)',
      padding: '14px 28px 18px',
      border: '4px solid var(--ink)',
      boxShadow:
        'inset 0 0 0 3px var(--brown-1), inset 0 0 0 6px var(--ink), 0 8px 0 var(--brown-3), 0 12px 0 rgba(0,0,0,0.35)',
      textAlign: 'center',
    }}>
      <div className="pa-title" style={{ fontSize: 26, color: 'var(--amber)', textShadow: '3px 3px 0 var(--brown-3)', marginBottom: 8 }}>
        {title}
      </div>
      <div className="pa-title" style={{ fontSize: 10, color: 'var(--olive-1)', letterSpacing: '0.15em' }}>
        {subtitle}
      </div>
    </div>
  );
}

function DifficultyCard({ label, size, sprite, selected, onClick }) {
  return (
    <div className={`diff-card${selected ? ' selected' : ''}`} onClick={onClick}>
      <div className="sprite-wrap">{sprite}</div>
      <div className="label">{label}</div>
      <div className="size">{size}</div>
    </div>
  );
}

function HowToPlay() {
  const items = [
    'Vire uma carta tocando nela',
    'Encontre o par idêntico',
    'Memorize as posições',
    'Complete no menor tempo',
  ];
  return (
    <div className="rpg-window parchment" style={{ width: 420 }}>
      <div className="pa-title" style={{ fontSize: 12, color: 'var(--brown-3)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ display: 'inline-block' }}><SpriteSign size={2} /></span>
        COMO JOGAR
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((txt, i) => (
          <li key={i} className="pa-body" style={{
            color: 'var(--brown-3)', fontSize: 20, marginBottom: 6,
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <span className="pa-title" style={{ fontSize: 10, color: 'var(--orange-1)', marginTop: 4 }}>{`0${i + 1}`}</span>
            <span>{txt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HighScores({ scores }) {
  if (!scores || scores.length === 0) return null;
  const diffLabel = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };
  const medals = ['🥇', '🥈', '🥉'];
  return (
    <div className="hs-panel">
      <div className="pa-title" style={{ fontSize: 10, color: 'var(--amber)', marginBottom: 10, textAlign: 'center' }}>
        RECORDES
      </div>
      {scores.slice(0, 5).map((s, i) => (
        <div key={i} className="hs-row pa-body" style={{ color: 'var(--cream)' }}>
          <span>{medals[i] ?? `#${i + 1}`} {diffLabel[s.difficulty] ?? s.difficulty}</span>
          <span style={{ color: 'var(--amber)' }}>{s.score} pts</span>
          <span style={{ color: 'var(--olive-1)' }}>{s.moves}mov · {s.time}s</span>
        </div>
      ))}
    </div>
  );
}

const HomeScreen = ({ onStart, highScores = [] }) => {
  const [sel, setSel] = useState('facil');

  return (
    <div className="pixel-home">
      <div className="frame">
        <SceneAmazonia />

        <div className="hud-tag">Vida Terrestre · Desenvolvimento Sustentável</div>

        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 32, padding: '60px 40px 80px',
        }}>
          <RPGTitlePlate title="JOGO DA MEMÓRIA" subtitle="ODS 15 · VIDA TERRESTRE" />

          <div className="rpg-window" style={{ width: 560 }}>
            <div className="pa-title" style={{ fontSize: 12, textAlign: 'center', marginBottom: 18, color: 'var(--brown-3)' }}>
              ESCOLHA SEU ANIMAL GUIA
            </div>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
              <DifficultyCard
                label="FÁCIL" size="4×3 · 6 pares"
                sprite={<div className="bob"><SpriteAnt size={3} /></div>}
                selected={sel === 'facil'}
                onClick={() => setSel('facil')}
              />
              <DifficultyCard
                label="MÉDIO" size="4×4 · 8 pares"
                sprite={<div className="bob"><SpriteSpringbok size={3} /></div>}
                selected={sel === 'medio'}
                onClick={() => setSel('medio')}
              />
              <DifficultyCard
                label="DIFÍCIL" size="5×4 · 10 pares"
                sprite={<div className="bob"><SpriteOnca size={3} /></div>}
                selected={sel === 'dificil'}
                onClick={() => setSel('dificil')}
              />
            </div>
          </div>

          <button
            className="rpg-btn orange"
            onClick={() => onStart(DIFF_MAP[sel])}
          >
            ▶  INICIAR JORNADA
          </button>

          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
            <HowToPlay />
            <HighScores scores={highScores} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
