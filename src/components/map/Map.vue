<template>
  <div id="map" class="fit absolute"></div>
  <q-page-sticky position="bottom-right" :offset="fabPos" style="z-index: 401">
    <Fab v-touch-pan.prevent.mouse="moveFab" :fab_icon="'apps'">
      <FabAct act_color="purple" :label="$t('search')" act_icon="eva-search" />
      <FabAct
        act_color="purple"
        :label="$t('layers')"
        act_icon="eva-layers-outline"
      />
      <FabAct
        act_color="purple"
        :label="$t('center')"
        act_icon="eva-navigation-2-outline"
      />
      <FabAct
        act_color="purple"
        :label="$t('location')"
        act_icon="eva-pin-outline"
      />
      <FabAct
        act_color="purple"
        :label="$t('traffic_jams')"
        act_icon="eva-speaker-outline"
      />
      <FabAct
        act_color="purple"
        :label="$t('exit')"
        act_icon="eva-log-out-outline"
        @click="$router.push('/login')"
      />
    </Fab>
  </q-page-sticky>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  watch,
  reactive,
} from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useStore } from 'src/store';
import { Tracker } from 'src/models/tracker/tracker';
import Fab from 'src/components/buttons/Fab.vue';
import FabAct from 'components/buttons/FabAct.vue';
import { useQuasar } from 'quasar';
import { ReportEvent } from 'src/models/reports/common';
import { TrackPoint } from 'src/models/reports/track';
import { MapManager } from './utils/map-manager';

export default defineComponent({
  name: 'Map',
  components: { Fab, FabAct },
  setup() {
    const map = ref<MapManager>();
    const store = useStore();
    const $q = useQuasar();
    const getMap = () => map.value as MapManager;
    const fabPos = reactive([18, 18]);

    const zoom = computed({
      get: () => store.state.main.zoom,
      set: (z) => store.commit('main/setZoom', z),
    });

    const center = computed({
      get: () => store.getters['main/getCenter'] as L.LatLng,
      set: (c) => store.commit('main/setCenter', c),
    });

    const trackers = computed(
      () => store.getters['trackers/getSelected'] as Tracker[]
    );
    watch(trackers, (t) => getMap().initTrackers(t));

    const track = computed(() => store.state.reports.track as TrackPoint[]);
    watch(track, (t) => getMap().initTrack(t));
    const events = computed(
      () => store.getters['reports/getEvents'] as ReportEvent[]
    );
    watch(events, (e) => getMap().initEvents(e));

    const initMap = () => {
      void store.dispatch('main/getPosition');
      map.value = new MapManager('map', {
        maxZoom: 19,
        renderer: L.canvas(),
        center: center.value,
        zoom: zoom.value,
      });
    };

    const moveFab = (e: {
      position: { left: number; top: number };
      delta: { x: number; y: number };
    }) => {
      if (!e) return;
      const { left, top } = e.position as { left: number; top: number };
      const { width, height } = $q.screen;
      if (top - 30 < 0 || top + 100 > height) return;
      if (left - 30 < 0 || left + 30 > width) return;
      fabPos[0] -= e.delta.x;
      fabPos[1] -= e.delta.y;
    };

    watch(zoom, (z) => getMap().setZoom(z));
    watch(center, (c) => getMap().setCenter(c), { deep: true });

    onMounted(initMap);

    return {
      map,
      center,
      zoom,
      fabPos,
      moveFab,
    };
  },
});
</script>
