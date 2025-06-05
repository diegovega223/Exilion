import { useState } from 'react';
import { Enemy } from '../data/Enemy';

const createEnemyInstances = (enemyRawData) =>
  enemyRawData.map(data => {
    const instance = new Enemy(data);
    return {
      ...instance,
      name: data.name,
      experience: data.experience,
      gold: data.gold,
      currentHp: instance.stats.hp
    };
  });

export default function useEnemies(enemies) {
  const [enemyList, setEnemyList] = useState(() =>
    createEnemyInstances(enemies)
  );
  return { enemyList, setEnemyList };
}