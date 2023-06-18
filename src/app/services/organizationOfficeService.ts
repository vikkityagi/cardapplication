import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalserviceService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class organizationOfficeService {
    constructor( private http:HttpClient,
        private globalservice :GlobalserviceService,
        private router:Router) { }
    
  
  getMinistry() {
    return this.http
      .get("http://localhost:3002/api/v1/ministry");
  }

  getDepartment(ministryCode: any) {
    //console.log("ministry code" + ministryCode);
    return this.http
      .get("http://localhost:3002/api/v1/departments", {
        params: { ministryCode: ministryCode },
      })
  }

  getOrganization(deptCode: any) {
    //console.log("dep code"+deptCode);
    return this.http
      .get("http://localhost:3002/api/v1/organizations", {
        params: { departmentCode: deptCode },
      })
  }

   getData(currentUserId: any){
    return this.http.get(this.globalservice.baseurl+'/OrganizationOffice/'+currentUserId).pipe(catchError(err=>this.catchAuthError(err)));
   }

   onSubmit(val: any){
    return this.http.post(this.globalservice.baseurl+'/OrganizationOffices',val).pipe(catchError(err=>this.catchAuthError(err)))
   }

   getAll(value: any){
    return this.http.get(this.globalservice.baseurl+'/OrganizationOffices',{
      params: { organizationId: value }
    }).pipe(catchError(err=>this.catchAuthError(err)));
   }

  catchAuthError(error: any): Observable<any> {
    if(error && error.error && error.error.message){
      //alert(error.error.message)
    }else if(error && error.message){
      //alert(error.message)
    }else {
      //alert(JSON.stringify(error))
    }
    return throwError(error);
  }
} 
