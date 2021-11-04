import { ReportEvent } from 'src/models/reports/common';
import { TrackPoint } from 'src/models/reports/track';
import { MutationTree } from 'vuex';
import { ReportsStateInterface } from './state';

const mutation: MutationTree<ReportsStateInterface> = {
  setTrack(state, track: TrackPoint[]) {
    state.track = track;
  },
  setEvents(state, events: ReportEvent[]) {
    state.events = events;
  },
};

export default mutation;
