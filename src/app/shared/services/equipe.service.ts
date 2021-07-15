import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private readonly api = environment.endpoint;
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }


  getAll(page?: number, limit?: number): Observable<any> {
    let url: string;
    if (page && limit) {
      url = `${this.api}/equipes?page=${page}&limit=${limit}`;
    } else {
      url = `${this.api}/equipes`;
    }
    return this.http.get<any>(url);
  }
}
