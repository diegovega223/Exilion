import { useState } from 'react';
import { Enemy } from '../data/Enemy';

const createEnemyInstances = (enemyRawData) =>
  enemyRawData.map(data => new Enemy(data));

export default function useEnemies(enemies) {
  const [enemyList, setEnemyList] = useState(() =>
    createEnemyInstances(enemies).map(enemy => ({ ...enemy, currentHp: enemy.stats.hp }))
  );
  return { enemyList, setEnemyList };
}