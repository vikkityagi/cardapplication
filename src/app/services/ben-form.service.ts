import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalserviceService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class BenFormService {
  constructor(private http: HttpClient,
    private globalservice: GlobalserviceService,
    private router: Router) { }


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
  getOffices(orgcode: any) {
    return this.http
      .get("http://localhost:3002/api/v1/OrganizationOffices", {
        params: { organizationId: orgcode },
      });
  }

  getOrganization(deptCode: any) {
    //console.log("dep code" + deptCode);
    return this.http
      .get("http://localhost:3002/api/v1/organizations", {
        params: { departmentCode: deptCode },
      })
  }

  getFamilyByMemberId(applicationId: any, memeberId: any,) {
    return this.http.get(this.globalservice.baseurl + '/ben_registration_application/' + applicationId + '/family_member/' + memeberId);
  }
  deleteFamilyByMemberId(applicationId: any, memeberId: any,) {
    return this.http.delete(this.globalservice.baseurl + '/ben_registration_application/' + applicationId + '/family_member/' + memeberId);
  }

  getMinitryName(ministryId: any) {
    return this.http
      .get(
        "http://localhost:3002/api/v1/ministry/" +
        ministryId
      );
  }

  getDepartmentName(departmentId: any) {
    return this.http
      .get(
        "http://localhost:3002/api/v1/departments/" +
        departmentId
      );

  }

  getOrganizationName(organizationId: any) {
    return this.http
      .get(
        "http://localhost:3002/api/v1/organizations/" +
        organizationId
      );
  }

  getCardType() {
    return this.http.get(this.globalservice.baseurl + '/CardType').pipe(catchError(err => (this.catchAuthError(err))))
  }
  getWardEntitlement() {
    return this.http.get(this.globalservice.baseurl + '/WardEntitlement').pipe(catchError(err => (this.catchAuthError(err))))
  }
  getNameofWardEntitlement(path: any) {
    return this.http.get(this.globalservice.baseurl + '/WardEntitlement/' + path).pipe(catchError(err => (this.catchAuthError(err))))
  }

  getCghsCities() {
    return this.http
      .get("http://localhost:3002/api/v1/CghsCities").pipe(catchError(err => (this.catchAuthError(err))));
  }

  getNodalOfficerList(orgId: string) {
    let params = new HttpParams();
    params = params.append('organization_id', orgId);

    return this.http
      .get("http://localhost:3002/api/v1/nodal-users", { params: params }).pipe(catchError(err => (this.catchAuthError(err))));
  }



  catchAuthError(error: any): Observable<any> {
    if (error && error.error && error.error.message) {
      //alert(error.error.message)
    } else if (error && error.message) {
      //alert(error.message)
    } else {
      //alert(JSON.stringify(error))
    }
    return throwError(error);
  }
} 
