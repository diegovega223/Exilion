const EnemyList = ({ enemyList, playClick, selectedEnemyIndex, onSelectEnemy, isSelectingEnemy }) => (
  <div className="enemy-list">
    {enemyList.map((enemy, index) => (
      <div
        key={index}
        className={`enemy${selectedEnemyIndex === index ? ' selected' : ''}`}
        onClick={() => isSelectingEnemy && onSelectEnemy && onSelectEnemy(index)}
        onMouseEnter={playClick}
        style={{ cursor: isSelectingEnemy ? 'pointer' : 'default' }}
      >
        <img src={enemy.image} alt={enemy.name} />
        <p>
          {enemy.name} ({enemy.currentHp} HP)
        </p>
      </div>
    ))}
  </div>
);

export default EnemyList;