import { Tracker } from 'src/models/tracker/tracker';

export interface TrackersStateInterface {
  trackers: Tracker[];
}

function state(): TrackersStateInterface {
  return {
    trackers: [],
  };
}

export default state;
