import React, { useEffect, useState } from 'react';
import DialogueSequence from '../UI/DialogueSequence';
import ImageManager from './ImageManager';

export const ActionTypes = {
  DIALOGUE: 'dialogue',
  IMAGE: 'image',
  SOUND: 'sound',
  DECISION: 'decision',
  ANIMATION: 'animation',
  CUSTOM: 'custom',
};

export function createStep(order, name, type, action = () => {}, execute = true) {
  return { order, name, type, action, execute };
}
export default function ScenePlayer({ steps }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeDialogue, setActiveDialogue] = useState(null);
  const [images, setImages] = useState([]);
  const [imageTransitioning, setImageTransitioning] = useState(false);

  useEffect(() => {
    if (!steps || currentStepIndex >= steps.length || activeDialogue || imageTransitioning) return;

    const currentStep = steps[currentStepIndex];
    if (!currentStep.execute) {
      console.log(`[ScenePlayer] Paso ${currentStep.order} (${currentStep.name}) saltado.`);
      goToNextStep();
      return;
    }

    console.log(`[ScenePlayer] Ejecutando paso ${currentStep.order} (${currentStep.name}) [Tipo: ${currentStep.type}]`);
    processStep(currentStep);
  }, [currentStepIndex, steps, activeDialogue, imageTransitioning]);

  const processStep = (step) => {
    switch (step.type) {
      case ActionTypes.DIALOGUE:
        if (Array.isArray(step.data)) {
          setActiveDialogue(step.data);
        } else {
          console.warn(`[ScenePlayer] El paso "${step.name}" no tiene datos de diálogo válidos.`);
          goToNextStep();
        }
        break;

      case ActionTypes.IMAGE:
        if (typeof step.action === 'function') {
          const config = step.action();
          if (!config || typeof config !== 'object' || !config.nombre) {
            console.warn(`[ScenePlayer] Paso "${step.name}" no retornó una configuración válida de imagen.`);
            goToNextStep();
            return;
          }

          const { nombre, src, transition = 'soft', ...props } = config;

          if (!src) {
            setImages((imgs) => imgs.filter(img => img.nombre !== nombre));
            goToNextStep();
            return;
          }
          setImageTransitioning(true);

          setImages((imgs) => {
            const idx = imgs.findIndex(img => img.nombre === nombre);
            if (idx >= 0) {
              const newImgs = [...imgs];
              newImgs[idx] = { nombre, src, transition, ...props };
              return newImgs;
            } else {
              return [...imgs, { nombre, src, transition, ...props }];
            }
          });
          const delay = transition === 'strong' ? 1200 : 600;
          setTimeout(() => {
            setImageTransitioning(false);
            goToNextStep();
          }, delay);
        } else {
          console.warn(`[ScenePlayer] El paso "${step.name}" no tiene acción válida para imagen.`);
          goToNextStep();
        }
        break;

      default:
        step.action?.();
        setTimeout(goToNextStep, 1000);
        break;
    }
  };

  const goToNextStep = () => {
    setCurrentStepIndex((i) => i + 1);
  };

  const handleDialogueEnd = () => {
    setActiveDialogue(null);
    goToNextStep();
  };

  return (
    <>
      {activeDialogue && (
        <DialogueSequence dialogues={activeDialogue} onEnd={handleDialogueEnd} />
      )}
      {images.map(({ nombre, src, transition, ...props }) => (
        <ImageManager
          key={nombre}
          nombre={nombre}
          src={src}
          useStrongTransition={transition === 'strong'}
          {...props}
        />
      ))}
    </>
  );
}
