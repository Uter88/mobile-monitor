import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { TrackersStateInterface } from './state';

const getters: GetterTree<TrackersStateInterface, StateInterface> = {
  getSelected(state, getters, rootState) {
    const selected = rootState.main.config.trackers;
    const result = [];

    for (let i = 0; i < state.trackers.length; i++) {
      const tr = state.trackers[i];

      if (selected.indexOf(tr.device_id) !== -1) {
        result.push(tr);
      }
    }
    return result;
  },
};

export default getters;
