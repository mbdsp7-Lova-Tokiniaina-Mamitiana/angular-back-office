import { Component, OnInit } from '@angular/core';
import {Match} from '../../shared/models/match';
import {ActivatedRoute} from '@angular/router';
import {Equipe} from '../../shared/models/equipe';
import {DatePipe} from '@angular/common';

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

  constructor(private route: ActivatedRoute) {
    this.isNew = [null, undefined].includes(this.route.snapshot.params.id);
    this.match = new Match ('',
      '2018-07-22',
      new Equipe('e1', 'Chelsea', 'https://logodownload.org/wp-content/uploads/2017/02/chelsea-fc-logo-1.png'),
      new Equipe('e2', 'Man City', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRARu6vDD55MzDzZh6CaANLfVnNBt4x1Gu4Lwh3ZvIzkb8jGvFZCWtMXTS8nD2drq3nnfM&usqp=CAU'),
      'À venir',
      53.4834,
      -2.1995
    );
    this.coordinateChanged();
  }

  ngOnInit(): void {
  }

  coordinateChanged(): void{
    this.mapCenter = {
      lat: this.match.lat,
      lng: this.match.lng
    };
  }
}
