import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ReportsStateInterface } from './state';
import Axios from 'axios';
import { DetailRouteReport } from 'src/models/reports/detailRoute';
import { Track } from 'src/models/reports/track';

const actions: ActionTree<ReportsStateInterface, StateInterface> = {
  async getDetailRouteReports(ctx, params) {
    const url: string = ctx.rootGetters['main/getReportApi'](params.path);
    const { data } = await Axios.get(url, { params });
    return data as DetailRouteReport[];
  },
  async getTracks(ctx, params) {
    const url: string = ctx.rootGetters['main/getReportApi']('track');
    const { data } = await Axios.get(url, { params });
    return data as Track[];
  },
};

export default actions;
