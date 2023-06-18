import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class MovementService{

    constructor(private http: HttpClient){}

    getFromOffice(val: any){
        return this.http.get('http://localhost:3002/api/v1/OrganizationOffices/'+val);
    }
    // getToOffice(val: any){
    //     return this.http.get('http://localhost:3002/api/v1/currentuserId/'+val);
    // }
    getToOffice(val: any){
        return this.http.get('http://localhost:3002/api/v1/OrganizationOffices/'+val);
    }
    
}