import { useState, useEffect } from 'react';
import checkBattleEnd from '../components/Battles/BattleEnd';

export default function useBattleEnd({
  playerHp,
  enemyList,
  state,
  dispatch,
  victoryMusic
}) {
  const [battleResult, setBattleResult] = useState(null);
  const [showUI, setShowUI] = useState(true);
  const [showVictory, setShowVictory] = useState(false);
  const [victoryExp, setVictoryExp] = useState(0);
  const [victoryGold, setVictoryGold] = useState(0);
  const [victoryMonsters, setVictoryMonsters] = useState([]);
  const [showDefeat, setShowDefeat] = useState(false);

  useEffect(() => {
    const result = checkBattleEnd(playerHp, enemyList);
    if (result && !battleResult) {
      setBattleResult(result);
      setShowUI(false);
      if (window.battleBgm) {
        const fadeOut = setInterval(() => {
          if (window.battleBgm.volume > 0.05) {
            window.battleBgm.volume -= 0.05;
          } else {
            window.battleBgm.pause();
            window.battleBgm.currentTime = 0;
            clearInterval(fadeOut);
            if (result === 'victory') {
              const victory = new Audio(victoryMusic);
              victory.volume = 1;
              victory.play();
            }
          }
        }, 100);
      }
      if (result === 'victory') {
        const monsters = enemyList.map(e => ({
          name: e.name,
          exp: e.experience || e.exp || 0,
          gold: e.gold || 0
        }));
        setVictoryMonsters(monsters);
        setVictoryExp(monsters.reduce((sum, m) => sum + m.exp, 0));
        setVictoryGold(monsters.reduce((sum, m) => sum + m.gold, 0));
        setTimeout(() => setShowVictory(true), 2000);
      }
      if (result === 'defeat') {
        setTimeout(() => setShowDefeat(true), 2000);
      }
    }
  }, [playerHp, enemyList, battleResult, state.experience, state.gold, victoryExp, victoryGold, victoryMusic]);

  const handleVictoryClose = () => {
    dispatch({ type: 'SET_EXPERIENCE', value: state.experience + victoryExp });
    dispatch({ type: 'SET_GOLD', value: state.gold + victoryGold });
    setShowVictory(false);
  };

  return {
    battleResult,
    showUI,
    showVictory,
    victoryExp,
    victoryGold,
    victoryMonsters,
    showDefeat,
    handleVictoryClose,
    setShowVictory,
    setShowDefeat
  };
}