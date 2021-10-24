import { Tracker } from 'src/models/tracker/tracker';
import { MutationTree } from 'vuex';
import { TrackersStateInterface } from './state';

const mutation: MutationTree<TrackersStateInterface> = {
  setTrackers(state, trackers: Tracker[]) {
    const arr = Array(trackers.length);
    state.indexes = {};

    for (let i = 0; i < trackers.length; i++) {
      const tr = new Tracker(trackers[i]);
      state.indexes[tr.device_id] = i;
      arr[i] = tr;
    }
    state.trackers = Object.freeze(arr);
  },
  setCurrent(state, tr: Tracker) {
    state.current?.unsetCurrent();
    state.current = tr;
    tr.setCurrent();
  },
};

export default mutation;
