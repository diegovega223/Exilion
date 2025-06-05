const newGame = {
  name: 'Tharion',
  gender: 'Male',
  age: 30,
  race: 'Human',
  affinity: {},
  reputation: 10,
  gold: 150,
  playTime: 0,
  level: 5,
  experience: 120,
  experienceMax: 50,
  combatStats: {
    hp: 260,
    hpMax: 260,
    ep: 140,
    epMax: 140,
    mp: 30,
    mpMax: 30,
    atk: 50,
    def: 18,
    agi: 10,
    dex: 9,
    eva: 3,
    crit: 5,
    luck: 3,
    inf: 14
  },
  mentalStats: {
    int: 5,
    per: 7,
    intuition: 5,
    will: 8,
    cha: 6,
    corruption: 8
  },
  elements: {
    fire: 2,
    water: 1,
    earth: 3,
    air: 1,
    light: 0,
    darkness: 0
  },  
  learnedSkills: ['Corte Férreo', 'Embate Escudado'],
  statusEffects: [],
  specialAbilities: ['Ira del Guerrero'],
  inventory: [
    { id: 'pocion_pequena', name: 'Poción Pequeña', quantity: 3 },
    { id: 'antidoto', name: 'Antídoto', quantity: 1 }
  ],
  equipment: {
    weapon: { id: 'espada_roñosa', name: 'Espada Roñosa', attack: 8 },
    shield: { id: 'escudo_madera', name: 'Escudo de Madera', defense: 5 },
    armor: { id: 'cota_cuero', name: 'Cota de Cuero', defense: 4 },
    helmet: null,
    boots: null,
    accessory1: null,
    accessory2: null
  },
  zone: 'Aldea de los Robles',
  sideQuests: ['Investiga las ruinas antiguas'],
  achievements: ['Primera Sangre']
};

if (window.game && typeof window.game.dispatch === 'function') {
  window.game.dispatch({ type: 'LOAD_FULL_STATE', value: newGame });
  console.log('[Consola] Partida cargada en GameProvider (no en localStorage).');
} else {
  console.warn('No se encontró window.game.dispatch. ¿Estás en modo desarrollo?');
}