import React from 'react';
import { useGame } from '@game';
import { razasDisponibles, clavesMental, clavesFisico } from '../../data/characterData';

export default function StatsMenu() {
  const { state } = useGame();

  const raceObj = razasDisponibles.find(
    r => r.nombre.toLowerCase() === (state.race || '').toLowerCase()
  );

  const getMentalDetail = (key) => clavesMental.find(c => c.clave === key);
  const getPhysicalDetail = (key) => clavesFisico.find(c => c.clave === key);

  return (
    <div className="stats-menu-container">
      <div className="menu-test stats-menu-panel visible">
        <h3 className="menu-test__title">📜 Player Stats</h3>

        <div className="menu-test__section">
          <div className="menu-test__label">
            <strong>Name:</strong> {state.name || 'Not assigned'}
          </div>
          <div className="menu-test__label">
            <strong>Age:</strong> {state.age || 'Not assigned'}
          </div>
          <div
            className={`menu-test__label help-icon${raceObj ? '' : ' no-help'}`}
            title={raceObj ? raceObj.descripcion : ''}
          >
            <strong>Race:</strong>{' '}
            {raceObj ? `${raceObj.emoji} ${raceObj.nombre}` : (state.race || 'Not assigned')}
          </div>
        </div>

        <div className="menu-test__label">
          <strong>🌟 Reputation:</strong> {state.reputation ?? 'N/A'}
        </div>
        <div className="menu-test__label">
          <strong>💰 Gold:</strong> {state.gold ?? 0}
        </div>
        <div className="menu-test__label">
          <strong>⏳ Playtime:</strong> {formatTime(state.playTime)}
        </div>

        <h4 className="menu-test__label">🤝 Affinity:</h4>
        {Object.entries(state.affinity).length === 0 ? (
          <div className="menu-test__info">No affinities yet</div>
        ) : (
          <ul>
            {Object.entries(state.affinity).map(([character, value]) => (
              <li key={character}>
                {character}: {value}
              </li>
            ))}
          </ul>
        )}

        <h4 className="menu-test__label">🧠 Mental Stats:</h4>
        {Object.entries(state.mental).length === 0 ? (
          <div className="menu-test__info">No mental stats</div>
        ) : (
          <ul>
            {Object.entries(state.mental).map(([stat, value]) => {
              const detail = getMentalDetail(stat);
              return (
                <li
                  key={stat}
                  className={detail ? 'help-icon' : ''}
                  title={detail ? detail.descripcion : ''}
                >
                  {detail ? (
                    <>
                      {detail.icono} <strong>{detail.clave}</strong>: {value}
                    </>
                  ) : (
                    `${stat}: ${value}`
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <h4 className="menu-test__label">💪 Physical Stats:</h4>
        {Object.entries(state.physical).length === 0 ? (
          <div className="menu-test__info">No physical stats</div>
        ) : (
          <ul>
            {Object.entries(state.physical).map(([stat, value]) => {
              const detail = getPhysicalDetail(stat);
              return (
                <li
                  key={stat}
                  className={detail ? 'help-icon' : ''}
                  title={detail ? detail.descripcion : ''}
                >
                  {detail ? (
                    <>
                      {detail.icono} <strong>{detail.clave}</strong>: {value}
                    </>
                  ) : (
                    `${stat}: ${value}`
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function formatTime(minutes) {
  const h = Math.floor((minutes || 0) / 60);
  const m = (minutes || 0) % 60;
  return `${h}h ${m}m`;
}
