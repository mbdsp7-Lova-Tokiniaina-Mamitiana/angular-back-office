import {Component, OnInit} from '@angular/core';
import {Match} from '../../shared/models/match';
import {ActivatedRoute, Router} from '@angular/router';
import {Equipe} from '../../shared/models/equipe';
import {DatePipe} from '@angular/common';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {EquipeService} from '../../shared/services/equipe.service';
import {MatchService} from '../../shared/services/match.service';
import {Pari} from '../../shared/models/pari';

@Component({
  selector: 'app-modifier-match',
  templateUrl: './modifier-match.component.html',
  styleUrls: ['./modifier-match.component.scss']
})
export class ModifierMatchComponent implements OnInit {
  match: Match;
  mapCenter = {
    lat: 0,
    lng: 0
  };
  equipes: Equipe[] = [];
  apiResult: any;
  matchInputTime: any;
  pariToAdd = new Pari();

  /**
   * If this.route.snapshot.params.id is defined, this.match is not a new Match
   */
  isNew = false;
  errorMessage = '';
  isFormValid = false;
  isAddingPari = false;
  isFinishingMatch = false;

  constructor(private route: ActivatedRoute,
              public datepipe: DatePipe,
              private equipeService: EquipeService,
              private matchService: MatchService,
              private ngxService: NgxUiLoaderService,
              private router: Router) {
    this.isNew = [null, undefined].includes(this.route.snapshot.params.id);
    const date: string = this.datepipe.transform(new Date(), 'yyyy-MM-dd') || '';
    this.match = new Match(new Equipe(), new Equipe(), '', date, false, 53.4834, -2.1995);
    this.coordinateChanged();
  }

  ngOnInit(): void {
    this.ngxService.startLoader('loader-01');
    this.equipeService.getAll(1, 1000).subscribe(result => {
      this.apiResult = result || [];
      if (this.apiResult.docs) {
        this.equipes = this.apiResult.docs.map((doc: any) => new Equipe(doc._id, doc.nom, doc.avatar));
      }
      this.ngxService.stopLoader('loader-01');
      if (!this.isNew) {
        this.ngxService.startLoader('loader-02');
        this.matchService.getById(this.route.snapshot.params.id).subscribe(match => {
          this.match = match;
          this.match.paris = match.pari.map((pari: any) => new Pari(pari._id, pari.description, pari.cote));
          const dateTime = (this.datepipe.transform(new Date(match.date_match), 'yyyy-MM-dd HH:mm') || '').split(' ');
          this.match.date_match = dateTime[0];
          this.matchInputTime = dateTime[1] || '';
          this.coordinateChanged();
          this.ngxService.stopLoader('loader-02');
          this.updateFormValidStatus();
        }, error => { this.ngxService.stop(); });
      }
      this.updateFormValidStatus();
    }, error => { this.ngxService.stop(); });
  }

  coordinateChanged(): void{
    this.mapCenter = {
      lat: this.match.latitude || 0,
      lng: this.match.longitude || 0
    };
  }

  saveOrUpdate(): void {
    if (!this.isMatchFormInvalid()) {
      this.errorMessage = 'Veuillez completer tous les champs';
    }
    // Transform long date to string  with the format yyyy-MM-dd
    this.match.date_match = `${this.datepipe.transform(new Date(this.match.date_match || ''), 'yyyy-MM-dd')} ${this.matchInputTime}`;
    // If we need to insert a new match
    if (this.isNew) {
      this.matchService.save(this.match).subscribe(match => this.router.navigate(['/home']));
      return;
    }
    // If not, update
    this.matchService.updateMatch(this.match).subscribe(match => this.router.navigate(['/home']));
  }

  compareByEquipeId(e1: Equipe, e2: Equipe): boolean{
    return e1._id === e2._id;
  }

  terminerMatch(): void{
    this.ngxService.startLoader('loader-01');
    this.matchService.finishMatch(this.match,
      () => {
        this.ngxService.stopLoader('loader-01');
        this.router.navigate(['/home']);
      },
      (err) => {
        console.error(err);
        this.ngxService.stopLoader('loader-01');
        this.router.navigate(['/home']);
    });
  }

  isMatchFormInvalid(): boolean {
    return !Object.keys(this.match.equipe1).length
      || !Object.keys(this.match.equipe2).length
      || this.match.date_match === undefined
      || !this.match.date_match.length
      || this.matchInputTime === undefined
      || !this.matchInputTime.length;
  }

  updateFormValidStatus(): void {
    this.isFormValid = !this.isMatchFormInvalid();
  }

  changeAddingPariStatus(status?: boolean): void {
    this.isAddingPari = status ? status : !this.isAddingPari;
    this.pariToAdd = new Pari();
  }

  changeIsFinishingMatchStatus(status?: boolean): void {
    this.isFinishingMatch = status ? status : !this.isFinishingMatch;
  }

  addPariToMatch(): void {
    // debugger;
    if (!this.pariToAdd.isValid()) { return; }
    this.match.paris.push(this.pariToAdd);
    this.changeAddingPariStatus(false);
    // debugger;
  }

  removePariFromMatch(pariToRemove: Pari): void {
    this.match.paris = this.match.paris.filter(pari => pari !== pariToRemove);
  }
}
