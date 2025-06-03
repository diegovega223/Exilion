import React, { useState, useEffect, useRef } from 'react';
import arrowIndicator from '../../assets/img/system/arrow-indicator.png';

export default function DialogueBox({
  text = '',
  speaker = '',
  fade = 'fade',
  delay = 0,
  duration = null,
  onAdvance = () => { },
  x = '50%',
  y = '80%',
  color = '#333',
  animate = 2,
  letterSound = null,
  advanceSound = null,
  maxWidth = '80%',
}) {
  const [visible, setVisible] = useState(fade === 'none');
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const indexRef = useRef(0);
  const timers = useRef({});
  const hasAdvanced = useRef(false);

  const resetState = () => {
    setVisible(fade === 'none');
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;
    hasAdvanced.current = false;
  };

  const resetTimers = () => {
    clearInterval(timers.current.animation);
    clearTimeout(timers.current.fade);
    clearTimeout(timers.current.duration);
    timers.current = {};
  };

  const playLetterSound = (char) => {
    if (char?.trim() && letterSound) {
      letterSound.currentTime = 0;
      letterSound.play().catch(() => { });
    }
  };

  const animateText = (speed) => {
    timers.current.animation = setInterval(() => {
      if (indexRef.current < text.length) {
        const nextChar = text[indexRef.current];
        setDisplayedText(text.slice(0, indexRef.current + 1));
        playLetterSound(nextChar);
        indexRef.current++;
      } else {
        clearInterval(timers.current.animation);
        timers.current.animation = null;
        setIsComplete(true);
      }
    }, speed);
  };

  const showBox = () => {
    setVisible(true);
    const speedMap = { 1: 80, 2: 40, 3: 20 };
    const speed = speedMap[animate] ?? 40;
    animateText(speed);
  };

  const handleAdvance = () => {
    if (!hasAdvanced.current) {
      hasAdvanced.current = true;
      advanceSound?.play().catch(() => { });
      onAdvance();
    }
  };

  const handleInput = (e) => {
    if (e.type === 'keydown' && !['Enter', ' ', 'Space'].includes(e.key)) return;
    if (indexRef.current < text.length) {
      clearInterval(timers.current.animation);
      setDisplayedText(text);
      setIsComplete(true);
    } else {
      handleAdvance();
    }
  };

  useEffect(() => {
    resetState();
    resetTimers();

    if (fade !== 'none') {
      timers.current.fade = setTimeout(showBox, delay);
    } else {
      showBox();
    }

    if (duration) {
      timers.current.duration = setTimeout(() => {
        if (!hasAdvanced.current) handleAdvance();
      }, delay + duration);
    }

    document.addEventListener('keydown', handleInput);
    document.addEventListener('click', handleInput);

    return () => {
      resetTimers();
      document.removeEventListener('keydown', handleInput);
      document.removeEventListener('click', handleInput);
    };
  }, [text, fade, delay, duration, onAdvance, animate, letterSound, advanceSound]);

  const handleBoxClick = () => {
    if (!isComplete) {
      clearInterval(timers.current.animation);
      setDisplayedText(text);
      setIsComplete(true);
    } else {
      handleAdvance();
    }
  };

  if (!visible) return null;

  return (
    <div
      className="dialogue-box"
      style={{ left: x, top: y, backgroundColor: color, maxWidth }}
      onClick={handleBoxClick}
    >
      <div className="dialogue-box__speaker">{speaker}</div>
      <div className="dialogue-box__text">{displayedText}</div>
      {isComplete && (
        <div className="dialogue-box__arrow-container">
          <img src={arrowIndicator} alt="Continuar" className="dialogue-box__arrow" />
        </div>
      )}
    </div>
  );
}
