import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private readonly PATH: string = 'lancamentos/';

  constructor(
    private http: HttpClient
  ) { }

  getBalanceUser(userId: string): Observable<any> {
    return this.http.get(
      env.baseApiUrl.concat(this.PATH).concat(userId)
    );
  }
}
