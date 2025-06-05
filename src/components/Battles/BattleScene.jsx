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
import VictoryModal from './VictoryModal';
import { useGame } from '../system/GameProvider';
import useEnemyTurn from '../../hooks/useEnemyTurn';
import useBattleEnd from '../../hooks/useBattleEnd';
import useBattleMenu from '../../hooks/useBattleMenu';

const BattleScene = ({ battleback1, battleback2, enemies, music = battleMusic, isBoss }) => {
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
  const { player, playerHp, setPlayerHp } = usePlayer();
  const { enemyList, setEnemyList } = useEnemies(enemies);
  const { playClick } = useBattleAudio(music, clickSfx);
  const { state, dispatch } = useGame();

  const {
    showUI,
    showVictory,
    victoryExp,
    victoryGold,
    victoryMonsters,
    handleVictoryClose,
    showDefeat
  } = useBattleEnd({
    playerHp,
    enemyList,
    state,
    dispatch,
    victoryMusic
  });

  const showMessage = useCallback((text, duration = 1500) => {
    setMessage(text);
    setTimeout(() => setMessage(''), duration);
  }, []);

  const totalCombatants = 1 + enemyList.length;
  const nextTurn = useCallback(() => {
    setTurnIndex(prev => nextTurnIndex(prev, totalCombatants, enemyList));
  }, [totalCombatants, enemyList]);

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

  const {
    menuState,
    setMenuState,
    handleClick,
    handleAttackButton,
    handlePlayerDefend,
  } = useBattleMenu({
    playClick,
    showMessage,
    setIsSelectingEnemy,
    setSelectedEnemyIndex,
    setIsDefending,
    nextTurn,
    player,
  });

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