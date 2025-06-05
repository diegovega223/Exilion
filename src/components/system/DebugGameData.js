const DebugGameData = {
  name: 'Debug',
  gender: 'Otro',
  age: 25,
  race: 'Humano',
  affinity: {},
  reputation: 10,
  gold: 100,
  playTime: 0,
  level: 5,
  experience: 120,
  experienceMax: 200,
  combatStats: {
    hp: 300,
    hpMax: 120,
    ep: 60,
    epMax: 60,
    mp: 40,
    mpMax: 40,
    atk: 100,
    def: 12,
    agi: 10,
    dex: 10,
    eva: 5,
    crit: 5,
    luck: 2,
    inf: 3
  },
  mentalStats: {
    int: 5,
    per: 7,
    intuition: 5,
    will: 8,
    cha: 6,
    corruption: 1
  },
  elements: {
    fire: 1,
    water: 1,
    earth: 1,
    air: 1,
    light: 0,
    darkness: 0
  },
  learnedSkills: ['Corte Férreo'],
  statusEffects: [],
  specialAbilities: ['Ira del Guerrero'],
  inventory: [
    { id: 'pocion_pequena', name: 'Poción Pequeña', quantity: 3 }
  ],
  equipment: {
    weapon: { id: 'espada_roñosa', name: 'Espada Roñosa', attack: 8 },
    shield: null,
    armor: null,
    helmet: null,
    boots: null,
    accessory1: null,
    accessory2: null
  },
  zone: 'Aldea de los Robles',
  sideQuests: ['Investiga las ruinas antiguas'],
  achievements: ['Primera Sangre']
};

export default DebugGameData;