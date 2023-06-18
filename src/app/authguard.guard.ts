import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardServiceService } from './auth-guard-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard  {

  constructor(private authService: AuthGuardServiceService,private router: Router){}
  canActivate(): boolean {
    if (this.authService.isAuthenticateds()) {
      // User is authenticated, allow access to the route
      return true;
    } else {
      // User is not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
