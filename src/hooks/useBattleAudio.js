import { useRef, useEffect } from 'react';

export default function useBattleAudio(music, clickSfx) {
    const musicAudio = useRef(new Audio(music));
    const clickSound = useRef(new Audio(clickSfx));

    useEffect(() => {
        const audio = musicAudio.current;
        audio.loop = true;
        audio.volume = 0.6;
        audio.play().catch(() => { });
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [music]);

    const playClick = () => {
        const sfx = clickSound.current;
        sfx.volume = 0.5;
        sfx.currentTime = 0;
        sfx.play();
    };

    return { playClick };
}