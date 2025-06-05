import { useEffect } from 'react';
import DamageCalculator from '../components/Battles/DamageCalculator';

export default function useEnemyTurn({
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
}) {
  useEffect(() => {
    if (!enemyList || enemyList.length === 0) return;
    const getCombatantType = (idx) => (idx === 0 ? 'player' : 'enemy');
    if (getCombatantType(turnIndex) !== 'enemy') {
      setActiveEnemyIndex(null);
      return;
    }
    let enemy = enemyList[turnIndex - 1];
    if (!enemy || enemy.currentHp <= 0) {
      setActiveEnemyIndex(null);
      setTimeout(() => nextTurn(), 300);
      return;
    }
    setActiveEnemyIndex(turnIndex - 1);
    setIsShaking(true);
    const playerHitAudio = new Audio(require('../assets/audio/se/hit.ogg'));
    playerHitAudio.play();

    const defendingNow = isDefending;
    const dmg = DamageCalculator(enemy.stats, player.stats, defendingNow);

    if (typeof setPlayerHp === 'function') {
      setPlayerHp(prev => Math.max(prev - dmg, 0));
    }
    setFloatingDamage({ index: 'player', value: dmg });
    setTimeout(() => setFloatingDamage(null), 600);
    showMessage(`${enemy.name} ataca e inflige ${dmg} de daño.`);
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
  }, [turnIndex]);
}