import React, { useEffect, useState } from 'react';
import { useGame } from '@game';
import { razasDisponibles, clavesMental, clavesFisico } from '../../data/characterData';

export default function StatEditor() {
  const { state, dispatch } = useGame();

  const [type, setType] = useState('identity');
  const [key, setKey] = useState('');
  const [value, setValue] = useState(0);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [race, setRace] = useState('');

  useEffect(() => {
    if (state.character) {
      const { name, age, race } = state.character;
      setName(name || '');
      setAge(age?.toString() || '');
      setRace(race || '');
    }
  }, [state.character]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (['affinity', 'mental', 'physical'].includes(type) && !key) {
      return alert('Key is required');
    }

    const numValue = Number(value);
    if (['affinity', 'mental', 'physical', 'reputation'].includes(type)) {
      if (isNaN(numValue)) return alert('Value must be a number');

      switch (type) {
        case 'affinity':
          dispatch({ type: 'SET_AFFINITY', character: key, value: numValue });
          break;
        case 'reputation':
          dispatch({ type: 'UPDATE_REPUTATION', value: numValue });
          break;
        case 'mental':
          dispatch({ type: 'SET_STAT_MENTAL', stat: key, value: numValue });
          break;
        case 'physical':
          dispatch({ type: 'SET_STAT_PHYSICAL', stat: key, value: numValue });
          break;
        default:
          break;
      }

      setKey('');
      setValue(0);
    }

    if (type === 'identity') {
      if (!name.trim()) return alert('Name cannot be empty');
      if (!race || !razasDisponibles.some(r => r.nombre === race)) return alert('Select a valid race');
      const numAge = parseInt(age);
      if (isNaN(numAge) || numAge <= 0) return alert('Invalid age');

      dispatch({ type: 'SET_NAME', value: name });
      dispatch({ type: 'SET_AGE', value: numAge });
      dispatch({ type: 'SET_RACE', value: race });

      alert('Identity updated');
    }
  };

  const handleDelete = () => {
    if (type !== 'affinity') {
      alert(`You can only delete affinity stats directly`);
      return;
    }

    if (!key) return alert('Key required to delete');

    dispatch({ type: 'DELETE_AFFINITY', character: key });

    setKey('');
    setValue(0);
  };

  return (
    <form className="menu-test" onSubmit={handleSubmit}>
      <label className="menu-test__label">
        Stat Type:
        <select className="menu-test__select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="identity">🧑 Identity</option>
          <option value="affinity">🤝 Affinity</option>
          <option value="reputation">⭐ Reputation</option>
          <option value="mental">🧠 Mental</option>
          <option value="physical">💪 Physical</option>
        </select>
      </label>

      {type === 'identity' && (
        <>
          <label className="menu-test__label">
            Name:
            <input
              className="menu-test__input menu-test__input--wide"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="menu-test__label">
            Age:
            <input
              className="menu-test__input menu-test__input--small"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>

          <label className="menu-test__label">
            Race:
            <select
              className="menu-test__select"
              value={race}
              onChange={(e) => setRace(e.target.value)}
              required
            >
              <option value="">Select</option>
              {razasDisponibles.map((r) => (
                <option key={r.nombre} value={r.nombre}>
                  {r.emoji} {r.nombre}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

      {['mental', 'physical'].includes(type) && (
        <label className="menu-test__label">
          Key:
          <select
            className="menu-test__select help-icon"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
          >
            <option value="">Select</option>
            {(type === 'mental' ? clavesMental : clavesFisico).map(({ clave, icono, nombre }) => (
              <option key={clave} value={clave}>
                {icono} {nombre}
              </option>
            ))}
          </select>
        </label>
      )}

      {type === 'affinity' && (
        <label className="menu-test__label">
          Key:
          <input
            className="menu-test__input menu-test__input--wide"
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
          />
        </label>
      )}

      {type === 'reputation' && <div className="menu-test__info">No key needed for reputation</div>}

      {['affinity', 'mental', 'physical', 'reputation'].includes(type) && (
        <label className="menu-test__label">
          Value:
          <input
            className="menu-test__input menu-test__input--small"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </label>
      )}

      <div className="menu-test__buttons">
        <button type="submit" className="menu-test__button">
          🛠️ Update
        </button>
        {type === 'affinity' && (
          <button
            type="button"
            onClick={handleDelete}
            className="menu-test__button menu-test__button--delete"
          >
            ❌ Delete
          </button>
        )}
      </div>
    </form>
  );
}
