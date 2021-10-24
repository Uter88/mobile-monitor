import { Config } from 'src/models/common';
import { User } from 'src/models/user';
import { MutationTree } from 'vuex';
import { MaineStateInterface } from './state';

const mutation: MutationTree<MaineStateInterface> = {
  updateConfig(state, c: Config) {
    state.config.update(c);
  },
  setUser(state, u: User) {
    state.user = new User(u);
  },
  logout(state) {
    sessionStorage.removeItem('token');
    state.user = null;
  },
  setCenter(state, c: { lat: number; lng: number }) {
    state.center = c;
  },
  setZoom(state, zoom: number) {
    state.zoom = zoom;
  },
};

export default mutation;
