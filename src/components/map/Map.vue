<template>
  <div id="map" class="fit absolute"></div>
  <q-page-sticky position="bottom-right" :offset="fabPos" style="z-index: 401">
    <Fab v-touch-pan.prevent.mouse="moveFab">
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
import { debounce, useQuasar } from 'quasar';

export default defineComponent({
  name: 'Map',
  components: { Fab, FabAct },
  setup() {
    const map = ref<L.Map>();
    const store = useStore();
    const $q = useQuasar();
    const getMap = () => map.value as L.Map;
    const trackersGroup = L.layerGroup();
    const fabPos = reactive([18, 18]);

    const zoom = computed({
      get: () => store.state.main.zoom,
      set: (z) => store.commit('main/setZoom', z),
    });

    const center = computed({
      get: () => store.state.main.center,
      set: (c) => store.commit('main/setCenter', c),
    });

    const trackers = computed(
      () => store.getters['trackers/getSelectedTrackers'] as Tracker[]
    );

    const initMap = () => {
      void store.dispatch('main/getPosition');
      const m = L.map('map', { renderer: L.canvas(), zoomControl: false });
      const { lat, lng } = center.value;
      m.setView({ lat, lng }, zoom.value);
      trackersGroup.addTo(m);
      map.value = m;
      initLayers(m);
      initEvents(m);
    };

    const initLayers = (m: L.Map) => {
      const tiles = L.control.layers();
      const active = store.state.main.config.layer;

      for (const l of store.state.main.tileLayers) {
        const layer = L.tileLayer(l.url);
        layer.on('add', () => {
          store.commit('main/updateConfig', { layer: l.name });
        });
        if (l.name === active) layer.addTo(m);
        tiles.addBaseLayer(layer, l.name);
      }
      tiles.addTo(m);
    };

    const initEvents = (m: L.Map) => {
      m.on('zoom', () => {
        zoom.value = m.getZoom();
        resize();
      });
      m.on('drag', () => {
        center.value = m.getCenter();
      });
    };

    const resize = debounce(
      () => {
        getMap().invalidateSize();
      },
      300,
      true
    );

    const moveFab = (e: { position: { left: number; top: number; }; delta: { x: number; y: number; }; }) => {
      if (!e) return;
      const { left, top } = e.position as { left: number; top: number };
      const { width, height } = $q.screen;
      if (top - 30 < 0 || top + 100 > height) return;
      if (left - 30 < 0 || left + 30 > width) return;
      fabPos[0] -= e.delta.x;
      fabPos[1] -= e.delta.y;
    };

    onMounted(initMap);

    watch(zoom, (z) => getMap().setZoom(z));
    watch(center, (c) => getMap().setView(c), { deep: true });

    watch(trackers, (tr) => {
      trackersGroup.clearLayers();

      for (let i = 0; i < tr.length; i++) {
        const t = tr[i];
        const layer = t.getMarker();
        trackersGroup.addLayer(layer);

        layer.on('click', () => {
          store.commit('trackers/setCurrent', t)
        })

        if (!store.state.trackers.current && t.is_active) {
          store.commit('trackers/setCurrent', t);
          center.value = t.getCoords();
        }
      }
    });

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
