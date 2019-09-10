import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData={};
  usertype : any;
  UT:any;
  constructor(private _auth:AuthService,private _router:Router,private _route:ActivatedRoute) { }

  ngOnInit() {
  }
  
  // public getUserType(name){
  //   this._auth.getUserType(name).subscribe(
  //    res => {
  //      var UT = JSON.stringify(res[0].usertype)
  //      console.log(UT)
  //      localStorage.setItem('UserType',UT)}
  //     )
  // }
  
  loginUser(username){
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token',res.token)

        console.log(username)
        
        this._auth.getUserType(username).subscribe(
          res => {
            this.UT = JSON.parse(JSON.stringify(res[0].usertype))
            console.log(this.UT)
            switch(this.UT){ 
              case "customer": { 
                localStorage.setItem('UserType',this.UT)
                localStorage.setItem('Customer',username)
                this._router.navigate(['/customer'],{relativeTo:this._route})
                 break; 
              }  
              case "shopadmin": { 
                localStorage.setItem('UserType',this.UT)
                localStorage.setItem('ShopAdmin',username)
                this._router.navigate(['/shopadmin'],{relativeTo:this._route})
                 break; 
              }
              case "superadmin": { 
                localStorage.setItem('UserType',this.UT)
                this._router.navigate(['/superadmin'],{relativeTo:this._route})
                 break; 
              }
           }
          }
           )
           
           
        
        // console.log(this.getUserType(username))
        // let UT =JSON.stringify(userT)
        // console.log(UT)
        
      },
      err => console.log(err)
    )
  }

}
