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
import useEnemyTurn from '../../hooks/useEnemyTurn'; // Nuevo hook


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

  // Hook que maneja el turno enemigo (antes era un useEffect largo aquí)
  useEnemyTurn({
    turnIndex,
    enemyList,
    player,
    setPlayerHp,
    setFloatingDamage,
    setIsSelectingEnemy,
    setSelectedEnemyIndex,
    setActiveEnemyIndex,
    setIsShaking,
    showMessage,
    nextTurn,
    isDefending
  });

  // Fin de batalla y victoria/derrota
  const handleVictoryClose = () => {
    dispatch({ type: 'SET_EXPERIENCE', value: state.experience + victoryExp });
    dispatch({ type: 'SET_GOLD', value: state.gold + victoryGold });
    setShowVictory(false);
  };

  // Chequeo de fin de batalla
  // (puedes extraer esto a otro hook si quieres limpiar más)
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
  }, [playerHp, enemyList, battleResult, state.experience, state.gold, victoryExp, victoryGold]);

  // Resetear defensa al volver al turno del jugador
  useEffect(() => {
    if (getCombatantType(turnIndex) === 'player' && isDefending) {
      setIsDefending(false);
    }
  }, [turnIndex, isDefending]);

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