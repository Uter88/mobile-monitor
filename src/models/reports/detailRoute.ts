import { parseDistance } from 'src/components/funcs/utils';
import { ReportEvent } from './common';

class DetailRouteReport {
  device_id: number;
  vehicle_manufacturer: string;
  vehicle_model: string;
  state_number: string;
  distance: number;
  engine_working_time: number;
  ignition_time: number;
  time_moving: number;
  time_parking: number;
  events: ReportEvent[] = [];

  constructor(r: DetailRouteReport) {
    this.device_id = r.device_id;
    this.vehicle_manufacturer = r.vehicle_manufacturer;
    this.vehicle_model = r.vehicle_model;
    this.state_number = r.state_number;
    this.distance = r.distance;
    this.engine_working_time = r.engine_working_time;
    this.ignition_time = r.ignition_time;
    this.time_moving = r.time_moving;
    this.time_parking = r.time_parking;

    if (r.events) {
      this.events = Array(r.events.length);

      for (let i = 0; i < r.events.length; i++) {
        this.events[i] = new ReportEvent(r.events[i]);
      }
    }
  }

  get label() {
    return [
      this.vehicle_manufacturer,
      this.vehicle_model,
      this.state_number,
    ].join(' ');
  }

  get getDistance() {
    return parseDistance(this.distance);
  }
}

export { DetailRouteReport };
