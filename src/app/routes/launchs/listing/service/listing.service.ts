import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private readonly PATH: string = 'lancamentos/';
  private readonly PATH_USUARIO = this.PATH.concat('usuario');

  constructor(
    private http: HttpClient,
  ) { }

  findLaunchsByUser(data): Observable<any> {
    return this.http.post(
      env.baseApiUrl.concat(this.PATH_USUARIO),
      data
    );
  }

  deleteLaunch(id: string, userId: string): Observable<any> {
    return this.http.delete(
      env.baseApiUrl.concat(this.PATH)
        .concat(id)
        .concat('/')
        .concat(userId)
    );
  }

}
