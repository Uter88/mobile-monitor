<template>
  <div id="map" class="fit absolute"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'Map',
  setup() {
    const map = ref<L.Map>();
    const store = useStore();
    const getMap = () => map.value as L.Map;

    const zoom = computed(() => store.state.main.zoom);
    const center = computed(() => store.state.main.center);

    const initMap = () => {
      void store.dispatch('main/getPosition');
      const m = L.map('map', { renderer: L.canvas(), zoomControl: false });
      m.setView(center.value, zoom.value);
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

    onMounted(initMap);

    watch(zoom, (z) => getMap().setZoom(z));
    watch(center, (c) => getMap().setView(c));

    return {
      map,
      center,
      zoom,
    };
  },
});
</script>
