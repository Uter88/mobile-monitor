export class Group {
  groupID: number;
  groupName: string;
  time_offset: number;
  default: boolean;

  constructor(g: Group) {
    this.groupID = g.groupID || 0;
    this.groupName = g.groupName;
    this.time_offset = g.time_offset || 180;
    this.default = g.default || false;
  }

  get label(): string {
    return this.groupName;
  }

  get value(): number {
    return this.groupID;
  }

  static getDefault(): Group {
    const data = {
      groupName: 'all_objects',
      groupID: 0,
      time_offset: new Date().getTimezoneOffset(),
      default: true,
    } as Group;
    return new Group(data);
  }
}

export class Config {
  group: number;
  trackers: number[];
  layer: string;
  lang: string;
  view: string;
  fab: number[];
  columns: string[];

  constructor(c: Config) {
    this.group = c.group || 0;
    this.trackers = c.trackers || [];
    this.layer = c.layer || 'OSM';
    this.lang = c.lang || 'en';
    this.view = c.view || 'table';
    this.fab = c.fab || [18, 18];
    this.columns = c.columns || ['brand', 'model', 'state_number'];
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
    if (c.view) {
      this.view = c.view;
    }
    if (c.fab) {
      this.fab = c.fab;
    }
    if (c.columns) {
      this.columns = c.columns;
    }
    localStorage.setItem('config', JSON.stringify(this));
  }
}
