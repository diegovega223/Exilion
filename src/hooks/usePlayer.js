import { useRef, useState } from 'react';

const getPlayerFromStorage = () => {
  try {
    const savedData = localStorage.getItem('exilion-save');
    if (!savedData) return null;
    const playerData = JSON.parse(savedData);
    return {
      name: playerData.name || 'Jugador',
      stats: {
        hp: playerData.combatStats?.hp ?? 100,
        hpMax: playerData.combatStats?.hpMax ?? 100,
        ep: playerData.combatStats?.ep ?? 50,
        epMax: playerData.combatStats?.epMax ?? 50,
        mp: playerData.combatStats?.mp ?? 30,
        mpMax: playerData.combatStats?.mpMax ?? 30,
        atk: playerData.combatStats?.atk ?? 10,
        def: playerData.combatStats?.def ?? 10,
        agi: playerData.combatStats?.agi ?? 10,
        dex: playerData.combatStats?.dex ?? 10,
        eva: playerData.combatStats?.eva ?? 5,
        crit: playerData.combatStats?.crit ?? 5,
        luck: playerData.combatStats?.luck ?? 0,
        inf: playerData.combatStats?.inf ?? 0,
        fire: playerData.elements?.fire ?? 0,
        water: playerData.elements?.water ?? 0,
        earth: playerData.elements?.earth ?? 0,
        air: playerData.elements?.air ?? 0,
        light: playerData.elements?.light ?? 0,
        darkness: playerData.elements?.darkness ?? 0,
      }
    };
  } catch (error) {
    console.error('Error leyendo jugador de localStorage:', error);
    return null;
  }
};

export default function usePlayer() {
  const storedPlayer = useRef(getPlayerFromStorage());
  const player = storedPlayer.current;
  const [playerHp, setPlayerHp] = useState(player.stats.hp);
  return { player, playerHp, setPlayerHp };
}