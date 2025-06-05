import { useState } from 'react';
import { useGame } from '../components/system/GameProvider';

export default function usePlayer() {
  const { state } = useGame();
  const player = {
    name: state.name || 'Jugador',
    stats: {
      hp: state.combatStats?.hp ?? 100,
      hpMax: state.combatStats?.hpMax ?? 100,
      ep: state.combatStats?.ep ?? 50,
      epMax: state.combatStats?.epMax ?? 50,
      mp: state.combatStats?.mp ?? 30,
      mpMax: state.combatStats?.mpMax ?? 30,
      atk: state.combatStats?.atk ?? 10,
      def: state.combatStats?.def ?? 10,
      agi: state.combatStats?.agi ?? 10,
      dex: state.combatStats?.dex ?? 10,
      eva: state.combatStats?.eva ?? 5,
      crit: state.combatStats?.crit ?? 5,
      luck: state.combatStats?.luck ?? 0,
      inf: state.combatStats?.inf ?? 0,
      fire: state.elements?.fire ?? 0,
      water: state.elements?.water ?? 0,
      earth: state.elements?.earth ?? 0,
      air: state.elements?.air ?? 0,
      light: state.elements?.light ?? 0,
      darkness: state.elements?.darkness ?? 0,
    }
  };
  const [playerHp, setPlayerHp] = useState(player.stats.hp);
  return { player, playerHp, setPlayerHp };
}