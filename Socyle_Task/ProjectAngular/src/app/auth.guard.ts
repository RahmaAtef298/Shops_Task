import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router:Router,private _authservice:AuthService){}
  canActivate():boolean{
    if(this._authservice.loggedIn()){
    return true;
    }else{
      this._router.navigate(['/login'])
      return false;
    }
  }
}
