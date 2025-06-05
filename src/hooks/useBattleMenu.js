import { useState, useCallback } from 'react';

export default function useBattleMenu({ playClick, showMessage, setIsSelectingEnemy, setSelectedEnemyIndex, setIsDefending, nextTurn, player }) {
    const [menuState, setMenuState] = useState('main');

    const handleClick = useCallback((callback) => {
        playClick();
        callback();
    }, [playClick]);

    const handleAttackButton = useCallback(() => {
        setIsSelectingEnemy(true);
        showMessage('Selecciona un enemigo para atacar.');
    }, [setIsSelectingEnemy, showMessage]);

    const handlePlayerDefend = useCallback(() => {
        showMessage(`${player.name} se defiende. Daño reducido en el próximo ataque.`);
        setIsDefending(true);
        setIsSelectingEnemy(false);
        setSelectedEnemyIndex(null);
        nextTurn();
    }, [showMessage, player, setIsDefending, setIsSelectingEnemy, setSelectedEnemyIndex, nextTurn]);

    return {
        menuState,
        setMenuState,
        handleClick,
        handleAttackButton,
        handlePlayerDefend,
    };
}