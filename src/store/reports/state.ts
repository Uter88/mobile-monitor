import { ReportEvent, ReportType } from 'src/models/reports/common';
import { TrackPoint } from 'src/models/reports/track';

export interface ReportsStateInterface {
  type: ReportType;
  types: ReportType[];
  track: TrackPoint[];
  events: ReportEvent[];
}

function state(): ReportsStateInterface {
  return {
    type: ReportType.create('detail_route'),
    types: [
      ReportType.create('detail_route'),
      ReportType.create('summary_route'),
      ReportType.create('detail_fuel'),
      ReportType.create('summary_fuel'),
      ReportType.create('speed'),
      ReportType.create('temp'),
    ],
    track: [],
    events: [],
  };
}

export default state;
