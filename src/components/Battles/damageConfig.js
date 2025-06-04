// damageConfig.js

const damageConfig = {
    multipliers: {
        playerAttack: 1.2,
        enemyAttack: 1.0,
        defenseEffectiveness: 0.6,
        defendingReduction: 0.5,
        criticalMultiplier: 1.5,
    },

    formulas: {
        calculateDamage: (atk, def, isDefending, multipliers) => {
            let damage = atk * multipliers.playerAttack - def * multipliers.defenseEffectiveness;
            if (isDefending) {
                damage *= multipliers.defendingReduction;
            }
            return Math.max(Math.floor(damage), 0);
        },
    },
};

export default damageConfig;
