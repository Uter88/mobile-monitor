import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { MaineStateInterface } from './state';

const getters: GetterTree<MaineStateInterface, StateInterface> = {
  getCenter(state) {
    return state.center;
  },
  getZoom(state) {
    return state.zoom;
  },
  getApi: (state) => (path: string) => {
    if (!path.startsWith('/')) path = '/' + path;
    return state.api + path;
  },
};

export default getters;
