const TurnIndicator = ({ turnIndex, getCombatantType, player, enemyList }) => (
    <div className="turn-indicator bottom-left">
        Turno de: <strong>
            {getCombatantType(turnIndex) === 'player'
                ? player.name
                : enemyList[turnIndex - 1]?.currentHp > 0
                    ? enemyList[turnIndex - 1]?.name
                    : '...'}
        </strong>
    </div>
);
export default TurnIndicator;