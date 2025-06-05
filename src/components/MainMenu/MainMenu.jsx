import React, { useRef, useState } from 'react';
import { TitleScreen, StartScreen, MenuOptions, LoadScreen, SaveScreen, OptionsScreen, DebugScreen, BackgroundMusic } from './MainMenu';
import tituloImage from '../../assets/img/system/titulo.png';
import GameStart from '../Intro/Intro';

export default function MainMenu() {
    const [view, setView] = useState('title');
    const [isFading, setIsFading] = useState(false);
    const bgmRef = useRef(null);

    const changeView = (newView) => setView(newView);

    const handleStartNewGame = async () => {
        setIsFading(true);

        if (bgmRef.current && bgmRef.current.fadeOut) {
            await bgmRef.current.fadeOut();
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        changeView('new');
        setIsFading(false);
    };




    const renderMenuContent = () => {
        switch (view) {
            case 'title':
                return <TitleScreen onTimeout={() => changeView('start')} />;
            case 'start':
                return <StartScreen onStart={() => changeView('menu')} />;
            case 'menu':
                return <MenuOptions onNewGame={handleStartNewGame} onChangeView={changeView} />;
            case 'load':
                return <LoadScreen onBack={() => changeView('menu')} />;
            case 'save':
                return <SaveScreen onBack={() => changeView('menu')} />;
            case 'options':
                return <OptionsScreen onBack={() => changeView('menu')} />;
            case 'debug':
                return <DebugScreen onBack={() => changeView('menu')} />;
            default:
                return null;
        }
    };

    return (
        <>
            {view !== 'new' && (
                <div className="main-container">
                    <img src={tituloImage} alt="Título del juego" className="main-title-image" />
                    <div className="main-overlay">{renderMenuContent()}</div>
                    <div className={`main-fade ${isFading ? 'main-fade--active' : ''}`} />
                    <BackgroundMusic ref={bgmRef} active={['menu', 'load', 'save', 'options', 'debug'].includes(view)} />
                </div>
            )}
            {view === 'new' && <GameStart />}
        </>
    );
}
