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
        :label="$t('traffic jams')"
        act_icon="eva-speaker-outline"
      />
      <FabAct
        act_color="purple"
        :label="$t('Exit')"
        act_icon="eva-log-out-outline"
        @click="$router.push('/login')"
      />
    </Fab>
  </q-page-sticky>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useStore } from 'src/store';
import { Tracker } from 'src/models/tracker/tracker';
import Fab from 'src/components/buttons/Fab.vue';
import FabAct from 'src/components/buttons/FabAct.vue';

export default defineComponent({
  name: 'Map',
  components: { Fab, FabAct },
  setup() {
    const map = ref<L.Map>();
    const fabPos = ref([18, 18]);
    const store = useStore();
    const getMap = () => map.value as L.Map;
    const trackersGroup = L.layerGroup();

    const zoom = computed(() => store.state.main.zoom);
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
      m.setView(center.value, zoom.value);
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
        store.commit('main/setZoom', m.getZoom());
        resize();
      });
      m.on('drag', () => {
        store.commit('main/setCenter', m.getCenter());
      });
    };

    const resize = () => {
      getMap().invalidateSize();
    };

    const moveFab = (ev: any) => {
      if (!ev) return;
      console.log(ev);
      fabPos.value = [
        fabPos.value[0] - ev.delta.x,
        fabPos.value[1] - ev.delta.y,
      ];
    };

    onMounted(initMap);

    watch(zoom, (z) => getMap().setZoom(z));
    watch(center, (c) => getMap().setView(c));

    watch(trackers, (tr) => {
      trackersGroup.clearLayers();

      for (let i = 0; i < tr.length; i++) {
        const layer = tr[i].getMarker();
        trackersGroup.addLayer(layer);
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
