import { User } from '../user';
import { IState } from './state';
import L from 'leaflet';

export class Tracker {
  brand: string;
  model: string;
  device_id: number;
  state_number: string;
  driver: string;
  comment: string;
  type: string;
  firmware: string;
  state: IState;
  max_speed: number;
  mileage_allert: number;
  mth_allert: number;
  has_locking = false;
  has_can_log = false;
  has_fuel_sensor = false;
  has_temp_sensor = false;
  is_active = false;
  is_evacuation_enabled = false;
  imei: string;
  company_id: number;

  protected _marker: L.Marker | undefined;
  protected _isCurrent = false;

  constructor(tr: Tracker) {
    this.brand = tr.brand || '';
    this.device_id = tr.device_id || 0;
    this.model = tr.model || '';
    this.state_number = tr.state_number || '';
    this.type = tr.type || '';
    this.comment = tr.comment || '';
    this.driver = tr.driver || '';
    this.firmware = tr.firmware || '';
    this.max_speed = tr.max_speed || 120;
    this.mileage_allert = tr.mileage_allert || 0;
    this.mth_allert = tr.mth_allert || 0;
    this.has_locking = tr.has_locking || false;
    this.is_active = tr.is_active || false;
    this.is_evacuation_enabled = tr.is_evacuation_enabled || false;
    this.has_can_log = tr.has_can_log || false;
    this.has_fuel_sensor = tr.has_fuel_sensor || false;
    this.has_temp_sensor = tr.has_temp_sensor || false;
    this.imei = tr.imei || '';
    this.company_id = tr.company_id || 0;
    this.state = this.parseState(tr.state);

    if (this.is_active) {
      this.makeMarker();
    }
  }

  parseState(st: IState): IState {
    return {
      last_active_time: st.last_active_time,
      lat: st.lat,
      lng: st.lng,
      speed: st.speed || 0,
      az: st.az,
      gps: st.gps || 0,
      gsm: st.gsm || 0,
      ign: st.ign || false,
      ext: st.ext || false,
      odometer: st.odometer || 0,
      alt: st.alt || 0,
      mileage_last: st.mileage_last || 0,
      mth_last: st.mth_last || 0,
      is_locked: st.is_locked || false,
      is_online: st.is_online || false,
      sensors: st.sensors || [],
      voltage: st.voltage || { battery: 0, external: 0, ignition: 0 },
      address: st.address || '',
      icons: st.icons || [],
      temperature: st.temperature || {},
      fuel: st.fuel,
    };
  }

  updateState(st: IState) {
    this.state = this.parseState(st);
    this.setCoords();
    this.setMarkerIcon();
  }

  getAttr(field: string): Array<string | number | null> {
    switch (field) {
      case 'state_number':
        return [956, this.state_number];
      case 'markAndModel':
        return [4726, this.brand + ' ' + this.model];
      case 'groupinfo':
        return [0, null];
      case 'driver':
        return [262, this.driver || null];
      case 'mileage_last':
        return [479, this.state.mileage_last];
      case 'mth_last':
        return [494, this.state.mth_last];
      case 'comment':
        return [456, this.comment || null];
      case 'device_id':
        return [1188, this.device_id];
      case 'sub_group':
        return [0, null];
      default:
        return [0, null];
    }
  }

  getMarker(): L.Marker {
    return this._marker || this.makeMarker();
  }

  toggleToolTip(val: boolean) {
    if (val) {
      this.openToolTip();
    } else {
      this.hideTooltip();
    }
  }

  openToolTip() {
    this.getMarker().openTooltip();
  }

  hideTooltip() {
    if (this.getMarker().isTooltipOpen()) {
      this.getMarker().closeTooltip();
    }
  }

  makeMarker(): L.Marker {
    const l = new L.Marker(this.getCoords());
    this._marker = l;
    this.setMarkerIcon();
    return l;
  }

  selectOnMap(): void {
    this.openToolTip();
  }

  clone(): Tracker {
    return new Tracker(this);
  }

  setCurrent() {
    this._isCurrent = true;
  }

