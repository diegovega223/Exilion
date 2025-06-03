import React from 'react';
import ScenePlayer, { createStep, ActionTypes } from '../system/ScenePlayer';
import riverImg from '../../assets/img/event/River.avif';
import forestImg from '../../assets/img/event/Forest.avif';

export default function Intro() {
  const steps = [
    createStep(0, 'Fondo río fullscreen', ActionTypes.IMAGE, () => ({
      nombre: 'fondo-rio',
      src: riverImg,
      fullscreen: true,
      zIndex: 0,
      opacity: 1,
      transition: 'soft',
    })),

    createStep(1, 'Narrador abre escena', ActionTypes.DIALOGUE),
    createStep(2, 'Reacción ante el fuego', ActionTypes.DIALOGUE),

    createStep(3, 'Cambio a bosque', ActionTypes.IMAGE, () => ({
      nombre: 'fondo-bosque',
      src: forestImg,
      fullscreen: true,
      zIndex: 1, // bosque encima del río
      opacity: 0.9,
      transition: 'strong',
    })),

    createStep(4, 'Discusión entre los personajes', ActionTypes.DIALOGUE),
    createStep(5, 'Sospecha y tensión', ActionTypes.DIALOGUE),
    createStep(6, 'Decisión apresurada', ActionTypes.DIALOGUE),
    createStep(7, 'Fin escena', ActionTypes.DIALOGUE),

    // Borramos solo la imagen "fondo-bosque", el río queda
    createStep(8, 'Borrar fondo bosque', ActionTypes.IMAGE, () => ({
      nombre: 'fondo-bosque',
      src: null,
    })),
  ];

  // Diálogos
  steps[1].data = [
    { speaker: 'Narrador', text: 'La noche caía pesada sobre los árboles de Eldoria.' },
    { speaker: 'Narrador', text: 'El olor a humo guió a los tres viajeros hasta la colina.' },
    { speaker: 'Narrador', text: 'Desde allí, el resplandor anaranjado de las llamas revelaba una verdad impensable: el refugio estaba ardiendo.' },
  ];

  steps[2].data = [
    { speaker: 'Aelric', text: '¡No...! ¿Cómo ocurrió esto? ¡Estábamos fuera solo unas horas!' },
    { speaker: 'Lyria', text: '¡Todo lo que teníamos... nuestras provisiones... nuestras notas!' },
    { speaker: 'Kael', text: 'No fue un accidente. Mira las marcas en el suelo... alguien estuvo aquí.' },
  ];

  steps[4].data = [
    { speaker: 'Aelric', text: '¿Crees que fueron los exploradores del norte?' },
    { speaker: 'Lyria', text: 'No lo sé, pero esto no fue obra de animales. Esto fue planificado.' },
  ];

  steps[5].data = [
    { speaker: 'Kael', text: 'Hay huellas. Tres pares... y una parece ser de alguien más pequeño.' },
    { speaker: 'Aelric', text: '¿Un niño? ¿O... una trampa para que lo pensemos?' },
    { speaker: 'Lyria', text: 'Sea quien sea, todavía podría estar cerca. Tenemos que decidir ya.' },
  ];

  steps[6].data = [
    { speaker: 'Kael', text: 'Dividámonos. Aelric y yo iremos por el arroyo. Lyria, revisa el sendero este.' },
    { speaker: 'Lyria', text: 'No me gusta esto... pero no tenemos elección.' },
  ];

  steps[7].data = [
    { speaker: 'Narrador', text: 'El grupo se separa bajo el cielo nocturno, guiados por el miedo y la sospecha.' },
    { speaker: 'Narrador', text: 'Las llamas devoran su pasado, mientras el peligro se cierne sobre su futuro.' },
  ];

  return <ScenePlayer steps={steps} />;
}
