export class Equipe {
  // tslint:disable-next-line:variable-name
  _id?: string;
  nom?: string;
  avatar?: string;



  // tslint:disable-next-line:variable-name
  constructor(_id?: string, nom?: string, avatar?: string) {
    if (_id && nom && avatar) {
      this._id = _id;
      this.nom = nom;
      this.avatar = avatar;
    }
  }
}
