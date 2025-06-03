import React, { useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import bgm from '../../assets/audio/bgm/menu-theme.ogg';

const audioInstance = new Audio(bgm);
audioInstance.loop = true;
audioInstance.volume = 1;

const BackgroundMusic = forwardRef(({ active }, ref) => {
    const audioRef = useRef(audioInstance);

    useEffect(() => {
        const audio = audioRef.current;

        if (active) {
            audio.play().catch(err => console.warn('Error al reproducir BGM:', err));
        } else {
            audio.pause();
        }

        return () => {
            audio.pause();
        };
    }, [active]);

    useImperativeHandle(ref, () => ({
        fadeOut: () => {
            return new Promise((resolve) => {
                const audio = audioRef.current;
                const step = 0.05;
                const interval = 100;

                const fade = setInterval(() => {
                    if (audio.volume > step) {
                        audio.volume -= step;
                    } else {
                        audio.volume = 0;
                        audio.pause();
                        clearInterval(fade);
                        resolve();
                    }
                }, interval);
            });
        },
        isPlaying: () => !audioRef.current.paused
    }));

    return null;
});

export default BackgroundMusic;
