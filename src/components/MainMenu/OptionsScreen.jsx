import React, { useRef } from 'react';
import selectSound from '../../assets/audio/se/select.ogg';

export default function OptionsScreen({ onBack }) {
    const selectRef = useRef(null);

    const handleBack = () => {
        const audio = selectRef.current;
        if (audio) {
            audio.volume = 0.5;
            audio.currentTime = 0;
            audio.play().catch(err => {
                console.warn('Error al reproducir sonido:', err);
                onBack();
            });
            audio.addEventListener('ended', () => {
                onBack();
            }, { once: true });
        } else {
            onBack();
        }
    };

    return (
        <>
            <button onClick={handleBack} className="menu-principal__button">🔙 Volver</button>
            <h2 className="menu-principal__title">⚙️ Opciones</h2>
            <audio ref={selectRef} src={selectSound} preload="auto" />
        </>
    );
}
