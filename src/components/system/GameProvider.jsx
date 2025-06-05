import React, { createContext, useReducer, useContext } from 'react';
import GameDataTemplate from './DebugGameData';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

const GameContext = createContext();

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.value };

    case 'SET_GENDER':
      return { ...state, gender: action.value };

    case 'SET_AGE':
      return { ...state, age: clamp(action.value, 17, 120) };

    case 'SET_RACE':
      return { ...state, race: action.value };

    case 'SET_AFFINITY':
      return {
        ...state,
        affinity: {
          ...state.affinity,
          [action.character]: clamp((state.affinity[action.character] || 0) + action.value, -100, 100),
        },
      };

    case 'UPDATE_REPUTATION':
      return { ...state, reputation: clamp(state.reputation + action.value, -100, 100) };

    case 'SET_MENTAL_STAT':
      return {
        ...state,
        mentalStats: {
          ...state.mentalStats,
          [action.stat]: clamp((state.mentalStats[action.stat] || 0) + action.value, -999, 999),
        },
      };

    case 'SET_COMBAT_STAT':
      return {
        ...state,
        combatStats: {
          ...state.combatStats,
          [action.stat]: clamp((state.combatStats[action.stat] || 0) + action.value, -999, 999),
        },
      };

    case 'DELETE_AFFINITY': {
      const newAffinity = { ...state.affinity };
      delete newAffinity[action.character];
      return { ...state, affinity: newAffinity };
    }

    case 'DELETE_MENTAL_STAT': {
      const newMental = { ...state.mentalStats };
      delete newMental[action.stat];
      return { ...state, mentalStats: newMental };
    }

    case 'DELETE_COMBAT_STAT': {
      const newCombat = { ...state.combatStats };
      delete newCombat[action.stat];
      return { ...state, combatStats: newCombat };
    }

    case 'SET_GOLD':
      return { ...state, gold: clamp(action.value, 0, 9999999) };

    case 'SET_ZONE':
      return { ...state, zone: action.value };

    case 'SET_LEVEL':
      return { ...state, level: clamp(action.value, 1, 999) };

    case 'SET_EXPERIENCE':
      return { ...state, experience: clamp(action.value, 0, 9999999) };

    case 'SET_EQUIPMENT':
      return {
        ...state,
        equipment: {
          ...state.equipment,
          [action.slot]: action.item,
        },
      };

    case 'LOAD_FULL_STATE':
      return { ...state, ...action.value };

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, GameDataTemplate);
  if (process.env.NODE_ENV === 'development') {
    window.game = { state, dispatch };
  }

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
