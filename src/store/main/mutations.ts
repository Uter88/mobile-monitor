import { Config, Group } from 'src/models/common';
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
  setCenter(state, { lat, lng }: { lat: number; lng: number }) {
    state.center.lat = lat;
    state.center.lng = lng;
  },
  setZoom(state, zoom: number) {
    state.zoom = zoom;
  },
  setGroups(state, groups: Group[]) {
    state.groups = groups.map((g) => new Group(g));
    state.groups.push(Group.getDefault());
  },
};

export default mutation;
