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

export { ReportEvent, EventType };
