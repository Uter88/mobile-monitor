type EventType =
  | 'moving'
  | 'parking'
  | 'fuel_fill'
  | 'fuel_drain'
  | 'alarm'
  | 'engine_hours'
  | 'no_data';

class ReportEvent {
  _id: string;
  ts_start: number;
  ts_stop: number;
  event_type: EventType;
  lat: number;
  lng: number;
  speed_average: number;
  speed_max: number;
  distance: number;
  fuel_start: number;
  fuel_end: number;
  ignition_seconds: number;
  ign_first_time: number;
  ign_last_time: number;
  odometer: number;
  address = '';

  constructor(e: ReportEvent) {
    this._id = e._id;
    this.ts_start = e.ts_start;
    this.ts_stop = e.ts_stop;
    this.event_type = e.event_type;
    this.lat = e.lat;
    this.lng = e.lng;
    this.ignition_seconds = e.ignition_seconds || 0;
    this.ign_first_time = e.ign_first_time;
    this.ign_last_time = e.ign_last_time;
    this.speed_average = e.speed_average || 0;
    this.speed_max = e.speed_max || 0;
    this.distance = e.distance || 0;
    this.fuel_start = e.fuel_start;
    this.fuel_end = e.fuel_end;
    this.odometer = e.odometer;
  }

  getIcon() {
    switch (this.event_type) {
      case 'parking':
        return 'icons/reports/parking.svg';
      case 'fuel_fill':
        return 'icons/reports/fuel.svg';
      case 'fuel_drain':
        return 'D';
    }
    return '-';
  }
}

interface ReportParams {
  device_id: number | number[];
  ts_start: number;
  ts_stop: number;
  offset_utc: number;
  event_types: string | string[];
  stop_time: number;
  token: string;
}

type ReportKind =
  | 'detail_route'
  | 'summary_route'
  | 'detail_fuel'
  | 'summary_fuel'
  | 'speed'
  | 'temp';

class ReportType {
  kind: ReportKind;
  path: string;
  max_period: number;
  multiple?: boolean;
  no_today?: boolean;
  need_fuel?: boolean;
  need_temp?: boolean;

  constructor(t: ReportType) {
    this.kind = t.kind;
    this.path = t.path;
    this.multiple = t.multiple;
    this.no_today = t.no_today;
    this.max_period = t.max_period;
    this.need_fuel = t.need_fuel;
    this.need_temp = t.need_temp;
  }

  static create(kind: ReportKind) {
    switch (kind) {
      case 'detail_route':
        return new ReportType({ kind, path: '/route/detail', max_period: 31 });
      case 'summary_route':
        return new ReportType({
          kind,
          path: '/route/summary',
          max_period: 31,
          multiple: true,
        });
      case 'detail_fuel':
        return new ReportType({
          kind,
          path: '/fuel/detail',
          max_period: 90,
          need_fuel: true,
        });
      case 'summary_fuel':
        return new ReportType({
          kind,
          path: '/fuel/summary',
          max_period: 90,
          need_fuel: true,
          multiple: true,
        });
      case 'speed':
        return new ReportType({
          kind,
          path: '/speed',
          max_period: 31,
          multiple: true,
        });
      case 'temp':
        return new ReportType({
          kind,
          path: '/temperature',
          max_period: 31,
          need_temp: true,
        });
      default:
        return new ReportType({ kind, path: '/route/detail', max_period: 31 });
    }
  }
}

export { ReportEvent, EventType, ReportParams, ReportType };
