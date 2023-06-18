import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalserviceService } from './global.service';
import { PrimaryBeneficiary } from '../components/beneficary-card/PrimaryBeneficiary';


@Injectable({
  providedIn: 'root'
})

export class AuthserviceService {

  detail: any;
  nodalpdf: any;
  approvingpdf: any;
  cookieService: any;
  id: any;
  constructor( private http:HttpClient,
    private globalservice :GlobalserviceService,
    private router:Router) { }
    url = 'http://localhost:3002/api/addnodal';
    url1 = 'http://localhost:3002/api/v1/onboarding';



  onSubmitOnboarding(value: any){
    //console.log('onboarding  call')
    //console.log(value)
    return this.http.post(this.url1,value).subscribe(data=>{
      this.detail = data;
      //console.log('detail',this.detail);
      //console.log('detail',this.detail==null);
      if(this.detail!=null){
        this.router.navigate(['/print/'+this.detail.id])
        
      } 
    })
  }


  OnboardingApplication(value: any){
    //console.log('value type',typeof parseInt(value))
    
  }

  

  OnboardingApplicationNodalpdf(value: any){
    return this.http
      .get('http://localhost:3002/api/v1/onboarding/'+parseInt(value), {
        params: { fields: 'nodalpdf' },
      })
      .subscribe((data) => {
        return data;
        
      });
  }
  
  OnboardingApplicationApprovingpdf(value: any){
    return this.http
      .get('http://localhost:3002/api/v1/onboarding/'+parseInt(value), {
        params: { fields: 'approvingpdf' },
      })
      .subscribe((data) => {
        return data;
      });
  }

  // public beneficaryService(abhaId: any): Observable<any> {
  //   const url = 'http://localhost:3002/api/v1/api/abha/'+abhaId.abhaid;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //         'Content-Type': 'application/json',

  //     })
  // };
  //   return this.http.post<any>(url, JSON.stringify(abhaId.abhaid),{headers: httpOptions.headers});
  // }

  public beneficaryService(user: any): Observable<any> {
    const url = 'http://localhost:3002/api/v1/api/abha/init/'+user.abhaid;
    return this.http.get<any>(url).pipe(catchError(err=>this.catchAuthError(err)));
  }

  public otpVerify(otp: any,txnId: any): Observable<any> {
    const url = 'http://localhost:3002/api/v1/api/abha/otp';
    
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',

      })
  };
    return this.http.post<any>(url, {"otp": otp,"txnId": txnId},{headers: httpOptions.headers});
  }

  getAbhaDatafromToken(token: any) {
    //console.log("tokenangular "+token)
    let header = new HttpHeaders().set(
      "xTOKEN",token
    );

    return this.http.get("http://localhost:3002/api/v1/abha/account/profile", {headers:header});
  }

  getBenRegistratinApplication(applicationId:any){
    if(applicationId == undefined)
      applicationId = 0
    const url1 = 'http://localhost:3002/api/v1/ben_registration_application';
    return this.http.get(url1+'/'+applicationId);
  }

  getPrimaryBeneficiaryByBenRegistrationId(path: any){
    const url2 = 'http://localhost:3002/api/v1/primary_beneficiaries?ben_registration_id='+path.toString();
    return this.http.get<PrimaryBeneficiary[]>(url2);
  }
  

  getFamilyMembersByPrimaryBeneficiaryId(id:any): Observable<any>{
    const url3 = 'http://localhost:3002/api/v1/ben_registration_application/';
    return this.http.get(url3+id+'/family_members');
  }

  finalSubmission(id: any): Observable<any>{
    const url = 'http://localhost:3002/api/v1/ben_registration_applications/'+id+'/:submit';
    return this.http.post(url,{});
  }

  getNodalbyOrganization(val: any){
    const url = 'http://localhost:3002/api/v1/getNodalOfficer';
    return this.http
      .get(url, {
        params: { organization_id: val },
      });
  }

  getMovement(val: any){
    const url = 'http://localhost:3002/api/v1/movements';
    return this.http
      .get(url, {
        params: { to: val },
      });
  }

  forward(val: any,roleId: any){
    const url = 'http://localhost:3002/api/v1/movement/'+val+'/:forward';
    return this.http
      .get(url,{
        params: {roleId: roleId}
      });
  }
  

  getTasklist(val: any,roleid: any){
    const url = 'http://localhost:3002/api/v1/movements/'+val+'/movements:tasklist';
    return this.http
      .get(url,{
        params: { roleId: roleid },
      });
  }

  getActivitylist(val1: any,val2: any){
    const url = 'http://localhost:3002/api/v1/parichay_user/'+val1+'/movements:activitylist';
    return this.http
      .get(url,{
        params: {roleId: val2},
      });
  }

  login(val: any){
    return this.http.get(this.globalservice.baseurl+'/home',{
      params: { string : val}
    }).pipe(catchError(err=>this.catchAuthError(err)))
  }

  getParichayData(val: any):Observable<any>{
    return this.http.get(this.globalservice.baseurl+'/parichay-users?parichayId='+val).pipe(catchError(err=>this.catchAuthError(err)),);
  }

  getRoleList(val: any): Observable<any>{
    return this.http.get(this.globalservice.baseurl+'/RoleRegistrations',{
      params: { userId: val}
    }).pipe(catchError(err=>this.catchAuthError(err)))
  }

  assignRole(val: any): Observable<any>{
    return this.http.get(this.globalservice.baseurl+'/RoleRegistrationsName',{
      params: {userId: val}
    }).pipe(catchError(err=> this.catchAuthError(err)))
  }

  draftlist(applicationType: any): Observable<any>{

    let queryParams = new HttpParams({});
    queryParams = queryParams.append("is_draft",true);
    let id = localStorage.getItem('currentUserId');
    //alert('id='+id);
    queryParams = queryParams.append("userId",id!);

    if(applicationType=='NodalRegistration'){
      return this.http.get(this.globalservice.baseurl+'/OnboardingApplications',{params: queryParams}).pipe(catchError(err=>this.catchAuthError(err)));
    }else if(applicationType=='BenRegistration'){
      return this.http.get(this.globalservice.baseurl+'/ben_registration_applications',{params: queryParams}).pipe(catchError(err=>this.catchAuthError(err)));
    }else{
      return this.http.get(this.globalservice.baseurl+'/ben_registration_applications',{params: queryParams}).pipe(catchError(err=>this.catchAuthError(err)));
    }
  }

  getFamilyMemberbyMemberId(memberId: any): Observable<any>{
    return this.http.get(this.globalservice.baseurl+'/ben_registration_application/21/family_member/'+memberId).pipe(catchError(err=>this.catchAuthError(err)));
  }

  onSubmitApprovingOfficer(val: any): Observable<any>{
    console.log('service'+JSON.stringify(val))
    return this.http.post(this.globalservice.baseurl+'/approvingauthority-reg-applications',val);
  }

  /**
   * 
   * @param error
   */

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









