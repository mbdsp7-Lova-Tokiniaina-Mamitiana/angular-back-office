import { Component, OnInit } from '@angular/core';
import {Match} from '../../shared/models/match';
import {ActivatedRoute} from '@angular/router';
import {Equipe} from '../../shared/models/equipe';
import {DatePipe} from '@angular/common';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {EquipeService} from '../../shared/services/equipe.service';
import {MatchService} from '../../shared/services/match.service';

@Component({
  selector: 'app-modifier-match',
  templateUrl: './modifier-match.component.html',
  styleUrls: ['./modifier-match.component.scss']
})
export class ModifierMatchComponent implements OnInit {
// this.route.snapshot.params.id
  match: Match;
  isNew = false;
  mapCenter = {
    lat: 0,
    lng: 0
  };
  equipes: Equipe[] = [];
  apiResult: any;

  constructor(private route: ActivatedRoute,
              public datepipe: DatePipe,
              private equipeService: EquipeService,
              private matchService: MatchService,
              private ngxService: NgxUiLoaderService) {
    this.isNew = [null, undefined].includes(this.route.snapshot.params.id);
    const date: string = this.datepipe.transform(new Date(), 'yyyy-MM-dd') || '';
    this.match = new Match(new Equipe(), new Equipe(), '', date, false, 53.4834, -2.1995);
    // this.match = {lat: 53.4834, lng: -2.1995};
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
          this.match.date_match = this.datepipe.transform(new Date(match.date_match), 'yyyy-MM-dd') || '';
          this.coordinateChanged();
          this.ngxService.stopLoader('loader-02');
        }, error => { this.ngxService.stop(); });
      }
    }, error => { this.ngxService.stop(); });
  }

  coordinateChanged(): void{
    this.mapCenter = {
      lat: this.match.latitude || 0,
      lng: this.match.longitude || 0
    };
  }

  saveOrUpdate(): void {
    debugger;
  }

  compareByEquipeId(e1: Equipe, e2: Equipe): boolean{
    return e1._id === e2._id;
  }
}
