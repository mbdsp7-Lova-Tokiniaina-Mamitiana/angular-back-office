import {Equipe} from './equipe';
import {Pari} from './pari';

export class Match {
  // tslint:disable-next-line:variable-name
  _id?: string;
  // tslint:disable-next-line:variable-name
  date_match?: string;
  equipe1: Equipe;
  equipe2: Equipe;
  etat?: boolean;
  latitude?: number;
  longitude?: number;
  paris: Pari[];
  date?: Date;

  constructor(equipe1: Equipe, equipe2: Equipe, id?: string, date?: string, etat?: boolean, lat?: number, lng?: number, paris = []) {
    this._id = id;
    this.date_match = date;
    this.equipe1 = equipe1;
    this.equipe2 = equipe2;
    this.etat = etat;
    this.latitude = lat;
    this.longitude = lng;
    this.paris = paris;
    this.date = new Date(date || '');
  }
}
