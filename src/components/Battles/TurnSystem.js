export const nextTurnIndex = (turnIndex, totalCombatants) => {
  return (turnIndex + 1) % totalCombatants;
};

export const getCombatantType = (turnIndex) => {
  return turnIndex === 0 ? 'player' : 'enemy';
};

export const playerAttack = (player, enemyList, calculateDamage, showMessage, targetIndex = 0) => {
  const newEnemies = [...enemyList];
  const target = newEnemies[targetIndex];
  if (!target || target.currentHp <= 0) return { updatedEnemies: newEnemies, result: null };
  const dmg = calculateDamage(player.stats, target.stats);
  target.currentHp = Math.max(target.currentHp - dmg, 0);
  showMessage(`${player.name} ataca a ${target.name} e inflige ${dmg} de daño.`);
  if (target.currentHp <= 0) {
    showMessage(`${target.name} ha sido derrotado.`, 2000);
  }
  return {
    updatedEnemies: newEnemies,
  };
};

export const enemyAttack = (enemy, playerStats, isDefending, calculateDamage, showMessage) => {
  const dmg = calculateDamage(enemy.stats, playerStats, isDefending);
  showMessage(`${enemy.name} ataca e inflige ${dmg} de daño.`);
  return dmg;
};
