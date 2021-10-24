export class Group {
  id: number;
  name: string;
  time_offset: number;

  constructor(g: Group) {
    this.id = g.id || 0;
    this.name = g.name;
    this.time_offset = g.time_offset || 180;
  }
}

export class Config {
  group: number;
  trackers: number[];
  layer: string;
  lang: string;

  constructor(c: Config) {
    this.group = c.group || 0;
    this.trackers = c.trackers || [];
    this.layer = c.layer || 'OSM';
    this.lang = c.lang || 'en';
  }

  static load() {
    const cfg = JSON.parse(localStorage.getItem('config') || '{}') as Config;
    return new Config(cfg);
  }

  update(c: Config) {
    if (c.group !== undefined) {
      this.group = c.group;
    }
    if (c.trackers) {
      this.trackers = c.trackers;
    }
    if (c.layer) {
      this.layer = c.layer;
    }
    if (c.lang) {
      this.lang = c.lang;
    }
    localStorage.setItem('config', JSON.stringify(this));
  }
}
