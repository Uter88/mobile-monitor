export interface MaineStateInterface {
  center: Record<'lat' | 'lng', number>;
  zoom: number;
  tileLayers: Array<Record<string, string>>;
}

function state(): MaineStateInterface {
  return {
    center: { lat: 0, lng: 0 },
    zoom: 12,
    tileLayers: [
      {
        url: 'https://mt1.googleapis.com/vt/lyrs=m&src=app&x={x}&y={y}&z={z}&s=Galileo',
        name: 'Google',
        attribution: 'Google',
      },
      {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        name: 'OSM',
        attribution: 'OSM',
      },
      {
        url: 'https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=21.06.11-0-b210520094930&x={x}&y={y}&z={z}&scale=1&lang=ru_RU',
        name: 'Yandex',
        subdomains: '01,02,03,04',
        attribution: 'Yandex',
      },
      {
        url: 'https://sat01.maps.yandex.net/tiles?l=sat&v=1.32.0&x={x}&y={y}&z={z}&lang=ru-RU',
        name: 'Yandex Спутник',
        attribution: 'Yandex Спутник',
      },
      {
        url: 'https://sat01.maps.yandex.net/tiles?l=sat&v=3.135.0&x={x}&y={y}&z={z}&lang=ru_RU',
        name: 'Yandex R',
        attribution: 'Yandex R',
      },
      {
        url: 'https://mts1.googleapis.com/vt?lyrs=t@131,r@241000000&src=apiv3&x={x}&y={y}&z={z}&s=Galileo&style=37|smartmaps',
        name: 'Рельеф',
        attribution: 'Google Рельеф',
      },
    ],
  };
}

export default state;
