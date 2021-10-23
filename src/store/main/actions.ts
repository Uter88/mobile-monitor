import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { MaineStateInterface } from './state';

const actions: ActionTree<MaineStateInterface, StateInterface> = {
  getPosition(ctx) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        ctx.commit('setCenter', { lat, lng });
      });
    }
  },
};

export default actions;
