import { useCallback } from 'react';
import calculateDamage from '../components/Battles/DamageCalculator';
import { getCombatantType } from '../components/Battles/TurnSystem';
import playerHitSfx from '../assets/audio/se/hit.ogg';

export default function useEnemyAttack({
    turnIndex,
    enemyList,
    player,
    isDefending,
    setFloatingDamage,
    showMessage,
    nextTurn,
    setIsDefending,
    setIsSelectingEnemy,
    setSelectedEnemyIndex,
    setActiveEnemyIndex,
    setIsShaking
}) {
    const handleEnemyTurn = useCallback(() => {
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
        const playerHitAudio = new Audio(playerHitSfx);
        playerHitAudio.play();
        const dmg = calculateDamage(enemy.stats, player.stats, isDefending);
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
    }, [
        turnIndex, // solo lo necesario
        enemyList, // si enemyList cambia en cada render, memoizalo en el padre
        player,    // si player cambia en cada render, memoizalo en el padre
        isDefending,
        setFloatingDamage,
        showMessage,
        nextTurn,
        setIsDefending,
        setIsSelectingEnemy,
        setSelectedEnemyIndex,
        setActiveEnemyIndex,
        setIsShaking
    ]);
    return { handleEnemyTurn };
}