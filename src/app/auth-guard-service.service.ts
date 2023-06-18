import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService {

  private isAuthenticated: boolean = false;

  login(): boolean {
    // Perform authentication logic, e.g., send credentials to the server
    // If authentication is successful, set isAuthenticated to true
    console.log("before Login" + this.isAuthenticated);
    this.isAuthenticated = true;
    return this.isAuthenticated;
  }

  isAuthenticateds() {
    return this.isAuthenticated;
  }
}
