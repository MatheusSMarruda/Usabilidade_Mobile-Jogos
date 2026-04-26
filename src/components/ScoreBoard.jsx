import React from 'react';

/**
 * ScoreBoard - Painel de informações da partida em tempo real.
 *
 * Heurística de Nielsen #1 – Visibilidade do status do sistema:
 * O usuário sempre sabe quantos movimentos fez, quanto tempo passou
 * e quantos pares já encontrou.
 */
const ScoreBoard = ({ moves, seconds, matched, total, difficulty, onRestart, onMenu }) => {
  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const progress = total > 0 ? Math.round((matched / total) * 100) : 0;

  return (
    <div className="scoreboard card shadow-sm mb-3">
      <div className="card-body py-2">
        <div className="row align-items-center g-2">
          {/* Status dos pares */}
          <div className="col-12 col-md-4">
            <small className="text-muted d-block">Progresso</small>
            <div className="progress" style={{ height: '10px' }} role="progressbar"
              aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}
              aria-label={`${matched} de ${total} pares encontrados`}>
              <div
                className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                style={{ width: `${progress}%` }}
              />
            </div>
            <small className="text-success fw-bold">{matched}/{total} pares</small>
          </div>

          {/* Métricas */}
          <div className="col-4 col-md-2 text-center">
            <div className="metric-box">
              <span className="metric-icon">🕐</span>
              <span className="metric-value">{formatTime(seconds)}</span>
              <small className="text-muted d-block">Tempo</small>
            </div>
          </div>

          <div className="col-4 col-md-2 text-center">
            <div className="metric-box">
              <span className="metric-icon">🔄</span>
              <span className="metric-value">{moves}</span>
              <small className="text-muted d-block">Movimentos</small>
            </div>
          </div>

          <div className="col-4 col-md-2 text-center">
            <div className="metric-box">
              <span
                className={`badge ${
                  difficulty === 'easy' ? 'bg-success' :
                  difficulty === 'medium' ? 'bg-warning text-dark' : 'bg-danger'
                } fs-6`}
              >
                {difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Médio' : 'Difícil'}
              </span>
              <small className="text-muted d-block">Nível</small>
            </div>
          </div>

          {/* Ações – Heurística #3: Controle e Liberdade */}
          <div className="col-12 col-md-2 d-flex gap-2 justify-content-md-end justify-content-center">
            <button
              className="btn btn-outline-warning btn-sm"
              onClick={onRestart}
              title="Reiniciar partida"
              aria-label="Reiniciar partida"
            >
              🔃 Reiniciar
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={onMenu}
              title="Voltar ao menu"
              aria-label="Voltar ao menu principal"
            >
              🏠
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
