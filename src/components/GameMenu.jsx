import React, { useState } from 'react';

/**
 * GameMenu - Tela inicial do jogo.
 *
 * Heurísticas de Nielsen aplicadas:
 * - #4 Consistência e padrões: layout familiar de menu
 * - #6 Reconhecimento em vez de memorização: dificuldade com descrição visual clara
 * - #8 Estética e design minimalista: foco nas ações principais
 */
const GameMenu = ({ onStart, highScores }) => {
  const [difficulty, setDifficulty] = useState('easy');

  const difficulties = [
    {
      key: 'easy',
      label: 'Fácil',
      icon: '🌱',
      desc: '6 pares · 12 cartas',
      color: 'success',
    },
    {
      key: 'medium',
      label: 'Médio',
      icon: '🌿',
      desc: '8 pares · 16 cartas',
      color: 'warning',
    },
    {
      key: 'hard',
      label: 'Difícil',
      icon: '🌳',
      desc: '10 pares · 20 cartas',
      color: 'danger',
    },
  ];

  return (
    <div className="menu-container">
      {/* Hero Banner */}
      <div className="hero-banner text-center text-white py-5 mb-4">
        <div className="hero-badge mb-3">
          <img
            src="https://brasil.un.org/sites/default/files/2020-09/S_SDG_Icons-01-15.jpg"
            alt="ODS 15 - Vida Terrestre"
            className="ods-badge-img"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        <h1 className="display-5 fw-bold mb-1">🌍 Jogo da Memória</h1>
        <h2 className="h4 mb-3 text-warning">ODS 15 · Vida Terrestre</h2>
        <p className="lead col-md-7 mx-auto">
          Proteger, recuperar e promover o uso sustentável dos ecossistemas
          terrestres, gerir de forma sustentável as florestas e combater a
          desertificação.
        </p>
      </div>

      <div className="container" style={{ maxWidth: '700px' }}>
        {/* Seleção de dificuldade – Heurística #6: Reconhecimento */}
        <h3 className="text-center mb-3 text-white">Escolha a Dificuldade</h3>
        <div className="row g-3 mb-4">
          {difficulties.map((d) => (
            <div className="col-4" key={d.key}>
              <div
                className={`difficulty-card text-center p-3 rounded-3 cursor-pointer border-3
                  ${difficulty === d.key
                    ? `border border-${d.color} bg-${d.color} bg-opacity-25 selected`
                    : 'border border-secondary bg-dark bg-opacity-50'
                  }`}
                onClick={() => setDifficulty(d.key)}
                role="radio"
                aria-checked={difficulty === d.key}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setDifficulty(d.key)}
              >
                <div className="fs-1">{d.icon}</div>
                <div className={`fw-bold text-${d.color}`}>{d.label}</div>
                <small className="text-muted">{d.desc}</small>
                {difficulty === d.key && (
                  <div className={`badge bg-${d.color} mt-1`}>Selecionado ✓</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Botão de início */}
        <div className="text-center mb-4">
          <button
            className="btn btn-success btn-lg px-5 py-3 fw-bold shadow start-btn"
            onClick={() => onStart(difficulty)}
            aria-label={`Iniciar jogo no modo ${difficulty}`}
          >
            🎮 Iniciar Jogo
          </button>
        </div>

        {/* Como jogar – Heurística #6 e #10 */}
        <div className="card bg-dark bg-opacity-50 border-success mb-4">
          <div className="card-body">
            <h5 className="card-title text-success">📖 Como Jogar</h5>
            <ul className="text-light mb-0 small">
              <li>Clique em uma carta para virá-la e revelar o animal.</li>
              <li>Clique em uma segunda carta — se os animais forem iguais, o par é encontrado!</li>
              <li>Se não forem iguais, as cartas voltam. Memorize as posições!</li>
              <li>Complete o tabuleiro no menor tempo e com menos movimentos possível.</li>
            </ul>
          </div>
        </div>

        {/* Recordes – Heurística #1: Visibilidade */}
        {highScores.length > 0 && (
          <div className="card bg-dark bg-opacity-50 border-warning mb-4">
            <div className="card-body">
              <h5 className="card-title text-warning">🏆 Melhores Pontuações</h5>
              <ul className="list-unstyled mb-0">
                {highScores.slice(0, 5).map((s, i) => (
                  <li key={i} className="d-flex justify-content-between text-light small py-1 border-bottom border-secondary">
                    <span>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                      {' '}
                      <span className={`badge ${
                        s.difficulty === 'easy' ? 'bg-success' :
                        s.difficulty === 'medium' ? 'bg-warning text-dark' : 'bg-danger'
                      }`}>
                        {s.difficulty === 'easy' ? 'Fácil' : s.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                      </span>
                    </span>
                    <span className="text-warning fw-bold">{s.score} pts</span>
                    <span className="text-muted">{s.moves} mov · {s.time}s</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Rodapé informativo */}
        <p className="text-center text-muted small mt-2">
          Projeto A3 · Usabilidade e Design Web/Mobile/Jogos · 2025
        </p>
      </div>
    </div>
  );
};

export default GameMenu;
