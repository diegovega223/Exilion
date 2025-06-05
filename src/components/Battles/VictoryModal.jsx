import React, { useEffect, useState } from 'react';
import victoryJingle from '../../assets/audio/se/finish.ogg';
import rewardSfx from '../../assets/audio/se/select.ogg';
import itemSfx from '../../assets/audio/se/select.ogg';
import totalSfx from '../../assets/audio/se/finish.ogg';
import ExpBarModal from './ExpBarModal';

const VictoryModal = ({ exp, gold, monsters, onClose, playerName, playerExp, playerExpMax }) => {
  const [showRewards, setShowRewards] = useState(false);
  const [shownItems, setShownItems] = useState(0);
  const [showTotals, setShowTotals] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  const [showExpBar, setShowExpBar] = useState(false);

  useEffect(() => {
    const audio = new Audio(victoryJingle);
    audio.volume = 1;
    audio.play();
    const rewardsTimeout = setTimeout(() => {
      setShowRewards(true);
      new Audio(rewardSfx).play();
    }, 1000);
    return () => clearTimeout(rewardsTimeout);
  }, []);

  useEffect(() => {
    if (showRewards && monsters.length > 0) {
      let interval = setInterval(() => {
        setShownItems(prev => {
          if (prev < monsters.length) {
            new Audio(itemSfx).play();
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              setShowTotals(true);
              new Audio(totalSfx).play();
              setTimeout(() => setCanContinue(true), 800); // Habilita continuar tras mostrar total
            }, 500);
            return prev;
          }
        });
      }, 500);
      return () => clearInterval(interval);
    }
    if (showRewards && monsters.length === 0) {
      setTimeout(() => {
        setShowTotals(true);
        new Audio(totalSfx).play();
        setTimeout(() => setCanContinue(true), 800);
      }, 500);
    }
  }, [showRewards, monsters.length]);

  const handleContinue = () => {
    if (canContinue) setShowExpBar(true);
  };

  if (showExpBar) {
    return (
      <ExpBarModal
        playerName={playerName}
        expBefore={playerExp}
        expGain={exp}
        expMax={playerExpMax}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="victory-modal victory-fade-in" onClick={handleContinue}>
      <div className="victory-modal-content" onClick={e => e.stopPropagation()}>
        <div className="victory-icon" role="img" aria-label="Trophy">🏆</div>
        <h2>¡Victoria!</h2>
        <p>¡El equipo liderado por <strong>{playerName}</strong> ha ganado la pelea!</p>
        {showRewards && (
          <>
            <h3>Recompensas:</h3>
            <ul className="victory-list">
              {monsters.slice(0, shownItems).map((m, i) => (
                <li key={i}>
                  <span role="img" aria-label="exp"></span> {m.name}: <strong>✨ {m.exp} EXP</strong>
                  {' '}
                  <span role="img" aria-label="gold">🪙</span> <strong>{m.gold} oro</strong>
                </li>
              ))}
            </ul>
          </>
        )}
        {showTotals && (
          <>
            <hr />
            <p style={{ marginTop: '1em' }}>
              <span role="img" aria-label="exp">✨</span> <strong>Total EXP:</strong> {exp} <br />
              <span role="img" aria-label="gold">🪙</span> <strong>Total Oro:</strong> {gold}
            </p>
            {canContinue && <p style={{ fontSize: 12, color: '#aaa' }}>(Toca para continuar)</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default VictoryModal;