import React, { useRef, useState, useEffect } from 'react';
import { useGame } from '../system/GameProvider';
import { loadGame, hasSavedGame } from '../system/SaveManager';
import selectSound from '../../assets/audio/se/select.ogg';

function formatTiempo(segundos) {
    if (!segundos && segundos !== 0) return 'N/A';
    const h = Math.floor(segundos / 3600);
    const m = Math.floor((segundos % 3600) / 60);
    const s = segundos % 60;
    return [h, m, s]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':');
}

export default function LoadScreen({ onBack }) {
    const { dispatch } = useGame();
    const selectRef = useRef(null);
    const [savedData, setSavedData] = useState(null);

    useEffect(() => {
        if (hasSavedGame()) {
            const data = loadGame();
            setSavedData(data);
        }
    }, []);

    const handleLoad = () => {
        if (savedData) {
            dispatch({ type: 'LOAD_FULL_STATE', valor: savedData });
            alert('Partida cargada.');
        } else {
            alert('No hay partida guardada.');
        }
    };

    const handleBack = () => playSelectSound(onBack);

    const playSelectSound = (callback) => {
        const audio = selectRef.current;
        if (audio) {
            audio.volume = 0.5;
            audio.currentTime = 0;
            audio.play().catch(console.warn);
            audio.addEventListener('ended', callback, { once: true });
        } else {
            callback();
        }
    };

    return (
        <div className="stats-menu-container">
            <div className="menu-test stats-menu-panel visible">
                <h2 className="menu-test__title">Cargar Partida</h2>

                {savedData ? (
                    <>
                        <div className="menu-test__section">
                            <div className="menu-test__label"><strong>Nombre:</strong> {savedData.nombre || 'N/A'}</div>
                            <div className="menu-test__label"><strong>Edad:</strong> {savedData.edad || 'N/A'}</div>
                            <div className="menu-test__label"><strong>Raza:</strong> {savedData.raza || 'N/A'}</div>
                            <div className="menu-test__label"><strong>Reputación:</strong> {savedData.reputacion ?? 'N/A'}</div>
                            <div className="menu-test__label"><strong>Oro:</strong> {savedData.oro ?? 0}</div>
                            <div className="menu-test__label">
                                <strong>Tiempo de juego:</strong> {formatTiempo(savedData.tiempoJuego)}
                            </div>
                        </div>


                        <div className="button-row">
                            <button onClick={handleLoad} className="menu-principal__button">💾 Cargar</button>
                            <button onClick={handleBack} className="menu-principal__button">🔙 Volver</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p>No hay partidas guardadas.</p>
                        <button onClick={handleBack} className="menu-principal__button">🔙 Volver</button>
                    </>
                )}

                <audio ref={selectRef} src={selectSound} preload="auto" />
            </div>
        </div>
    );
}
