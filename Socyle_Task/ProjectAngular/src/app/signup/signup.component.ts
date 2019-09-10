import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupUserData={};
  constructor(private _auth:AuthService,private _router:Router) { }

  ngOnInit() {
  }

  signupUser(usertype,username){
    this._auth.signupUser(this.signupUserData).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token',res.token)
        switch(usertype) { 
          case 'customer': { 
            localStorage.setItem('UserType',usertype)
            localStorage.setItem('Customer',username)
            this._router.navigate(['/customer'])
             break; 
          }  
          case 'shopadmin': { 
            localStorage.setItem('UserType',usertype)
            localStorage.setItem('ShopAdmin',username)
            this._router.navigate(['/shopadmin'])
             break; 
          }
       }
      },
      res => console.log(res)
    )
  }
}
