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
                alert('Game saved.');
            }, { once: true });
        } else {
            saveGame(state, SLOT);
            alert('Game saved.');
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
                <h2 className="menu-test__title">Save Game</h2>

                <div className="menu-test__section">
                    <div className="menu-test__label"><strong>Single Save Slot</strong></div>
                    {hasData ? (
                        <>
                            <div className="menu-test__label">Name: {data.name || 'N/A'}</div>
                            <div className="menu-test__label">Age: {data.age || 'N/A'}</div>
                            <div className="menu-test__label">Race: {data.race || 'N/A'}</div>
                            <div className="menu-test__label">Reputation: {data.reputation ?? 'N/A'}</div>
                        </>
                    ) : (
                        <div className="menu-test__label">No saved game found.</div>
                    )}
                </div>

                <div className="button-row">
                    <button onClick={handleSave} className="menu-principal__button">💾 Save</button>
                    <button onClick={handleBack} className="menu-principal__button">🔙 Back</button>
                </div>

                <audio ref={selectRef} src={selectSound} preload="auto" />
            </div>
        </div>
    );
}
