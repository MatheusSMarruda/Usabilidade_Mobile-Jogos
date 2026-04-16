import React from 'react';

/**
 * Card - Componente de carta individual do jogo da memória.
 *
 * Heurísticas de Nielsen aplicadas:
 * - Visibilidade do status: cores distintas para matched/flipped/hidden
 * - Reconhecimento em vez de memorização: ícone + nome visível quando virado
 * - Feedback imediato: animação de flip ao clicar
 */
const Card = ({ animal, isFlipped, isMatched, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !isFlipped && !isMatched) {
      onClick(animal.uid);
    }
  };

  return (
    <div
      className={`card-wrapper ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label={isFlipped || isMatched ? `Carta: ${animal.name}` : 'Carta virada para baixo'}
      aria-pressed={isFlipped || isMatched}
      tabIndex={disabled || isMatched ? -1 : 0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className={`card-inner ${isFlipped || isMatched ? 'flipped' : ''}`}>
        {/* Verso (frente escondida) */}
        <div className="card-face card-back">
          <span className="card-back-icon">🌿</span>
          <span className="card-back-label">ODS 15</span>
        </div>

        {/* Frente (animal revelado) */}
        <div className={`card-face card-front ${isMatched ? 'card-matched' : ''}`}>
          <span className="animal-emoji" aria-hidden="true">
            {animal.emoji}
          </span>
          <span className="animal-name">{animal.name}</span>
          {isMatched && (
            <span className="matched-badge" aria-label="Par encontrado">✓</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
