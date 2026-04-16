import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * WinModal - Modal de vitória exibido ao completar o jogo.
 *
 * Heurísticas de Nielsen aplicadas:
 * - #1 Visibilidade do status: pontuação final detalhada
 * - #3 Controle e liberdade: opções claras de jogar novamente ou mudar dificuldade
 * - #9 Ajuda ao reconhecer, diagnosticar e recuperar de erros: feedback construtivo
 */
const WinModal = ({ result, onPlayAgain, onMenu }) => {
  const { score, moves, seconds, difficulty, matchedAnimals } = result;
  const [animalFact, setAnimalFact] = useState(null);
  const [loadingFact, setLoadingFact] = useState(false);
  const [factError, setFactError] = useState(false);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  const getStars = () => {
    if (score >= 800) return 3;
    if (score >= 500) return 2;
    return 1;
  };

  const stars = getStars();

  /**
   * Requisição HTTP via axios para buscar informação real sobre um animal
   * usando a API REST da Wikipedia (sem chave de API necessária).
   *
   * Heurística #1: o dado externo enriquece o feedback ao usuário.
   */
  useEffect(() => {
    if (!matchedAnimals || matchedAnimals.length === 0) return;

    const randomAnimal = matchedAnimals[Math.floor(Math.random() * matchedAnimals.length)];
    setLoadingFact(true);
    setFactError(false);

    axios
      .get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${randomAnimal.wikiSlug}`,
        { timeout: 5000 }
      )
      .then((res) => {
        setAnimalFact({
          name: randomAnimal.name,
          emoji: randomAnimal.emoji,
          text: res.data.extract
            ? res.data.extract.split('.').slice(0, 2).join('.') + '.'
            : 'Espécie importante para os ecossistemas terrestres.',
        });
      })
      .catch(() => {
        setFactError(true);
        setAnimalFact({
          name: randomAnimal.name,
          emoji: randomAnimal.emoji,
          text: `O(A) ${randomAnimal.name} é uma espécie listada como "${randomAnimal.status}" e habita o bioma ${randomAnimal.biome}. Proteger esta espécie é essencial para cumprir o ODS 15.`,
        });
      })
      .finally(() => setLoadingFact(false));
  }, [matchedAnimals]);

  const performanceMsg = () => {
    if (stars === 3) return { msg: 'Incrível! Você é um mestre da memória! 🧠', color: 'warning' };
    if (stars === 2) return { msg: 'Muito bem! Continue praticando! 💪', color: 'info' };
    return { msg: 'Bom começo! Tente novamente para melhorar! 🌱', color: 'secondary' };
  };

  const perf = performanceMsg();

  return (
    <div
      className="modal-overlay d-flex align-items-center justify-content-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="win-modal-title"
    >
      <div className="win-modal card shadow-lg border-0" style={{ maxWidth: '500px', width: '95%' }}>
        <div className="card-body p-4 text-center">
          {/* Celebração */}
          <div className="win-confetti mb-2">
            {'🎉'.repeat(3)}
          </div>
          <h2 id="win-modal-title" className="fw-bold text-success mb-1">
            Parabéns!
          </h2>
          <p className={`text-${perf.color} fw-semibold mb-3`}>{perf.msg}</p>

          {/* Estrelas */}
          <div className="stars mb-3" aria-label={`${stars} de 3 estrelas`}>
            {[1, 2, 3].map((s) => (
              <span key={s} className={`fs-2 ${s <= stars ? 'star-filled' : 'star-empty'}`}>
                ⭐
              </span>
            ))}
          </div>

          {/* Pontuação destaque */}
          <div className="score-highlight bg-success bg-opacity-10 rounded-3 py-3 mb-3">
            <div className="display-5 fw-bold text-success">{score}</div>
            <div className="text-muted">pontos</div>
          </div>

          {/* Estatísticas detalhadas */}
          <div className="row g-2 mb-3">
            <div className="col-4">
              <div className="stat-card p-2 rounded bg-light">
                <div className="h5 mb-0">🕐 {formatTime(seconds)}</div>
                <small className="text-muted">Tempo</small>
              </div>
            </div>
            <div className="col-4">
              <div className="stat-card p-2 rounded bg-light">
                <div className="h5 mb-0">🔄 {moves}</div>
                <small className="text-muted">Movimentos</small>
              </div>
            </div>
            <div className="col-4">
              <div className="stat-card p-2 rounded bg-light">
                <div className="h5 mb-0">
                  <span className={`badge ${
                    difficulty === 'easy' ? 'bg-success' :
                    difficulty === 'medium' ? 'bg-warning text-dark' : 'bg-danger'
                  }`}>
                    {difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Médio' : 'Difícil'}
                  </span>
                </div>
                <small className="text-muted">Nível</small>
              </div>
            </div>
          </div>

          {/* Curiosidade sobre animal (HTTP fetch) */}
          <div className="animal-fact-box rounded-3 p-3 mb-4 text-start">
            <h6 className="text-success fw-bold mb-2">
              🌿 Sabia que...
            </h6>
            {loadingFact ? (
              <div className="d-flex align-items-center gap-2 text-muted">
                <div className="spinner-border spinner-border-sm text-success" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                Buscando curiosidade sobre a espécie...
              </div>
            ) : animalFact ? (
              <>
                <p className="mb-1">
                  <strong>{animalFact.emoji} {animalFact.name}:</strong>
                </p>
                <p className="small text-muted mb-0">{animalFact.text}</p>
                {factError && (
                  <small className="text-warning">
                    (dados locais — sem conexão com a Wikipedia)
                  </small>
                )}
              </>
            ) : null}
          </div>

          {/* Ações – Heurística #3: Controle e Liberdade */}
          <div className="d-grid gap-2">
            <button
              className="btn btn-success btn-lg fw-bold"
              onClick={onPlayAgain}
              aria-label="Jogar novamente na mesma dificuldade"
            >
              🔃 Jogar Novamente
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={onMenu}
              aria-label="Voltar ao menu principal"
            >
              🏠 Menu Principal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
