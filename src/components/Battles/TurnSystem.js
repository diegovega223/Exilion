export const nextTurnIndex = (turnIndex, totalCombatants, enemyList) => {
  let next = (turnIndex + 1) % totalCombatants;
  while (next !== 0 && enemyList[next - 1]?.currentHp <= 0) {
    next = (next + 1) % totalCombatants;
  }
  return next;
};

export const getCombatantType = (turnIndex) => {
  return turnIndex === 0 ? 'player' : 'enemy';
};

export const playerAttack = (player, enemyList, calculateDamage, showMessage, targetIndex = 0, fixedDamage = null) => {
  const newEnemies = [...enemyList];
  const target = newEnemies[targetIndex];
  if (!target || target.currentHp <= 0) return { updatedEnemies: newEnemies, result: null };
  const dmg = fixedDamage !== null ? fixedDamage : calculateDamage(player.stats, target.stats);
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
