<template>
  <MDialog
    seamless
    v-model="visible"
    :label="getLabel"
    full-width
    content-class="self-end"
    content-style="height: 30vh;"
    @close="hide"
  >
    <div v-if="report">
      <q-list dense>
        <q-item>
          <q-item-section avatar>
            <q-icon name="eva-car" />
          </q-item-section>
          <q-item-section>
            {{ report.label }}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="eva-flag" />
          </q-item-section>
          <q-item-section>
            {{ report.getDistance }}
            {{ $t('km') }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </MDialog>
</template>

<script lang="ts">
import { date } from 'quasar';
import { ReportParams } from 'src/models/reports/common';
import { DetailRouteReport } from 'src/models/reports/detailRoute';
import { Track } from 'src/models/reports/track';
import { useStore } from 'src/store';
import { defineComponent, ref, computed, watch, PropType } from 'vue';

export default defineComponent({
  name: 'DetailReport',
  props: {
    from: Date,
    to: Date,
    params: {
      type: Object as PropType<ReportParams>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const visible = ref(false);

    const report = ref<DetailRouteReport>();
    const track = ref<Track>();
    const current = computed(() => store.state.trackers.current);

    const getReport = (params: ReportParams) => {
      store
        .dispatch('reports/getDetailRouteReports', params)
        .then((r: DetailRouteReport[]) => {
          const rep = new DetailRouteReport(r[0]);
          store.commit('reports/setEvents', rep.events);
          report.value = rep;
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const getTrack = (params: ReportParams) => {
      store
        .dispatch('reports/getTracks', params)
        .then((t: Track[]) => {
          const tr = new Track(t[0]);
          store.commit('reports/setTrack', tr.track);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const show = () => {
      getReport(props.params);
      getTrack(props.params);
      visible.value = true;
    };

    const hide = () => {
      visible.value = false;
      store.commit('reports/setTrack', []);
      store.commit('reports/setEvents', []);
    };

    watch(current, (tr) => {
      const p = props.params;
      if (tr) {
        p.device_id = tr.device_id;
        getReport(p);
        getTrack(p);
      }
    });

    const getLabel = computed(() => {
      return [
        date.formatDate(props.from, 'DD.MM.YYYY HH:mm'),
        date.formatDate(props.to, 'DD.MM.YYYY HH:mm'),
      ].join(' - ');
    });
    return {
      visible,
      show,
      hide,
      getLabel,
      report,
    };
  },
});
</script>
