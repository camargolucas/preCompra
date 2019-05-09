import { Usuario } from "src/app/model/usuario";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  // API_URL: string = "http://apprequestapi.kinghost.net:21093/";
  API_URL: string = "http://localhost:21093/"
  constructor(public http: HttpClient) {

  }

  getUser(data): Observable<Usuario[]> {
    const dataStr = JSON.stringify(data);
    return this.http
      .get<Usuario[]>(this.API_URL + "users/get/" + encodeURI(dataStr))
      .pipe(tap(console.log));
  }

  loginAuthentication(login) {
    return this.getUser(login)
  }


}
