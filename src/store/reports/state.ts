import { ReportEvent } from 'src/models/reports/common';
import { TrackPoint } from 'src/models/reports/track';

export interface ReportsStateInterface {
  types: [];
  track: TrackPoint[];
  events: ReportEvent[];
}

function state(): ReportsStateInterface {
  return {
    types: [],
    track: [],
    events: [],
  };
}

export default state;
