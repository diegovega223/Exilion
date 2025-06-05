import React, { useEffect, useState } from 'react';
import audio from '@audio';

const expTick = audio.se.select.path;

const ExpBarModal = ({ playerName, expBefore, expGain, expMax, onClose }) => {
  const [displayExp, setDisplayExp] = useState(expBefore);

  useEffect(() => {
    let end = Math.min(expBefore + expGain, expMax);
    let step = Math.ceil(expGain / 40);
    let interval = setInterval(() => {
      setDisplayExp(prev => {
        if (prev + step >= end) {
          clearInterval(interval);
          return end;
        }
        const audio = new Audio(expTick);
        audio.volume = 0.5;
        audio.play();
        return prev + step;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [expBefore, expGain, expMax]);

  const percent = Math.min(100, (displayExp / expMax) * 100);

  return (
    <div className="victory-modal victory-fade-in" onClick={onClose}>
      <div className="victory-modal-content" onClick={e => e.stopPropagation()}>
        <h2>{playerName}</h2>
        <div style={{ margin: '1em 0' }}>
          <div style={{
            background: '#333',
            borderRadius: '8px',
            overflow: 'hidden',
            height: '24px',
            width: '100%',
            boxShadow: '0 0 8px #000a'
          }}>
            <div style={{
              width: `${percent}%`,
              background: 'linear-gradient(90deg, #ffe066, #ffd700 80%)',
              height: '100%',
              transition: 'width 0.2s'
            }} />
          </div>
          <div style={{ marginTop: 8 }}>
            <strong>{displayExp}</strong> / <strong>{expMax}</strong> EXP
          </div>
        </div>
        <p>¡Has ganado <strong>{expGain}</strong> EXP!</p>
        <p style={{ fontSize: 12, color: '#aaa' }}>(Toca para continuar)</p>
      </div>
    </div>
  );
};

export default ExpBarModal;