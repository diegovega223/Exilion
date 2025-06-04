const PlayerHpBar = ({ player, playerHp }) => (
    <div className="player-hp-bar">
        <p>
            <strong>{player.name}</strong>: {playerHp} / {player.stats.hp} HP
        </p>
        <div className="hp-bar-container">
            <div
                className="hp-bar-fill"
                style={{ width: `${(playerHp / player.stats.hp) * 100}%` }}
            />
        </div>
    </div>
);
export default PlayerHpBar;