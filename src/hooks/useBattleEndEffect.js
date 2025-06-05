import { useEffect } from 'react';

export default function useBattleEndEffect({
    playerHp,
    enemyList,
    battleResult,
    setBattleResult,
    setShowUI,
    setVictoryMonsters,
    setVictoryExp,
    setVictoryGold,
    setShowVictory,
    victoryMusic
}) {
    useEffect(() => {
        const result = window.checkBattleEnd
            ? window.checkBattleEnd(playerHp, enemyList)
            : null;
        if (result && !battleResult) {
            setBattleResult(result);
            setShowUI(false);
            if (result === 'victory') {
                const monsters = enemyList.map(e => ({
                    name: e.name,
                    exp: e.experience || e.exp || 0,
                    gold: e.gold || 0
                }));
                setVictoryMonsters(monsters);
                setVictoryExp(monsters.reduce((sum, m) => sum + m.exp, 0));
                setVictoryGold(monsters.reduce((sum, m) => sum + m.gold, 0));
                setTimeout(() => setShowVictory(true), 2000);
            }
            if (window.battleBgm) {
                const fadeOut = setInterval(() => {
                    if (window.battleBgm.volume > 0.05) {
                        window.battleBgm.volume -= 0.05;
                    } else {
                        window.battleBgm.pause();
                        window.battleBgm.currentTime = 0;
                        clearInterval(fadeOut);
                        const victory = new Audio(victoryMusic);
                        victory.volume = 1;
                        victory.play();
                    }
                }, 100);
            }
        }
    }, [
        playerHp,
        enemyList,
        battleResult,
        setBattleResult,
        setShowUI,
        setVictoryMonsters,
        setVictoryExp,
        setVictoryGold,
        setShowVictory,
        victoryMusic
    ]);
}