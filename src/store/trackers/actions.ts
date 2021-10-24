import Axios from 'axios';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { TrackersStateInterface } from './state';

const actions: ActionTree<TrackersStateInterface, StateInterface> = {
  async getTrackers(ctx) {
    const url = ctx.rootGetters['main/getApi']('get_trackers') as string;
    const group_id = ctx.rootState.main.config.group;
    let params = {};

    if (group_id) params = { group_id };

    const { data } = await Axios.get(url, { params });
    ctx.commit('setTrackers', data);
  },
};

export default actions;
