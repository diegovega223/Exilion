import damageConfig from './damageConfig';
const calculateDamage = (attacker, defender, isDefending = false) => {
  const { multipliers } = damageConfig;
  const critChance = (attacker.crit || 0) + ((attacker.luck || 0) / 2);
  const isCritical = Math.random() * 100 < critChance;
  let baseDamage = attacker.atk * multipliers.playerAttack - defender.def * multipliers.defenseEffectiveness;
  if (!isCritical) {
    const variationPercent = 0.1;
    const min = 1 - variationPercent;
    const max = 1 + variationPercent;
    const randomMultiplier = Math.random() * (max - min) + min;
    baseDamage = baseDamage * randomMultiplier;
  }
  if (isDefending) {
    baseDamage *= multipliers.defendingReduction;
  }
  let finalDamage = Math.max(Math.floor(baseDamage), 0);
  if (isCritical) {
    finalDamage = Math.round(finalDamage * multipliers.criticalMultiplier);
  }
  console.log(
    `[🛡️ DAMAGE DEBUG]`,
    `Atacante: ${attacker.name || '??'} (ATK: ${attacker.atk}, CRIT: ${attacker.crit || 0}%, LUCK: ${attacker.luck || 0})`,
    `Defensor: ${defender.name || '??'} (DEF: ${defender.def})`,
    `Defendiendo: ${isDefending}`,
    `CRÍTICO: ${isCritical ? '✅ SÍ' : '❌ NO'}`,
    `Daño final: ${finalDamage}`
  );
  return finalDamage;
};
export default calculateDamage;
