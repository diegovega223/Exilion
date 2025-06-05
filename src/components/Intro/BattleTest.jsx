
import { startBattle } from '../../utils/startBattle';

const BattleTest = () => {
  return startBattle({
    activeEnemyIds: [3,3,3],
    battleback1Name: 'Castle1',
    battleback2Name: 'Brick',
    isBoss: false,
    musicName: 'battleTheme4',
  });
};

export default BattleTest;
