import {Component, OnInit} from '@angular/core';
import {Match} from '../../shared/models/match';
import {Router} from '@angular/router';
import {MatchService} from '../../shared/services/match.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ApiResult} from '../../shared/models/api-result';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  matches: Match[] = [];
  apiResult = new ApiResult();
  page = 1;
  limit = 10;

  constructor(private router: Router,
              private matchService: MatchService,
              private ngxService: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.updateMatchList();
  }

  navigateToMatch(id?: string): void {
    if (id) {
      this.router.navigate(['/home/match/', id]).then(() => null);
      return;
    }
    this.router.navigate(['/home/match']).then(() => null);
  }

  deleteMatch(id: string | undefined): void {
    if (!id) { return; }
    this.ngxService.start();
    this.matchService.deleteMatch(id).subscribe(() => {
      this.updateMatchList();
    },
        error => {
          this.ngxService.stop();
          console.error(error);
        });
  }

  updateMatchList( pageNumber = 1, limit = 10): void {
    this.matchService.getAll(pageNumber, this.limit).subscribe(result => {
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
          }, doc._id, doc.date_match, doc.etat, doc.latitude, doc.longitude)
        );
      }
      this.ngxService.stop();
    }, (error) => {
      console.error(error);
      this.ngxService.stop();
    });
  }
}
