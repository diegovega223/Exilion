// src/App.js
import React from 'react';
import { GameProvider } from './components/system/GameProvider';
import BattleTest from '../src/components/Intro/BattleTest';
import './styles/main.scss';

function App() {
  return (
    <GameProvider>
      <BattleTest />
    </GameProvider>
  );
}

export default App;