  unsetCurrent() {
    this._isCurrent = false;
  }

  get isCurrent() {
    return this._isCurrent;
  }

  get label(): string {
    const set = new Set([this.state_number, this.brand, this.model]);
    return Array.from(set).join(' ');
  }

  get value(): number {
    return this.device_id;
  }

  get isOnline(): boolean {
    return this.state.is_online;
  }

  get isLocked(): boolean {
    return this.state.is_locked;
  }

  get fuel_level(): number | string {
    if (this.has_fuel_sensor && this.state.fuel) {
      const tank_1 = this.state.fuel.tank_1 || 0;
      const tank_2 = this.state.fuel.tank_2 || 0;
      return Math.round(tank_1 + tank_2);
    }
    return '-';
  }

  get temperature(): number | string {
    if (this.has_temp_sensor && this.state.temperature) {
      return this.state.temperature.sensor_1;
    }
    return '-';
  }

  get getTempColor(): string {
    if (this.has_temp_sensor && this.state.temperature) {
      const temp = this.state.temperature.sensor_1;

      if (temp < 0) {
        return 'color: blue;';
      } else if (temp < 10) {
        return 'color: orange;';
      } else {
        return 'color: red;';
      }
    }
    return '';
  }

  get getLastActiveTime(): string {
    const tm = new Date();
    tm.setTime(this.state.last_active_time * 1000);
    return tm.toLocaleString('ru-RU');
  }

  static create(u: User): Tracker {
    const data = {
      company_id: u.company_id,
      type: 'Android',
      state: {} as IState,
    } as Tracker;
    return new Tracker(data);
  }

  getTooltipTitle(): string {
    return this.state.icons[0].tooltip;
  }

  setMarkerIcon() {
    if (!this._marker) return;
    this._marker.setIcon(
      new L.Icon({ iconUrl: this.getIcon(), iconSize: [15, 15] })
    );
  }

  getIcon(): string {
    const name = this.state.icons[0].name;
    return 'icons/tracker/' + name + '.gif';
  }

  getCoords(): L.LatLng {
    return new L.LatLng(this.state.lat, this.state.lng);
  }

  setCoords() {
    if (!this._marker) return;
    this._marker.setLatLng(this.getCoords());
  }

  getAddress() {
    //
  }

  parseSensors(): Record<string, string | number>[] {
    const result = [];

    if (this.has_locking) {
      result.push({
        name: 'icons/other/locking.png',
        title: 4836,
        size: '10pt',
      });
    }
    if (this.has_fuel_sensor) {
      result.push({
        name: 'icons/other/fuel.png',
        title: 4838,
        size: '6pt',
      });
    }
    if (this.has_temp_sensor) {
      result.push({
        name: 'icons/other/temp.png',
        title: 4837,
        size: '6pt',
      });
    }
    if (this.has_can_log) {
      result.push({
        name: 'icons/other/can.png',
        title: 4839,
        size: '6pt',
      });
    }
    for (const s of this.state.sensors) {
      const title = s.name || 'Неизвестный датчик';
      let name = '';

      switch (true) {
        case /Тревожная кнопка/i.test(title):
          name = 'icons/other/alarm_button.png';
          break;
        case /зажигани/i.test(title):
          name = 'icons/can/s1.png';
          break;
        case /дверь/i.test(title):
        case /вскрытие/i.test(title):
          name = 'icons/can/s56.png';
          break;
        case /термодатчик/i.test(title):
          name = 'icons/tracker/temp.png';
          break;
        case /раздаточная/i.test(title):
          name = 'icons/tracker/cargo.png';
          break;
        default:
          name = 'icons/tracker/question_blue_16.png';
      }
      result.push({ title, name, size: '6pt' });
    }
    return result;
  }

  static markerSort(a: number, b: number, t1: Tracker, t2: Tracker): number {
    if (t1.is_active && !t2.is_active) return -1;
    if (t2.is_active && !t1.is_active) return 1;
    if (t1.state.is_online && !t2.state.is_online) return -1;
    if (t2.state.is_online && !t1.state.is_online) return 1;
    return 0;
  }
}
