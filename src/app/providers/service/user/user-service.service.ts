import { Usuario } from './../../../model/usuario';
import { StorageService } from 'src/app/providers/storage/storage.service';
import { ApiConfig } from './../../../util/api-config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { Util } from 'src/app/util/util';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';



@Injectable({
  providedIn: "root"
})

export class UserServiceService extends ApiConfig {
  loading: any;
  constructor(public http: HttpClient, storage: StorageService, private loadingController: LoadingController) {
    super();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Autenticando aguarde ...'
    });
    await this.loading.present();
  }

  async dismissLoading() {

    return await this.loading.dismiss();
  }


  getUser(data) {


    let dataStr = JSON.stringify(data);

    return this.http
      .get(this.API_URL + "users/get/" + encodeURIComponent(dataStr))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `client ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `server ${error.status}\nMessage: ${error.message}`;
          }
          this.dismissLoading();
          return throwError(errorMessage);
        })
      );
  }

  loginAuthentication(login) {
    return this.getUser(login);
  }

  getIsAvaibleToBuy(usuario: Usuario) {
    let userData = JSON.stringify(usuario)

    return this.http.get(this.API_URL + "users/getIsAvaibleToBuy/" + encodeURIComponent(userData))
  }


}
