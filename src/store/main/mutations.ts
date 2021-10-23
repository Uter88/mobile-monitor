import { MutationTree } from 'vuex';
import { MaineStateInterface } from './state';

const mutation: MutationTree<MaineStateInterface> = {
  setCenter(state, c: { lat: number; lng: number }) {
    state.center = c;
  },
  setZoom(state, zoom: number) {
    state.zoom = zoom;
  },
};

export default mutation;
