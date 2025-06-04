import React from 'react';
import { startBattle } from '../../utils/startBattle';

const BattleTest = () => {
  return startBattle({
    activeEnemyIds: [1, 3],
    battleback1Name: 'Castle1',
    battleback2Name: 'Brick',
    isBoss: false,
    musicName: 'battleTheme3',
  });
};

export default BattleTest;
