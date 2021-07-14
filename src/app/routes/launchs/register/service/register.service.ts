import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly PATH: string = 'lancamentos';

  constructor(
    private http: HttpClient,
  ) { }

  getDespesasTypes(): Observable<any> {
    return this.http.get(
      env.baseApiUrl.concat(this.PATH)
    )
  }

  persit(data): Observable<any> {
    return this.http.post(
      env.baseApiUrl.concat(this.PATH),
      data
    )
  }

}
