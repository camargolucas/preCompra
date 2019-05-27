import { Usuario } from "src/app/model/usuario";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Util } from 'src/app/util/util';

@Injectable({
  providedIn: "root"
})
export class UserServiceService extends Util {

  constructor(public http: HttpClient) {
    super()
  }


  getUser(data): Observable<Usuario[]> {
    let dataStr = JSON.stringify(data);
    return this.http
      .get<Usuario[]>(this.API_URL + "users/get/" + encodeURI(dataStr))
      .pipe(tap(console.log));
  }

  loginAuthentication(login) {
    return this.getUser(login);
  }


}
