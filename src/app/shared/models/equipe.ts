export class Equipe {
  // tslint:disable-next-line:variable-name
  _id: string;
  nom: string;
  avatar: string;


  constructor(id: string, nom: string, avatar: string) {
    this._id = id;
    this.nom = nom;
    this.avatar = avatar;
  }
}
