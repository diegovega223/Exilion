import React, { useRef } from 'react';
import StatsMenu from './StatsMenu';
import StatEditor from './StatEditor';
import audio from '@audio';

const selectSound = audio.se.select.path;

export default function DebugScreen({ onBack }) {
    const selectRef = React.useRef(null);

    const handleBack = async () => {
        const audio = selectRef.current;
        if (audio) {
            try {
                audio.volume = 0.5;
                audio.currentTime = 0;
                await audio.play();
                audio.addEventListener('ended', () => {
                    onBack();
                }, { once: true });
            } catch (err) {
                console.warn('Error al reproducir sonido:', err);
                onBack();
            }
        } else {
            onBack();
        }
    };
    return (
        <>
            <button onClick={handleBack} className="menu-principal__button">🔙 Volver</button>
            <StatsMenu />
            <StatEditor />
            <audio ref={selectRef} src={selectSound} preload="auto" />
        </>
    );
}
