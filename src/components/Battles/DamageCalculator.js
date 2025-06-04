import damageConfig from './damageConfig';

const calculateDamage = (attacker, defender, isDefending = false) => {
  const { multipliers, formulas } = damageConfig;

  const critChance = (attacker.crit || 0) + ((attacker.luck || 0) / 2);
  const isCritical = Math.random() * 100 < critChance;

  let baseDamage = formulas.calculateDamage(attacker.atk, defender.def, isDefending, multipliers);

  if (!isCritical) {
    const variationPercent = 0.1;
    const min = 1 - variationPercent;
    const max = 1 + variationPercent;
    const randomMultiplier = Math.random() * (max - min) + min;
    baseDamage = Math.round(baseDamage * randomMultiplier);
  }

  const finalDamage = isCritical ? Math.round(baseDamage * multipliers.criticalMultiplier) : baseDamage;

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
