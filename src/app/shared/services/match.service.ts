import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ErrorService} from './error.service';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ErrorTracker} from '../models/error-tracker';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private readonly api = environment.node_endpoint;
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }


  getAll(page?: number, limit?: number): Observable<any> {
    let url: string;
    if (page && limit) {
      url = `${this.api}/matchs?page=${page}&limit=${limit}`;
    } else {
      url = `${this.api}/matchs`;
    }
    return this.http.get<any>(url);
  }

  getById(idMatch: string): Observable<any> {
    return this.http.get<any>(`${this.api}/match/${idMatch}`);
  }



}
