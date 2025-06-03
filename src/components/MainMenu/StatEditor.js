import React, { useEffect, useState } from 'react';
import { useGame } from '../system/GameProvider';
import { razasDisponibles, clavesMental, clavesFisico } from '../../data/characterData';

export default function StatEditor() {
  const { state, dispatch } = useGame();

  const [tipo, setTipo] = useState('identidad');
  const [clave, setClave] = useState('');
  const [valor, setValor] = useState(0);

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [raza, setRaza] = useState('');

  useEffect(() => {
    if (state.personaje) {
      const { nombre, edad, raza } = state.personaje;
      setNombre(nombre || '');
      setEdad(edad?.toString() || '');
      setRaza(raza || '');
    }
  }, [state.personaje]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (['afinidad', 'mental', 'fisico'].includes(tipo) && !clave) {
      return alert('La clave es requerida');
    }

    const numValor = Number(valor);
    if (['afinidad', 'mental', 'fisico', 'reputacion'].includes(tipo)) {
      if (isNaN(numValor)) return alert('El valor debe ser un número');

      switch (tipo) {
        case 'afinidad':
          dispatch({ type: 'SET_AFINIDAD', personaje: clave, valor: numValor });
          break;
        case 'reputacion':
          dispatch({ type: 'UPDATE_REPUTACION', valor: numValor });
          break;
        case 'mental':
          dispatch({ type: 'SET_STAT_MENTAL', stat: clave, valor: numValor });
          break;
        case 'fisico':
          dispatch({ type: 'SET_STAT_FISICO', stat: clave, valor: numValor });
          break;
        default:
          break;
      }

      setClave('');
      setValor(0);
    }

    if (tipo === 'identidad') {
      if (!nombre.trim()) return alert('El nombre no puede estar vacío');
      if (!raza || !razasDisponibles.some(r => r.nombre === raza)) return alert('Seleccioná una raza válida');
      const numEdad = parseInt(edad);
      if (isNaN(numEdad) || numEdad <= 0) return alert('Edad inválida');

      dispatch({ type: 'SET_NOMBRE', valor: nombre });
      dispatch({ type: 'SET_EDAD', valor: numEdad });
      dispatch({ type: 'SET_RAZA', valor: raza });

      alert('Identidad actualizada');
    }
  };

  const handleDelete = () => {
    if (tipo !== 'afinidad') {
      alert(`No se puede borrar ${tipo} directamente`);
      return;
    }

    if (!clave) return alert('Clave requerida para borrar');

    dispatch({ type: 'DELETE_AFINIDAD', personaje: clave });

    setClave('');
    setValor(0);
  };

  return (
    <form className="menu-test" onSubmit={handleSubmit}>
      <label className="menu-test__label">
        Tipo de Stat:
        <select className="menu-test__select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="identidad">🧑 Identidad</option>
          <option value="afinidad">🤝 Afinidad</option>
          <option value="reputacion">⭐ Reputación</option>
          <option value="mental">🧠 Mental</option>
          <option value="fisico">💪 Físico</option>
        </select>
      </label>

      {tipo === 'identidad' && (
        <>
          <label className="menu-test__label">
            Nombre:
            <input className="menu-test__input menu-test__input--wide" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </label>

          <label className="menu-test__label">
            Edad:
            <input className="menu-test__input menu-test__input--small" type="number" value={edad} onChange={(e) => setEdad(e.target.value)} required />
          </label>

          <label className="menu-test__label">
            Raza:
            <select className="menu-test__select" value={raza} onChange={(e) => setRaza(e.target.value)} required>
              <option value="">Seleccionar</option>
              {razasDisponibles.map((r) => (
                <option key={r.nombre} value={r.nombre}>
                  {r.emoji} {r.nombre}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

      {['mental', 'fisico'].includes(tipo) && (
        <label className="menu-test__label">
          Clave:
          <select className="menu-test__select help-icon" value={clave} onChange={(e) => setClave(e.target.value)} required>
            <option value="">Seleccionar</option>
            {(tipo === 'mental' ? clavesMental : clavesFisico).map(({ clave, icono, nombre }) => (
              <option key={clave} value={clave}>
                {icono} {nombre}
              </option>
            ))}
          </select>
        </label>
      )}

      {tipo === 'afinidad' && (
        <label className="menu-test__label">
          Clave:
          <input className="menu-test__input menu-test__input--wide" type="text" value={clave} onChange={(e) => setClave(e.target.value)} required />
        </label>
      )}

      {tipo === 'reputacion' && (
        <div className="menu-test__info">Clave no necesaria para reputación</div>
      )}

      {['afinidad', 'mental', 'fisico', 'reputacion'].includes(tipo) && (
        <label className="menu-test__label">
          Valor:
          <input className="menu-test__input menu-test__input--small" type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
        </label>
      )}

      <div className="menu-test__buttons">
        <button type="submit" className="menu-test__button">🛠️ Actualizar</button>
        {tipo === 'afinidad' && (
          <button type="button" onClick={handleDelete} className="menu-test__button menu-test__button--delete">❌ Borrar</button>
        )}
      </div>
    </form>
  );
}
