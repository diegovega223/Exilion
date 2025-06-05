import React, { useEffect, useRef } from 'react';
import audio from '@audio';

const startSound = audio.se.gameStart.path;

export default function StartScreen({ onStart }) {
    const soundRef = useRef(null);

    useEffect(() => {
        const handleStart = () => {
            const audio = soundRef.current;

            if (audio) {
                audio.volume = 0.5;
                audio.play()
                    .then(() => {
                        setTimeout(() => {
                            onStart();
                        }, 1200);
                    })
                    .catch(err => {
                        console.warn('Error al reproducir sonido de inicio:', err);
                        onStart();
                    });
            } else {
                onStart();
            }
        };

        window.addEventListener('keydown', handleStart, { once: true });
        window.addEventListener('click', handleStart, { once: true });

        return () => {
            window.removeEventListener('keydown', handleStart);
            window.removeEventListener('click', handleStart);
        };
    }, [onStart]);

    return (
        <>
            <p className="start-screen__text">Presiona cualquier tecla para comenzar</p>
            <audio ref={soundRef} src={startSound} preload="auto" />
        </>
    );
}
