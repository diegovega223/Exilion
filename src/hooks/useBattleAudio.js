import { useRef, useEffect } from 'react';

export default function useBattleAudio(music, clickSfx) {
    useEffect(() => {
        if (!music) return;
        const audio = new Audio(music);
        audio.loop = true;
        audio.volume = 0.6;
        window.battleBgm = audio;
        audio.play().catch(() => {});
        return () => {
            audio.pause();
            audio.currentTime = 0;
            window.battleBgm = null;
        };
    }, [music]);

    const playClick = () => {
        if (!clickSfx) return;
        const sfx = new Audio(clickSfx);
        sfx.volume = 0.5;
        sfx.currentTime = 0;
        sfx.play();
    };

    return { playClick };
}