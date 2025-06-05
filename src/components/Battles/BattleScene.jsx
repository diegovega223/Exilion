import { useState, useCallback, useEffect } from 'react';
import usePlayer from '../../hooks/usePlayer';
import useEnemies from '../../hooks/useEnemies';
import useBattleAudio from '../../hooks/useBattleAudio';
import usePlayerAttack from '../../hooks/usePlayerAttack';
import { nextTurnIndex, getCombatantType } from './TurnSystem';
import PlayerHpBar from './PlayerHpBar';
import EnemyList from './EnemyList';
import BattleMenu from './BattleMenu';
import MessageBox from './MessageBox';
import TurnIndicator from './TurnIndicator';
import clickSfx from '../../assets/audio/se/select.ogg';
import battleMusic from '../../assets/audio/bgm/a-new-adventure.ogg';
import victoryMusic from '../../assets/audio/bgm/victory2.ogg';
import checkBattleEnd from './BattleEnd';
import VictoryModal from './VictoryModal';
import { useGame } from '../system/GameProvider';

const BattleScene = ({ battleback1, battleback2, enemies, music = battleMusic, isBoss }) => {
  const [menuState, setMenuState] = useState('main');
  const [turnIndex, setTurnIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [isDefending, setIsDefending] = useState(false);
  const [selectedEnemyIndex, setSelectedEnemyIndex] = useState(null);
  const [isSelectingEnemy, setIsSelectingEnemy] = useState(false);
  const [damagedEnemyIndex, setDamagedEnemyIndex] = useState(null);
  const [deadEnemies, setDeadEnemies] = useState([]);
  const [floatingDamage, setFloatingDamage] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [activeEnemyIndex, setActiveEnemyIndex] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [showUI, setShowUI] = useState(true);
  const [showVictory, setShowVictory] = useState(false);
  const [victoryExp, setVictoryExp] = useState(0);
  const [victoryGold, setVictoryGold] = useState(0);
  const [victoryMonsters, setVictoryMonsters] = useState([]);
  const { player, playerHp, setPlayerHp } = usePlayer();
  const { enemyList, setEnemyList } = useEnemies(enemies);
  console.log('Música recibida:', music);
  const { playClick } = useBattleAudio(music, clickSfx);
  const { state, dispatch } = useGame();
  const [showDefeat, setShowDefeat] = useState(false);

  const showMessage = useCallback((text, duration = 1500) => {
    setMessage(text);
    setTimeout(() => setMessage(''), duration);
  }, []);

  const handleClick = useCallback((callback) => {
    playClick();
    callback();
  }, [playClick]);

  const totalCombatants = 1 + enemyList.length;
  const nextTurn = useCallback(() => {
    setTurnIndex(prev => nextTurnIndex(prev, totalCombatants, enemyList));
  }, [totalCombatants, enemyList]);

  const handleAttackButton = useCallback(() => {
    setIsSelectingEnemy(true);
    showMessage('Selecciona un enemigo para atacar.');
  }, [showMessage]);

  const { handleEnemyClick } = usePlayerAttack({
    isSelectingEnemy,
    turnIndex,
    enemyList,
    player,
    setDamagedEnemyIndex,
    setFloatingDamage,
    setEnemyList,
    showMessage,
    setDeadEnemies,
    setSelectedEnemyIndex,
    setIsSelectingEnemy,
    playerHp,
    nextTurn
  });

  const handlePlayerDefend = useCallback(() => {
    showMessage(`${player.name} se defiende. Daño reducido en el próximo ataque.`);
    setIsDefending(true);
    setIsSelectingEnemy(false);
    setSelectedEnemyIndex(null);
    nextTurn();
  }, [nextTurn, player.name, showMessage]);

  useEffect(() => {
    if (getCombatantType(turnIndex) !== 'enemy') {
      setActiveEnemyIndex(null);
      return;
    }
    if (enemyList.length === 0) return;
    let enemy = enemyList[turnIndex - 1];
    if (!enemy || enemy.currentHp <= 0) {
      setActiveEnemyIndex(null);
      setTimeout(() => nextTurn(), 300);
      return;
    }
    setActiveEnemyIndex(turnIndex - 1);
    setIsShaking(true);
    const playerHitAudio = new Audio(require('../../assets/audio/se/hit.ogg'));
    playerHitAudio.play();
    const dmg = require('./DamageCalculator').default(enemy.stats, player.stats, isDefending);
    if (typeof setPlayerHp === 'function') {
      setPlayerHp(prev => Math.max(prev - dmg, 0));
    }
    setFloatingDamage({ index: 'player', value: dmg });
    setTimeout(() => setFloatingDamage(null), 600);
    showMessage(`${enemy.name} ataca e inflige ${dmg} de daño.`);
    setIsDefending(false);
    setIsSelectingEnemy(false);
    setSelectedEnemyIndex(null);
    const shakeTimer = setTimeout(() => setIsShaking(false), 1000);
    const timer = setTimeout(() => {
      setActiveEnemyIndex(null);
      nextTurn();
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(shakeTimer);
    };
  }, [turnIndex, isDefending]);

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
  }, [playerHp, enemyList, battleResult]);
  const handleVictoryClose = () => {
    dispatch({ type: 'SET_EXPERIENCE', value: state.experience + victoryExp });
    dispatch({ type: 'SET_GOLD', value: state.gold + victoryGold });
    setShowVictory(false);
  };

  return (
    <div className={`battle-scene ${isBoss ? 'boss' : ''} ${isShaking ? 'screen-shake' : ''} ${!showUI ? 'battle-finished' : ''}`}>
      <div className="battle-scene-wrapper">
        <div className="battle-scene-content">
          <div className="battleback-layer back1" style={{ backgroundImage: `url(${battleback1})` }} />
          <div className="battleback-layer back2" style={{ backgroundImage: `url(${battleback2})` }} />
          <div className="battle-entities">
            <EnemyList
              enemyList={enemyList}
              playClick={playClick}
              selectedEnemyIndex={selectedEnemyIndex}
              onSelectEnemy={isSelectingEnemy ? (index) => {
                setSelectedEnemyIndex(index);
                handleEnemyClick(index);
              } : undefined}
              isSelectingEnemy={isSelectingEnemy}
              damagedEnemyIndex={damagedEnemyIndex}
              deadEnemies={deadEnemies}
              floatingDamage={floatingDamage}
              activeEnemyIndex={activeEnemyIndex}
            />
          </div>
        </div>
      </div>
      {showUI && (
        <>
          <div className="status-bar">
            <PlayerHpBar player={player} playerHp={playerHp} />
          </div>
          <BattleMenu
            menuState={menuState}
            handleClick={handleClick}
            handlePlayerAttack={handleAttackButton}
            handlePlayerDefend={handlePlayerDefend}
            setMenuState={setMenuState}
            showMessage={showMessage}
            turnIndex={turnIndex}
            getCombatantType={getCombatantType}
            isSelectingEnemy={isSelectingEnemy}
          />
          <TurnIndicator
            turnIndex={turnIndex}
            getCombatantType={getCombatantType}
            player={player}
            enemyList={enemyList}
          />
        </>
      )}
      <MessageBox message={message} visible={!!message} />
      {showVictory && (
        <VictoryModal
          exp={victoryExp}
          gold={victoryGold}
          monsters={victoryMonsters}
          playerName={player.name}
          playerExp={state.experience}
          playerExpMax={state.experienceMax}
          onClose={handleVictoryClose}
        />
      )}
      {showDefeat && (null)}
    </div>
  );
};

export default BattleScene;
