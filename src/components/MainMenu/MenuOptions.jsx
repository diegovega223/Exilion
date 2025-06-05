import React, { useRef } from 'react';
import audio from '@audio';

const selectSound = audio.se.select.path;

export default function MenuOptions({ onNewGame, onChangeView }) {
    const selectRef = useRef(null);

    const handleChangeView = async (view) => {
        const audio = selectRef.current;

        if (audio) {
            try {
                audio.volume = 0.5;
                audio.currentTime = 0;
                await audio.play();
                audio.addEventListener('ended', () => onChangeView(view), { once: true });
                return;
            } catch (err) {
                console.warn('Error al reproducir sonido:', err);
            }
        }
        onChangeView(view);
    };

    return (
        <div className="menu-principal">
            <button
                onClick={async () => {
                    const audio = selectRef.current;
                    if (audio) {
                        try {
                            audio.volume = 0.5;
                            audio.currentTime = 0;
                            await audio.play();
                        } catch (err) {
                            console.warn('Error al reproducir sonido:', err);
                        }
                    }
                    onNewGame();
                }} className="menu-principal__button">🗡️ Nuevo Juego</button>

            <button onClick={() => handleChangeView('load')} className="menu-principal__button">💾 Cargar Partida</button>
            <button onClick={() => onChangeView('save')} className="menu-principal__button">💾 Guardar Partida</button>
            <button onClick={() => handleChangeView('options')} className="menu-principal__button">⚙️ Opciones</button>
            <button onClick={() => handleChangeView('debug')} className="menu-principal__button">🐞 Debug</button>
            <audio ref={selectRef} src={selectSound} preload="auto" />
        </div>
    );
}
