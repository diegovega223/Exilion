import React from 'react';

const EnemyList = ({
  enemyList,
  playClick,
  selectedEnemyIndex,
  onSelectEnemy,
  isSelectingEnemy,
  damagedEnemyIndex,
  deadEnemies,
  floatingDamage,
  activeEnemyIndex,
}) => (
  <div className="enemy-list">
    {enemyList.map((enemy, index) => {
      if (deadEnemies && deadEnemies.includes(index)) return null;
      const isDead = enemy.currentHp <= 0;
      return (
        <div
          key={index}
          className={
            `enemy` +
            (selectedEnemyIndex === index ? ' selected' : '') +
            (damagedEnemyIndex === index ? ' damaged' : '') +
            (isDead ? ' dead' : '') +
            (activeEnemyIndex === index ? ' active' : '')
          }
          onClick={() => isSelectingEnemy && !isDead && onSelectEnemy && onSelectEnemy(index)}
          onMouseEnter={playClick}
          style={{
            cursor: isSelectingEnemy && !isDead ? 'pointer' : 'default',
            position: 'relative',
            zIndex: activeEnemyIndex === index ? 2 : 1,
          }}
        >
          <img src={enemy.image} alt={enemy.name} />
          <p>
            {enemy.name} ({enemy.currentHp} HP)
            {isDead && <span style={{ color: 'red', marginLeft: 8 }}>(KO)</span>}
          </p>
          {floatingDamage && floatingDamage.index === index && (
            <span className="damage-popup">{floatingDamage.value}</span>
          )}
        </div>
      );
    })}
  </div>
);

export default EnemyList;