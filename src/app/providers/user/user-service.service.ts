import { Usuario } from "src/app/model/usuario";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  API_URL: string = "http://localhost:21093/";

  constructor(public http: HttpClient, public storage: Storage) { }

  getUser(data): Observable<Usuario[]> {
    const dataStr = JSON.stringify(data);
    return this.http
      .get<Usuario[]>(this.API_URL + "users/get/" + encodeURI(dataStr))
      .pipe(tap(console.log));
  }

  loginAuthentication(login) {
    let username = login['username']
    let password = login['password']

    let userLogin = {
      login: username,
      password: password
      // UUID: "UUID"
    };

    return this.getUser(userLogin).subscribe(result => {
      console.log(result)
    })

  }


}
