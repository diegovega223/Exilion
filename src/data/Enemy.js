export class Enemy {
  constructor({
    id,
    level = 1,
    name,
    image = '',
    stats = {},
    elements = {},
    attacks = [],
    experience = 0,
    gold = 0,
    escapeChance = 0,
    hpEscapeThreshold = 0,
    statusEffects = [],
    spotted = false,
    personality = 'balanced'
  }) {
    this.id = id;
    this.level = level;
    this.name = name;
    this.image = image;

    this.stats = {
      hp: 100,
      hpMax: 100,
      ep: 0,
      epMax: 0,
      mp: 0,
      mpMax: 0,
      atk: 10,
      def: 10,
      agi: 10,
      dex: 5,
      eva: 0,
      crit: 0,
      luck: 0,
      inf: 0,
      ...stats,
    };

    this.elements = {
      fire: 0,
      water: 0,
      earth: 0,
      air: 0,
      light: 0,
      darkness: 0,
      ...elements,
    };

    this.attacks = attacks.length > 0 ? attacks : [{ id: 0, weight: 100 }];
    this.experience = experience;
    this.gold = gold;
    this.escapeChance = escapeChance;
    this.hpEscapeThreshold = hpEscapeThreshold;
    this.statusEffects = statusEffects;
    this.spotted = spotted;
    this.personality = personality;
  }
}
