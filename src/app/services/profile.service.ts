import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalserviceService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
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

  patchOffices(organizationId: any): Observable<any>{
    return this.http
    .get("http://localhost:3002/api/v1/OrganizationOffices",{
        params: { organizationId: organizationId },
    })
  }

  getOffices(event: any): Observable<any>{
    return this.http
    .get("http://localhost:3002/api/v1/OrganizationOffices",{
        params: { organizationId: event.value },
    }) 
  }

  getFamilyByMemberId(applicationId: any,memeberId: any,){
    return this.http.get(this.globalservice.baseurl+'/ben_registration_application/'+applicationId+'/family_member/'+memeberId);
  }
  deleteFamilyByMemberId(applicationId: any,memeberId: any,){
    return this.http.delete(this.globalservice.baseurl+'/ben_registration_application/'+applicationId+'/family_member/'+memeberId);
  }

  getMinitryName(ministryId: any){
    return this.http
          .get(
            "http://localhost:3002/api/v1/ministry/" +
            ministryId
          );
  }

  getDepartmentName(departmentId: any){
    return this.http
          .get(
            "http://localhost:3002/api/v1/departments/" +
            departmentId
          );
         
  }

  getOrganizationName(organizationId: any){
    return this.http
          .get(
            "http://localhost:3002/api/v1/organizations/" +
            organizationId
          );
  }

  getCghsCity(){
    return this.http
    .get("http://localhost:3002/api/v1/CghsCities").pipe(catchError(err=>(this.catchAuthError(err))));
  }

  onSubmit(value: any){
    return this.http.post(this.globalservice.baseurl+'/profile-resources',value).pipe(catchError(err=>this.catchAuthError(err)))
  }

  getParichayData(id: any){
    return this.http.get(this.globalservice.baseurl+'/parichay-users',{
      params: {parichayId: id}
    }).pipe(catchError(err=>this.catchAuthError(err)))
  }

  getRoles(){
    return this.http.get(this.globalservice.baseurl+'/Roles').pipe(catchError(err=>this.catchAuthError(err)));
  }

  loadprofile(parichayUserId: any){
    return this.http.get(this.globalservice.baseurl+'/profile-resources').pipe(catchError(err=>this.catchAuthError(err)));
  }

  onSubmitCghsUser(val: any){
    return this.http.post(this.globalservice.baseurl+'/CGHSInchargeApplications',val).pipe(catchError(err=>this.catchAuthError(err)));
  }

  fillcghs_userForm(val: any){
    return this.http.get(this.globalservice.baseurl+'/profile-resource').pipe(catchError(err=>this.catchAuthError(err)));
  }

  edit(id: any,roleId: any,formValue: any): Observable<any>{
    console.log("data send"+id+" "+roleId+" "+JSON.stringify(formValue))
    

    const url = this.globalservice.baseurl+'/ProfileResources';
    
    return this.http.put(url,formValue);
  }

  patchProfile(id:any,roleId: any):  Observable<any>{
    return this.http.get(this.globalservice.baseurl+'/profile-resource/'+id,{
      params: {roleId: roleId}
    })
  }
  

  catchAuthError(error: any): Observable<any> {
    if(error && error.error && error.error.message){
      //console.log(error.error.message)
    }else if(error && error.message){
      //console.log(error.message)
    }else {
      //console.log(JSON.stringify(error))
    }
    return throwError(error);
  }
} 
