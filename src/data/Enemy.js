export class Enemy {
  constructor({
    id,
    nv = 1,
    name,
    image = '',
    stats = {},
    elements = {},
    ataques = [],
    experiencia = 0,
    oro = 0,
    probabilidadEscape = 0,
    hpEscapeThreshold = 0,
    estados = [],
    spotted = false,
  }) {
    this.id = id;
    this.nv = nv;
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

    this.ataques = ataques.length > 0 ? ataques : [{ id: 0, regularidad: 100 }];
    this.experiencia = experiencia;
    this.oro = oro;
    this.probabilidadEscape = probabilidadEscape;
    this.hpEscapeThreshold = hpEscapeThreshold;
    this.estados = estados;
    this.spotted = spotted;
  }
}
