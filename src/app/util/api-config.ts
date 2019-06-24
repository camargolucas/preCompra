import { RequestOptions, Headers } from "@angular/http";
import { StorageService } from '../providers/storage/storage.service';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ApiConfig {

    private requestOptions: any;
    //readonly API_URL: string = "http://apprequestapi.kinghost.net:21093/"
    readonly API_URL = "http://localhost:21093/";

    private headers;

    private token: string;
    constructor() {

    }


    getHeaderConfig(token) {
        this.headers = new Headers();
        this.headers = {

            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": token

        };

        this.requestOptions = new RequestOptions({ headers: this.headers });
        return this.requestOptions;

    }
}
