import React from 'react';
import { GameProvider } from './components/system/GameProvider';
import MainMenu from './components/MainMenu/MainMenu';
// import Intro from './components/Intro/Intro';
import './styles/main.scss';

function App() {
  return (
    <GameProvider>
      <MainMenu />
      {/* <Intro /> */}
    </GameProvider>
  );
}

export default App;
