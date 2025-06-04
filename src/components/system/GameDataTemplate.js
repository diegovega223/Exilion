const GameDataTemplate = {
  name: '',         // Nombre 🧍
  gender: '',       // Sexo ⚥
  age: 0,           // Edad 📅
  race: '',         // Raza 🧝‍♂️
  affinity: {},     // Afinidad 🔮
  reputation: 0,    // Reputación 🌟
  gold: 0,          // Oro 💰
  playTime: 0,      // Tiempo de juego ⏳

  level: 1,         // Nivel 🆙
  experience: 0,    // Experiencia 📈
  experienceMax: 100,

  combatStats: {
    hp: 0,          // Puntos de vida ❤️
    hpMax: 0,       // Vida máxima 💖
    ep: 0,          // Puntos de energía (Energy Points) ⚡
    epMax: 0,       // Energía máxima ⚡💯
    mp: 0,          // Puntos de maná (Magic Points) 🔷
    mpMax: 0,       // Maná máximo 🔷💯
    atk: 0,         // Ataque físico ⚔️
    def: 0,         // Defensa 🛡️
    agi: 0,         // Agilidad 🏃‍♂️
    dex: 0,         // Destreza 🎯
    eva: 0,         // Evasión 🌀
    crit: 0,        // Crítico ⚔️
    luck: 0,        // Suerte 🍀
    inf: 0,         // Influencia 🗣️
  },

  mentalStats: {
    int: 0,         // Inteligencia 🧠
    per: 0,         // Percepción 👁️
    intuition: 0,   // Intuición 🔍
    will: 0,        // Voluntad 🧘
    cha: 0,         // Carisma 😎
    corruption: 0,  // Corrupción ☠️
  },

  elements: {
    fire: 0,        // Fuego 🔥
    water: 0,       // Agua 💧
    earth: 0,       // Tierra 🪨
    air: 0,         // Aire 🌪️
    light: 0,       // Luz 🌞
    darkness: 0,    // Oscuridad 🌑
  },

  learnedSkills: [],        // Ataques aprendidos 📚
  statusEffects: [],        // Estados alterados ⚠️
  specialAbilities: [],     // Habilidades especiales ✨
  inventory: [],            // Inventario 🎒

  equipment: {
    weapon: null,           // Arma 🗡️
    shield: null,           // Escudo 🛡️
    armor: null,            // Armadura 🦺
    helmet: null,           // Casco 🪖
    boots: null,            // Botas 👢
    accessory1: null,       // Accesorio 1 💍
    accessory2: null        // Accesorio 2 💍
  },

  zone: '',                // Zona actual 📍
  sideQuests: [],          // Misiones secundarias 📜
  achievements: []         // Logros 🏆
};

export default GameDataTemplate;
