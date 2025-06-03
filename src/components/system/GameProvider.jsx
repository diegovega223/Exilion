import React, { createContext, useReducer, useContext } from 'react';
import GameDataTemplate from './GameDataTemplate';

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

const GameContext = createContext();

function gameReducer(state, action) {
    switch (action.type) {
        case 'SET_NOMBRE':
            return { ...state, nombre: action.valor };

        case 'SET_EDAD':
            return { ...state, edad: clamp(action.valor, 17, 120) };

        case 'SET_RAZA':
            return { ...state, raza: action.valor };

        case 'SET_AFINIDAD':
            return {
                ...state,
                afinidad: {
                    ...state.afinidad,
                    [action.personaje]: clamp((state.afinidad[action.personaje] || 0) + action.valor, -100, 100),
                },
            };

        case 'UPDATE_REPUTACION':
            return { ...state, reputacion: clamp(state.reputacion + action.valor, -100, 100) };

        case 'SET_STAT_MENTAL':
            return {
                ...state,
                mental: {
                    ...state.mental,
                    [action.stat]: clamp((state.mental[action.stat] || 0) + action.valor, -999, 999),
                },
            };

        case 'SET_STAT_FISICO':
            return {
                ...state,
                fisico: {
                    ...state.fisico,
                    [action.stat]: clamp((state.fisico[action.stat] || 0) + action.valor, -999, 999),
                },
            };

        case 'DELETE_AFINIDAD':
            const newAfinidad = { ...state.afinidad };
            delete newAfinidad[action.personaje];
            return { ...state, afinidad: newAfinidad };

        case 'DELETE_STAT_MENTAL':
            const newMental = { ...state.mental };
            delete newMental[action.stat];
            return { ...state, mental: newMental };

        case 'DELETE_STAT_FISICO':
            const newFisico = { ...state.fisico };
            delete newFisico[action.stat];
            return { ...state, fisico: newFisico };

        case 'LOAD_FULL_STATE':
            return { ...state, ...action.valor };

        default:
            return state;
    }
}

export function GameProvider({ children }) {
    const [state, dispatch] = useReducer(gameReducer, GameDataTemplate);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame debe usarse dentro de un GameProvider');
    }
    return context;
}
