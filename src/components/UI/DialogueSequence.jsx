import React, { useState, useRef, useEffect } from 'react';
import DialogueBox from './DialogueBox';
import { defaultBeep, defaultAdvance } from '../../utils/audioCache';

export default function DialogueSequence({ dialogues, onEnd = () => {} }) {
  const [index, setIndex] = useState(0);
  const lastCoords = useRef({ x: '50%', y: '80%' });
  const ended = useRef(false);

  useEffect(() => {
    if (!dialogues || dialogues.length === 0) return;

    if (index >= dialogues.length) {
      if (!ended.current) {
        console.log('[Sequence] Fin de diálogo');
        ended.current = true;
        onEnd();
      }
    } else {
      console.log('[Sequence] Mostrando diálogo', index, dialogues[index]);
    }
  }, [index, dialogues, onEnd]);

  if (!Array.isArray(dialogues) || dialogues.length === 0 || index >= dialogues.length) {
    return null;
  }

  const current = dialogues[index];
  const {
    speaker = '',
    text = '',
    fade = 'fade',
    delay = 0,
    duration = null,
    color = '#333',
    animate = 2,
    x,
    y,
    letterSound = defaultBeep,
    advanceSound = defaultAdvance,
  } = current;

  const resolvedX = x !== undefined ? x : lastCoords.current.x;
  const resolvedY = y !== undefined ? y : lastCoords.current.y;
  lastCoords.current = { x: resolvedX, y: resolvedY };

  const next = () => {
    setIndex(i => i + 1);
  };

  return (
    <DialogueBox
      key={index}
      speaker={speaker}
      text={text}
      fade={fade}
      delay={delay}
      duration={duration}
      color={color}
      x={resolvedX}
      y={resolvedY}
      onAdvance={next}
      animate={animate}
      letterSound={letterSound}
      advanceSound={advanceSound}
    />
  );
}
