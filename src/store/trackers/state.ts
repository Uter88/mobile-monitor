import { Tracker } from 'src/models/tracker/tracker';

export interface TrackersStateInterface {
  trackers: readonly Tracker[];
  indexes: Record<number, number>;
  current: Tracker | null;
}

function state(): TrackersStateInterface {
  return {
    trackers: [],
    indexes: {},
    current: null,
  };
}

export default state;
