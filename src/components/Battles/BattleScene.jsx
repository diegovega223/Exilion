import { useState, useCallback, useEffect } from 'react';
import { nextTurnIndex, getCombatantType, playerAttack, enemyAttack } from './TurnSystem';
import calculateDamage from './DamageCalculator';
import checkBattleEnd from './BattleEnd';
import usePlayer from '../../hooks/usePlayer';
import useEnemies from '../../hooks/useEnemies';
import useBattleAudio from '../../hooks/useBattleAudio';
import PlayerHpBar from './PlayerHpBar';
import EnemyList from './EnemyList';
import BattleMenu from './BattleMenu';
import clickSfx from '../../assets/audio/se/select.ogg';
import battleMusic from '../../assets/audio/bgm/a-new-adventure.ogg';

const BattleScene = ({ battleback1, battleback2, enemies, music = battleMusic, isBoss }) => {
  const [menuState, setMenuState] = useState('main');
  const [turnIndex, setTurnIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [isDefending, setIsDefending] = useState(false);

  const { player, playerHp, setPlayerHp } = usePlayer();
  const { enemyList, setEnemyList } = useEnemies(enemies);
  const { playClick } = useBattleAudio(music, clickSfx);

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
    setTurnIndex(prev => nextTurnIndex(prev, totalCombatants));
  }, [totalCombatants]);

  const handlePlayerAttack = useCallback(() => {
    const { updatedEnemies } = playerAttack(player, enemyList, calculateDamage, showMessage);
    setEnemyList(updatedEnemies);
    const result = checkBattleEnd(playerHp, updatedEnemies);
    if (result === 'victory') {
      showMessage('¡Has ganado la batalla!', 2500);
      return;
    }
    nextTurn();
  }, [enemyList, nextTurn, player, playerHp, showMessage, setEnemyList]);

  const handlePlayerDefend = useCallback(() => {
    showMessage(`${player.name} se defiende. Daño reducido en el próximo ataque.`);
    setIsDefending(true);
    nextTurn();
  }, [nextTurn, player.name, showMessage]);

  useEffect(() => {
    if (getCombatantType(turnIndex) !== 'enemy') return;
    if (enemyList.length === 0) return;
    const enemy = enemyList[turnIndex - 1];
    if (!enemy || enemy.currentHp <= 0) {
      nextTurn();
      return;
    }
    const dmg = enemyAttack(enemy, player.stats, isDefending, calculateDamage, showMessage);
    setPlayerHp(prevHp => {
      const newHp = Math.max(prevHp - dmg, 0);
      const result = checkBattleEnd(newHp, enemyList);
      if (result === 'defeat') showMessage('¡Has sido derrotado!', 2500);
      return newHp;
    });
    setIsDefending(false);
    const timer = setTimeout(nextTurn, 3000);
    return () => clearTimeout(timer);
  }, [turnIndex, enemyList, isDefending, nextTurn, player.stats, showMessage, setPlayerHp]);

  return (
    <div className={`battle-scene ${isBoss ? 'boss' : ''}`}>
      <div className="battle-scene-wrapper">
        <div className="battle-scene-content">
          <div className="battleback-layer back1" style={{ backgroundImage: `url(${battleback1})` }} />
          <div className="battleback-layer back2" style={{ backgroundImage: `url(${battleback2})` }} />
          <div className="battle-entities">
            <EnemyList enemyList={enemyList} playClick={playClick} />
          </div>
        </div>
      </div>
      <div className="status-bar">
        <PlayerHpBar player={player} playerHp={playerHp} />
      </div>
      <BattleMenu
        menuState={menuState}
        handleClick={handleClick}
        handlePlayerAttack={handlePlayerAttack}
        handlePlayerDefend={handlePlayerDefend}
        setMenuState={setMenuState}
        showMessage={showMessage}
        turnIndex={turnIndex}
        getCombatantType={getCombatantType}
      />
      <div className="turn-indicator bottom-left">
        Turno de: <strong>{getCombatantType(turnIndex) === 'player' ? player.name : enemyList[turnIndex - 1]?.name || '...'}</strong>
      </div>
      {message && (
        <div className="message-box">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default BattleScene;