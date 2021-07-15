import { Component, OnInit } from '@angular/core';
import {Match} from '../../shared/models/match';
import {ActivatedRoute} from '@angular/router';
import {Equipe} from '../../shared/models/equipe';
import {DatePipe} from '@angular/common';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {EquipeService} from '../../shared/services/equipe.service';

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
              private ngxService: NgxUiLoaderService) {
    this.isNew = [null, undefined].includes(this.route.snapshot.params.id);
    const date: string = this.datepipe.transform(new Date(), 'yyyy-MM-dd') || '';
    this.match = new Match(new Equipe(), new Equipe(), '', date, '', 53.4834, -2.1995);
    // this.match = {lat: 53.4834, lng: -2.1995};
    this.coordinateChanged();
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.equipeService.getAll().subscribe(result => {
      this.apiResult = result || [];
      if (this.apiResult.docs) {
        this.equipes = this.apiResult.docs.map((doc: any) => new Equipe(doc));
      }
      this.ngxService.stop();
    });
  }

  coordinateChanged(): void{
    this.mapCenter = {
      lat: this.match.lat || 0,
      lng: this.match.lng || 0
    };
  }
}
