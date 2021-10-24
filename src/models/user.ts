export type aclLevel =
  | 'reports'
  | 'events'
  | 'logistics'
  | 'history'
  | 'routes'
  | 'settings'
  | 'subgroups'
  | 'balance'
  | 'docs'
  | 'auth'
  | 'support'
  | 'control'
  | 'lk'
  | 'shtrafs'
  | 'blocking'
  | 'disable_fuel';

export interface UserSettings {
  show_headers: boolean;
  marker_label: Record<number, Record<'value', string>>;
}

export class User {
  id: number;
  login: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  company: string;
  company_id: number;
  vip: boolean;
  country: string;
  groups: number[];
  balance_ao: number;
  balance_sms: number;
  smsPrice: number;
  acl: string | number[];
  expiration_date: string;
  login_time: Date;
  settings: UserSettings;

  constructor(u: User) {
    this.id = u.id || 0;
    this.login = u.login || '';
    this.password = u.password || '';
    this.name = u.name || '';
    this.surname = u.surname || '';
    this.patronymic = u.patronymic || '';
    this.email = u.email || '';
    this.phone = u.phone || '';
    this.company = u.company || '';
    this.company_id = u.company_id || 0;
    this.groups = u.groups || [];
    this.balance_ao = u.balance_ao || 0;
    this.balance_sms = u.balance_sms || 0;
    this.smsPrice = u.smsPrice || 1.2;
    this.position = u.position || '';
    this.status = u.status || '';
    this.acl = u.acl || '[]';
    this.expiration_date = u.expiration_date;
    this.country = u.country;
    this.vip = u.vip || false;
    this.settings = u.settings || { 0: 'state_number', show_headers: false };
    this.login_time = new Date();

    if (typeof this.acl === 'string') {
      this.acl = JSON.parse(this.acl) as number[];
    }
  }
}
