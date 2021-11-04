class TrackPoint {
  packet_time: number;
  speed: number;
  lat: number;
  lng: number;
  alt: number;
  az: number;
  csq: number;
  sat: number;
  ign: boolean;
  fuel?: number;

  constructor(p: TrackPoint) {
    this.packet_time = p.packet_time;
    this.speed = p.speed;
    this.lat = p.lat;
    this.lng = p.lng;
    this.alt = p.alt;
    this.az = p.az;
    this.csq = p.csq;
    this.sat = p.sat;
    this.ign = p.ign;
    this.fuel = p.fuel;
  }
}

class Track {
  device_id: number;
  total: number;
  track: TrackPoint[] = [];

  constructor(t: Track) {
    this.device_id = t.device_id;
    this.total = t.total;
    if (t.track) {
      this.track = Array(t.total);

      for (let i = 0; i < t.total; i++) {
        this.track[i] = new TrackPoint(t.track[i]);
      }
    }
  }
}

export { Track, TrackPoint };
