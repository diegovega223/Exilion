import React from 'react';
import BattleScene from '../components/Battles/BattleScene';
import battlebackImages from '../data/battlebackImages';
import { enemiesData } from '../data/enemiesData';
import enemyImages from '../data/enemyImages';
import { Enemy } from '../data/Enemy';
import musicLibrary from '../data/musicLibrary';

export function startBattle({
  activeEnemyIds,
  battleback1Name,
  battleback2Name,
  isBoss = false,
  musicName = 'battleTheme',
}) {
  const musicData = musicLibrary[musicName];

  if (!musicData) {
    console.warn(`⚠️ Tema de música '${musicName}' no encontrado. Usando silencio.`);
  }

  const filteredEnemies = enemiesData
    .filter(enemy => activeEnemyIds.includes(enemy.id))
    .map(data => {
      const enemy = new Enemy(data);
      return {
        ...enemy,
        image: enemyImages[data.image],
      };
    });

  return (
    <BattleScene
      battleback1={battlebackImages.battleback1[battleback1Name]}
      battleback2={battlebackImages.battleback2[battleback2Name]}
      enemies={filteredEnemies}
      music={musicData?.path || null}
      isBoss={isBoss}
    />
  );
}
