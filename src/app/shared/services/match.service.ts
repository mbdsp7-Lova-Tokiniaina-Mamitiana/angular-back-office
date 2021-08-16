import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ErrorService} from './error.service';
import {Observable} from 'rxjs';
import {Match} from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private readonly nodeApiUri = environment.node_endpoint;
  private readonly grailsApiUri = environment.grails_endpoint + 'api';
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }


  getAll(page?: number, limit?: number): Observable<any> {
    let url: string;
    if (page && limit) {
      url = `${this.nodeApiUri}/matchs/search`;
    } else {
      url = `${this.nodeApiUri}/matchs/search`;
    }
    return this.http.post<any>(url, {page, limit});
  }

  getById(idMatch: string): Observable<any> {
    return this.http.get<any>(`${this.nodeApiUri}/match/${idMatch}`);
  }

  save(match: Match): Observable<any> {
    delete match._id;
    return this.http.post(`${this.nodeApiUri}/match/`, match);
  }

  updateMatch(match: Match): Observable<any> {
    return this.http.put(`${this.nodeApiUri}/match/`, match);
  }

  deleteMatch(idMatch: string): Observable<any> {
    return this.http.delete(`${this.nodeApiUri}/match/${idMatch}`);
  }

  finishMatch(match: Match, callback: () => void, onerror: (error: string) => void): void {
    const promises: Promise<any>[] = match.paris
      .filter(pari => pari.gagnant)
      .map(pari => this.http.post(
      `${this.grailsApiUri}/distribution`,
      {id: pari._id})
      .toPromise());
    promises.push(this.http.post(`${this.nodeApiUri}/terminerMatch`, {id: match._id}).toPromise());
    Promise.all(promises).then(data => {
      this.http.post(`${this.grailsApiUri}/terminermatch`, {id: match._id}).subscribe(() => callback());
    }).catch(err => onerror(err));
  }

}
