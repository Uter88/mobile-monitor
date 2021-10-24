import { Config } from 'src/models/common';
import { TileLayers } from 'src/models/map/common';
import { User } from 'src/models/user';

export interface MaineStateInterface {
  user: User | null;
  api: string;
  reports: string;
  geocode: string;
  ws: string;
  config: Config;
  center: Record<'lat' | 'lng', number>;
  zoom: number;
  tileLayers: Array<Record<string, string>>;
}

function state(): MaineStateInterface {
  return {
    user: null,
    api: process.env.DEBUGGING
      ? '/api/v1'
      : 'https://packapi.kgk-global.com/api/v1/',
    reports: process.env.DEBUGGING
      ? '/api'
      : 'https://agr-test.kgk-global.com/api',
    geocode: 'https://agr-test.kgk-global.com/api/geocodding',
    ws: 'wss://packapi.kgk-global.com/ws/states',
    config: Config.load(),
    center: { lat: 0, lng: 0 },
    zoom: 12,
    tileLayers: TileLayers,
  };
}

export default state;
