import {Equipe} from './equipe';

export class Match {
  // tslint:disable-next-line:variable-name
  _id: string;
  date: string;
  equipe1: Equipe;
  equipe2: Equipe;
  etat: string;
  lat: number;
  lng: number;

  constructor(id: string, date: string, equipe1: Equipe, equipe2: Equipe, etat: string, lat: number, lng: number) {
    this._id = id;
    this.date = date;
    this.equipe1 = equipe1;
    this.equipe2 = equipe2;
    this.etat = etat;
    this.lat = lat;
    this.lng = lng;
  }
}
