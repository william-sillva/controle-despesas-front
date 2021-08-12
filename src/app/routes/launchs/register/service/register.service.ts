import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly PATH: string = 'lancamentos/';
  private readonly PATH_DESPESAS = this.PATH.concat('despesas');

  constructor(
    private http: HttpClient,
  ) { }

  getDespesasTypes(): Observable<any> {
    return this.http.get(
      env.baseApiUrl.concat(this.PATH_DESPESAS)
    )
  }

  getLaunchUser(id: string, userId: string): Observable<any> {
    return this.http.get(
      env.baseApiUrl.concat(this.PATH)
        .concat(id)
        .concat('/')
        .concat(userId)
    );
  }

  persit(data): Observable<any> {
    return this.http.post(
      env.baseApiUrl.concat(this.PATH),
      data
    )
  }

}
