import L, { LatLng } from 'leaflet';
import { debounce } from 'quasar';
import { ReportEvent } from 'src/models/reports/common';
import { TrackPoint } from 'src/models/reports/track';
import { Tracker } from 'src/models/tracker/tracker';
import { StateInterface, useStore } from 'src/store';
import { Store } from 'vuex';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

class MapManager {
  _map: L.Map;
  _store: Store<StateInterface>;
  trackGroup = L.layerGroup();
  eventsGroup = L.layerGroup();
  trackersGroup = L.markerClusterGroup({
    disableClusteringAtZoom: 10,
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: false,
    chunkedLoading: true,
  });

  constructor(elem: string | HTMLElement, opts: L.MapOptions) {
    this._store = useStore();
    this._map = L.map(elem, opts);
    this._map.addLayer(this.trackGroup);
    this._map.addLayer(this.eventsGroup);
    this._map.addLayer(this.trackersGroup);
    this._initTileLayers();
    this._initActions();
  }

  _initTileLayers() {
    const tiles = L.control.layers();
    tiles.setPosition('bottomleft');
    const active = useStore().state.main.config.layer;

    for (const l of this._store.state.main.tileLayers) {
      const layer = L.tileLayer(l.url);
      layer.on('add', () => {
        this._store.commit('main/updateConfig', { layer: l.name });
      });
      if (l.name === active) layer.addTo(this._map);
      tiles.addBaseLayer(layer, l.name);
    }
    tiles.addTo(this._map);
  }

  _initActions() {
    this._map.on('zoomend', () => {
      this._store.commit('main/setZoom', this._map.getZoom());
      this.resize();
    });
    this._map.on('dragend', () => {
      this._store.commit('main/setCenter', this._map.getCenter());
      this.resize();
    });
  }

  initEvents(evs: ReportEvent[]) {
    this.eventsGroup.clearLayers();

    for (const e of evs) {
      const m = L.marker(e, {
        icon: L.icon({ iconUrl: e.getIcon(), iconSize: [18, 18] }),
      });
      this.eventsGroup.addLayer(m);
    }
  }

  initTrackers(trackers: Tracker[]) {
    this.trackersGroup.clearLayers();

    for (let i = 0; i < trackers.length; i++) {
      const t = trackers[i];
      const layer = t.getMarker();
      this.trackersGroup.addLayer(layer);

      layer.on('click', () => {
        void this._store.dispatch('trackers/setCurrent', t);
      });

      if (!this._store.state.trackers.current && t.is_active) {
        void this._store.dispatch('trackers/setCurrent', t);
      }
    }
  }

  initTrack(t: TrackPoint[]) {
    this.trackGroup.clearLayers();
    const layer = L.polyline(t);
    this.trackGroup.addLayer(layer);
  }

  resize() {
    debounce(() => {
      this._map.invalidateSize();
    }, 300)();
  }
  setCenter(c: LatLng) {
    this._map.setView(c);
  }
  setZoom(z: number) {
    this._map.setZoom(z);
  }
}

export { MapManager };
