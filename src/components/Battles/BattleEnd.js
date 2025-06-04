const checkBattleEnd = (playerHp, enemies) => {
    const allEnemiesDefeated = enemies.every(e => e.currentHp <= 0);
    const playerDead = playerHp <= 0;

    if (allEnemiesDefeated) {
        return 'victory';
    } else if (playerDead) {
        return 'defeat';
    }
    return null;
};

export default checkBattleEnd;
