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
  musicName = 'battleTheme3',
}) {
  const musicData = musicLibrary[musicName];

  if (!musicData) {
    console.warn(`⚠️ Tema de música '${musicName}' no encontrado. Usando silencio.`);
  }

const filteredEnemies = activeEnemyIds.map((id, idx) => {
  const data = enemiesData.find(enemy => enemy.id === id);
  if (!data) return null;
  const enemy = new Enemy(data);
  const count = activeEnemyIds.slice(0, idx + 1).filter(eid => eid === id).length;
  const letter = String.fromCharCode(64 + count);
  return {
    ...enemy,
    image: enemyImages[data.image],
    name: activeEnemyIds.filter(eid => eid === id).length > 1
      ? `${enemy.name} ${letter}`
      : enemy.name,
  };
}).filter(Boolean);

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
