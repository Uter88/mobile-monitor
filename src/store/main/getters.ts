import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { MaineStateInterface } from './state';

const getters: GetterTree<MaineStateInterface, StateInterface> = {
  getCenter(state, getters, rootState) {
    if (rootState.trackers.current) {
      return rootState.trackers.current.getCoords();
    }
    return state.center;
  },
  getZoom(state) {
    return state.zoom;
  },
  getApi: (state) => (path: string) => {
    if (!path.startsWith('/')) path = '/' + path;
    return state.api + path;
  },
  getReportApi: (state) => (path: string) => {
    if (!path.startsWith('/')) path = '/' + path;
    return state.reports + path;
  },
};

export default getters;
