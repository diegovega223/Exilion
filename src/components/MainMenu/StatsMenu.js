import React from 'react';
import { useGame } from '../system/GameProvider';
import { razasDisponibles, clavesMental, clavesFisico } from '../../data/characterData';

export default function StatsMenu() {
  const { state } = useGame();

  const razaObj = razasDisponibles.find(
    r => r.nombre.toLowerCase() === (state.raza || '').toLowerCase()
  );

  const getMentalDetail = (clave) => clavesMental.find(c => c.clave === clave);
  const getFisicoDetail = (clave) => clavesFisico.find(c => c.clave === clave);

  return (
    <div className="stats-menu-container">
      <div className="menu-test stats-menu-panel visible">
        <h3 className="menu-test__title">📜 Stats del Jugador</h3>

        <div className="menu-test__section">
          <div className="menu-test__label">
            <strong>Nombre:</strong> {state.nombre || 'No asignado'}
          </div>
          <div className="menu-test__label">
            <strong>Edad:</strong> {state.edad || 'No asignada'}
          </div>
          <div
            className={`menu-test__label help-icon${razaObj ? '' : ' no-help'}`}
            title={razaObj ? razaObj.descripcion : ''}
          >
            <strong>Raza:</strong>{' '}
            {razaObj ? `${razaObj.emoji} ${razaObj.nombre}` : (state.raza || 'No asignada')}
          </div>
        </div>

        <div className="menu-test__label">
          <strong>🌟 Reputación:</strong> {state.reputacion}
        </div>
        <div className="menu-test__label">
          <strong>💰 Oro:</strong> {state.oro ?? 0}
        </div>
        <div className="menu-test__label">
          <strong>⏳ Tiempo de juego:</strong> {formatTiempo(state.tiempoJuego)}
        </div>

        <h4 className="menu-test__label">🤝 Afinidad:</h4>
        {Object.entries(state.afinidad).length === 0 ? (
          <div className="menu-test__info">No hay afinidades aún</div>
        ) : (
          <ul>
            {Object.entries(state.afinidad).map(([personaje, valor]) => (
              <li key={personaje}>
                {personaje}: {valor}
              </li>
            ))}
          </ul>
        )}

        <h4 className="menu-test__label">🧠 Stats Mentales:</h4>
        {Object.entries(state.mental).length === 0 ? (
          <div className="menu-test__info">No hay stats mentales</div>
        ) : (
          <ul>
            {Object.entries(state.mental).map(([stat, valor]) => {
              const detalle = getMentalDetail(stat);
              return (
                <li
                  key={stat}
                  className={detalle ? 'help-icon' : ''}
                  title={detalle ? detalle.descripcion : ''}
                >
                  {detalle ? (
                    <>
                      {detalle.icono} <strong>{detalle.clave}</strong>: {valor}
                    </>
                  ) : (
                    `${stat}: ${valor}`
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <h4 className="menu-test__label">💪 Stats Físicos:</h4>
        {Object.entries(state.fisico).length === 0 ? (
          <div className="menu-test__info">No hay stats físicos</div>
        ) : (
          <ul>
            {Object.entries(state.fisico).map(([stat, valor]) => {
              const detalle = getFisicoDetail(stat);
              return (
                <li
                  key={stat}
                  className={detalle ? 'help-icon' : ''}
                  title={detalle ? detalle.descripcion : ''}
                >
                  {detalle ? (
                    <>
                      {detalle.icono} <strong>{detalle.clave}</strong>: {valor}
                    </>
                  ) : (
                    `${stat}: ${valor}`
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

// Formato para mostrar tiempo de juego como "1h 23m"
function formatTiempo(mins) {
  const h = Math.floor((mins || 0) / 60);
  const m = (mins || 0) % 60;
  return `${h}h ${m}m`;
}
