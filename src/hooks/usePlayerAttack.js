import { useCallback } from 'react';
import calculateDamage from '../components/Battles/DamageCalculator';
import { playerAttack, getCombatantType } from '../components/Battles/TurnSystem';
import hitSfx from '../assets/audio/se/hit.ogg';
import deathSfx from '../assets/audio/se/death.ogg';

export default function usePlayerAttack({
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
}) {
    const handleEnemyClick = useCallback((index) => {
        if (!isSelectingEnemy || getCombatantType(turnIndex) !== 'player') return;
        if (!enemyList[index]) return;
        setDamagedEnemyIndex(index);
        const dmg = calculateDamage(player.stats, enemyList[index].stats);
        setFloatingDamage({ index, value: dmg });
        const hitAudio = new Audio(hitSfx);
        hitAudio.play();
        setTimeout(() => {
            const { updatedEnemies } = playerAttack(
                player,
                enemyList,
                calculateDamage,
                showMessage,
                index,
                dmg
            );
            setEnemyList(updatedEnemies);
            setFloatingDamage(null);
            if (updatedEnemies[index].currentHp <= 0) {
                setDamagedEnemyIndex(null);
                const deathAudio = new Audio(deathSfx);
                deathAudio.play();
                setTimeout(() => {
                    setDeadEnemies(prev => [...prev, index]);
                }, 1000);
            } else {
                setDamagedEnemyIndex(null);
            }
            setSelectedEnemyIndex(null);
            setIsSelectingEnemy(false);
            const result = showMessage.checkBattleEnd
                ? showMessage.checkBattleEnd(playerHp, updatedEnemies)
                : null;
            if (result === 'victory') {
                showMessage('¡Has ganado la batalla!', 2500);
                return;
            }
            nextTurn();
        }, 600);
    }, [
        isSelectingEnemy, enemyList, player, playerHp, showMessage, setEnemyList,
        turnIndex, nextTurn, setDamagedEnemyIndex, setFloatingDamage,
        setDeadEnemies, setSelectedEnemyIndex, setIsSelectingEnemy
    ]);
    return { handleEnemyClick };
}