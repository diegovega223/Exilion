import React, { useRef, useState, useEffect } from 'react';
import { useGame } from '../system/GameProvider';
import { loadGame, hasSavedGame } from '../system/SaveManager';
import selectSound from '../../assets/audio/se/select.ogg';

function formatTime(seconds) {
    if (!seconds && seconds !== 0) return 'N/A';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
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
            alert('Game loaded.');
        } else {
            alert('No saved game found.');
        }
    };

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

    const handleBack = () => playSelectSound(onBack);

    return (
        <div className="stats-menu-container">
            <div className="menu-test stats-menu-panel visible">
                <h2 className="menu-test__title">Load Game</h2>

                {savedData ? (
                    <>
                        <div className="menu-test__section">
                            <div className="menu-test__label"><strong>Name:</strong> {savedData.name || 'N/A'}</div>
                            <div className="menu-test__label"><strong>Age:</strong> {savedData.age || 'N/A'}</div>
                            <div className="menu-test__label"><strong>Race:</strong> {savedData.race || 'N/A'}</div>
                            <div className="menu-test__label"><strong>Reputation:</strong> {savedData.reputation ?? 'N/A'}</div>
                            <div className="menu-test__label"><strong>Gold:</strong> {savedData.gold ?? 0}</div>
                            <div className="menu-test__label">
                                <strong>Playtime:</strong> {formatTime(savedData.playTime)}
                            </div>
                        </div>

                        <div className="button-row">
                            <button onClick={handleLoad} className="menu-principal__button">💾 Load</button>
                            <button onClick={handleBack} className="menu-principal__button">🔙 Back</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p>No saved games found.</p>
                        <button onClick={handleBack} className="menu-principal__button">🔙 Back</button>
                    </>
                )}

                <audio ref={selectRef} src={selectSound} preload="auto" />
            </div>
        </div>
    );
}
