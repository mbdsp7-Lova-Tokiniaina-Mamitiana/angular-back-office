export class Pari {
  // tslint:disable-next-line:variable-name
  _id: string;
  description: string;
  cote: number;


  constructor(id = '', description = '', cote = 1) {
    this._id = id;
    this.description = description;
    this.cote = cote;
  }

  isValid(): boolean {
    return this.description.trim() !== '' && this.cote >= 1;
  }
}
