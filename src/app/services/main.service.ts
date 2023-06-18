import { Injectable } from '@angular/core';
import { GlobalserviceService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

    constructor(private service: GlobalserviceService,
        private httpClient: HttpClient){

    }

    getRole(currentUserId: any){
        return this.httpClient.get(this.service.baseurl+'/navigationLink/'+currentUserId).pipe(catchError(err=>this.catchAuthError(err)))
    }

    getNavigationData2(currentUserId: any,roleId: any){
      return this.httpClient.get('http://localhost:3002/api/v1/navigationLinks/' + currentUserId,{
        params: {roleId: roleId},
      }).pipe(catchError(err=>this.catchAuthError(err)))
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
