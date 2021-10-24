export interface IIcon {
  name: string;
  tooltip: string;
}

export interface IVoltage {
  battery: number;
  external: number;
  ignition: number;
}

export interface IFuel {
  max_volume: number;
  tank_1: number;
  tank_2?: number;
}

export interface ISensor {
  name: string;
  port: string;
  state: boolean;
}

export interface IState {
  last_active_time: number;
  lat: number;
  lng: number;
  alt: number;
  az: number;
  ext: boolean;
  gps: number;
  gsm: number;
  ign: boolean;
  is_locked: boolean;
  is_online: boolean;
  mileage_last: number;
  mth_last: number;
  odometer: number;
  sensors: ISensor[];
  speed: number;
  voltage: IVoltage;
  icons: IIcon[];
  address: string;
  temperature?: Record<string, number>;
  fuel?: IFuel;
  [key: string]: string | number | unknown;
}
