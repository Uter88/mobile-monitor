<template>
  <MDialog
    seamless
    v-model="visible"
    :label="getLabel"
    full-width
    content-class="self-end"
    content-style="height: 30vh;"
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
import { DetailRouteReport } from 'src/models/reports/detailRoute';
import { Track } from 'src/models/reports/track';
import { useStore } from 'src/store';
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'DetailReport',
  props: {
    from: Date,
    to: Date,
    params: {
      type: Object,
    },
  },
  setup(props) {
    const store = useStore();
    const visible = ref(false);

    const report = ref<DetailRouteReport>();
    const track = ref<Track>();

    const getReport = () => {
      store
        .dispatch('reports/getDetailRouteReports', props.params)
        .then((r: DetailRouteReport[]) => {
          const rep = new DetailRouteReport(r[0]);
          store.commit('reports/setEvents', rep.events);
          report.value = rep;
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const getTrack = () => {
      store
        .dispatch('reports/getTracks', props.params)
        .then((t: Track[]) => {
          const tr = new Track(t[0]);
          store.commit('reports/setTrack', tr.track);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const show = () => {
      getReport();
      getTrack();
      visible.value = true;
    };
    const hide = () => {
      visible.value = false;
      store.commit('reports/setTrack', []);
    };

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
