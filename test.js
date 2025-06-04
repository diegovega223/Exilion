const newGame = {
  name: 'Tharion',
  gender: 'Male',
  age: 30,
  race: 'Human',
  affinity: {},
  reputation: 10,
  gold: 150,
  playTime: 0,

  level: 3,
  experience: 250,
  experienceMax: 400,

  combatStats: {
    hp: 180,
    hpMax: 180,
    ep: 100,
    epMax: 100,
    mp: 20,
    mpMax: 20,
    atk: 15,   
    def: 12,
    agi: 7,
    dex: 6,
    eva: 2,
    crit: 3,
    luck: 2,
    inf: 10
  },

  mentalStats: {
    int: 4,
    per: 5,
    intuition: 4,
    will: 6,
    cha: 5,
    corruption: 8
  },

  elements: {
    fire: 1,
    water: 0,
    earth: 2,
    air: 0,
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

localStorage.setItem('exilion-save', JSON.stringify(newGame));
console.log('[Consola] Partida de guerrero "Tharion" generada manualmente.');
