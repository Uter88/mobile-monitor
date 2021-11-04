import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ReportsStateInterface } from './state';

const getters: GetterTree<ReportsStateInterface, StateInterface> = {
  getEvents(state) {
    return state.events.filter((e) => e.lat && e.lng);
  },
};

export default getters;
