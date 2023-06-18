import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService {

  baseurl = 'http://localhost:3002/api/v1';
}
