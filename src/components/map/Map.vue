<template>
  <div id="map" class="fit absolute"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default defineComponent({
  name: 'Map',
  setup() {
    const map = ref<L.Map>();
    const getMap = () => map.value as L.Map;

    const zoom = ref(12);
    const center = reactive({ lat: 52.505, lng: 35.422 });

    const initMap = () => {
      const m = L.map('map', { renderer: L.canvas() });
      m.setView(center, zoom.value);
      map.value = m;
      initLayers(m);
      initEvents(m);
    };

    const initLayers = (m: L.Map) => {
      L.tileLayer(
        'https://mt1.googleapis.com/vt/lyrs=m&src=app&x={x}&y={y}&z={z}&s=Galileo'
      ).addTo(m);
    };

    const initEvents = (m: L.Map) => {
      m.on('zoom', () => {
        zoom.value = m.getZoom();
        resize();
      });
      m.on('drag', () => {
        const { lat, lng } = m.getCenter();
        center.lat = lat;
        center.lng = lng;
        resize();
      });
    };

    const resize = () => {
      getMap().invalidateSize();
    };

    onMounted(initMap);

    return {
      map,
      center,
      zoom,
    };
  },
});
</script>
