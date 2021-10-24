import Axios from 'axios';
import { User } from 'src/models/user';
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

  async login(ctx, token: string) {
    const url = ctx.getters['getApi']('login') as string;
    const headers = { Authorization: token };
    const { data } = await Axios.get(url, { headers });
    Axios.defaults.headers = headers;
    ctx.commit('setUser', data);
  },

  async checkAuth(ctx): Promise<User | undefined> {
    if (ctx.state.user) return ctx.state.user;
    const token =
      sessionStorage.getItem('token') || localStorage.getItem('token');

    if (token) {
      const url = ctx.getters['getApi']('login') as string;
      const headers = { Authorization: token };
      const { data } = await Axios.get(url, { headers });
      Axios.defaults.headers = headers;
      ctx.commit('setUser', data);
      return ctx.state.user as unknown as User;
    }
  },
};

export default actions;
