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
};

export default getters;
