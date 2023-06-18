import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CghsUserService {

    baseurl: string = 'http://localhost:3002/api/v1/';

    constructor(private http: HttpClient){}

    getCghsUserData(userId: any): Observable<any>{
        return this.http.get(this.baseurl+'CGHSInchargeApplication/'+userId)
    }

          
    eSignCghsUser(userId: any): Observable<any>{
        const headers = { 'aceept': 'application/json', 'content-type': 'application/json' };
        return this.http.get(this.baseurl+'CGHSInchargeApplication/'+userId+'/esign',{ headers: headers });
    }
       
}