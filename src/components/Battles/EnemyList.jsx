const EnemyList = ({ enemyList, playClick }) => (
  <div className="enemy-list">
    {enemyList.map((enemy, index) => (
      <div key={index} className="enemy" onMouseEnter={playClick}>
        <img src={enemy.image} alt={enemy.name} />
        <p>
          {enemy.name} ({enemy.currentHp} HP)
        </p>
      </div>
    ))}
  </div>
);
export default EnemyList;