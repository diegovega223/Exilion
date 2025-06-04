export const nextTurnIndex = (turnIndex, totalCombatants) => {
  return (turnIndex + 1) % totalCombatants;
};

export const getCombatantType = (turnIndex) => {
  return turnIndex === 0 ? 'player' : 'enemy';
};

export const playerAttack = (player, enemyList, calculateDamage, showMessage) => {
  const newEnemies = [...enemyList];
  const target = newEnemies.find(e => e.currentHp > 0);

  if (!target) return { updatedEnemies: enemyList, result: null };

  const dmg = calculateDamage(player.stats, target.stats);
  target.currentHp -= dmg;

  showMessage(`${player.name} ataca a ${target.name} e inflige ${dmg} de daño.`);

  if (target.currentHp <= 0) {
    showMessage(`${target.name} ha sido derrotado.`, 2000);
  }

  return {
    updatedEnemies: newEnemies.filter(e => e.currentHp > 0),
  };
};

export const enemyAttack = (enemy, playerStats, isDefending, calculateDamage, showMessage) => {
  const dmg = calculateDamage(enemy.stats, playerStats, isDefending);
  showMessage(`${enemy.name} ataca e inflige ${dmg} de daño.`);
  return dmg;
};
