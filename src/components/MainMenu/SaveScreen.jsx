import React, { useRef } from 'react';
import { useGame } from '../system/GameProvider';
import { saveGame, loadGame, hasSavedGame } from '../system/SaveManager';
import selectSound from '../../assets/audio/se/select.ogg';

export default function SaveScreen({ onBack }) {
    const { state } = useGame();
    const selectRef = useRef(null);

    const SLOT = 1;

    const handleSave = () => {
        const audio = selectRef.current;
        if (audio) {
            audio.volume = 0.5;
            audio.currentTime = 0;
            audio.play().catch(console.warn);
            audio.addEventListener('ended', () => {
                saveGame(state, SLOT);
                alert('Partida guardada.');
            }, { once: true });
        } else {
            saveGame(state, SLOT);
            alert('Partida guardada.');
        }
    };

    const handleBack = () => {
        const audio = selectRef.current;
        if (audio) {
            audio.volume = 0.5;
            audio.currentTime = 0;
            audio.play().catch(console.warn);
            audio.addEventListener('ended', onBack, { once: true });
        } else {
            onBack();
        }
    };

    const hasData = hasSavedGame(SLOT);
    const data = hasData ? loadGame(SLOT) : null;

    return (
        <div className="stats-menu-container">
            <div className="menu-test stats-menu-panel visible">
                <h2 className="menu-test__title">Guardar Partida</h2>

                <div className="menu-test__section">
                    <div className="menu-test__label"><strong>Archivo único</strong></div>
                    {hasData ? (
                        <>
                            <div className="menu-test__label">Nombre: {data.nombre || 'N/A'}</div>
                            <div className="menu-test__label">Edad: {data.edad || 'N/A'}</div>
                            <div className="menu-test__label">Raza: {data.raza || 'N/A'}</div>
                            <div className="menu-test__label">Reputación: {data.reputacion ?? 'N/A'}</div>
                        </>
                    ) : (
                        <div className="menu-test__label">No hay partida guardada.</div>
                    )}
                </div>

                <div className="button-row">
                    <button onClick={handleSave} className="menu-principal__button">💾 Guardar</button>
                    <button onClick={handleBack} className="menu-principal__button">🔙 Volver</button>
                </div>

                <audio ref={selectRef} src={selectSound} preload="auto" />
            </div>
        </div>
    );
}
