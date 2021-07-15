import { Component, OnInit } from '@angular/core';
import {Equipe} from '../../shared/models/equipe';
import {Match} from '../../shared/models/match';
import {Router} from '@angular/router';
import {MatchService} from '../../shared/services/match.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ApiResult} from '../../shared/models/api-result';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  matches: Match[] = [];
  apiResult: any;

  constructor(private router: Router, private matchService: MatchService, private ngxService: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.matchService.getAll().subscribe(result => {
      this.apiResult = result || [];
      if (this.apiResult.docs) {
        this.matches = this.apiResult.docs.map((doc: any) => new Match({
            _id: doc.equipe1._id,
            avatar: doc.equipe1.avatar,
            nom: doc.equipe1.nom,
          }, {
            _id: doc.equipe2._id,
            avatar: doc.equipe2.avatar,
            nom: doc.equipe2.nom,
          }, doc._id, doc.date_match, doc.etat ? 'Terminé' : 'A venir', doc.latitude, doc.longitude)
        );
      }
      // debugger;
      this.ngxService.stop();
    });
  }

  navigateToMatch(): void {
    this.router.navigate(['/home/match']).then(() => null);
  }
}
