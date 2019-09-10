import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private _signupURL = "http://localhost:8080/api/signup";
  private _loginURL = "http://localhost:8080/api/login";
  private _userURL = "http://localhost:8080/api/user";
  private _shopadminURL = "http://localhost:8080/api/shopadmin";
  private _shopadminsURL = "http://localhost:8080/api/shopadmins";
  private _addadminURL = "http://localhost:8080/api/add";
  private _updateadminURL = "http://localhost:8080/api/update";
  private _deleteadminURL = "http://localhost:8080/api/delete";
  private _shopdataURL = "http://localhost:8080/shopRoute/shopdata";
  private _addshopURL = "http://localhost:8080/shopRoute/add";
  private _updateshopURL = "http://localhost:8080/shopRoute/update";
  private _deleteshopURL = "http://localhost:8080/shopRoute/delete";
  private _shopsURL = "http://localhost:8080/shopRoute/list";
  constructor(private http: HttpClient,private _router : Router) { }

  signupUser(user){
    return this.http.post<any>(this._signupURL,user);
  }

  loginUser(user){
    return this.http.post<any>(this._loginURL,user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/home']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getType(){
    return localStorage.getItem('UserType');
  }
  
  getUserType(username):Observable<any>{
    return this.http.get<any>(this._userURL+"/"+username);
  }

  getShopData(adminname){
    return this.http.get<any>(this._shopdataURL+"/"+adminname)
  }

  deleteShop(id){
    return this.http.delete(this._deleteshopURL+"/"+id);
  }

  updateShop(id,room:any){
    return this.http.put(this._updateshopURL+"/"+id,room);
  }

  getShopAdmin(name){
    return this.http.get<any>(this._shopadminURL+"/"+name)
  }

  getShopAdmins(){
    return this.http.get<any>(this._shopadminsURL)
  }

  getAllShops(){
    return this.http.get<any>(this._shopsURL)
  }

  addShop(shop){
    return this.http.post<any>(this._addshopURL+"/", shop);
  }

  addAdmin(admin){
    return this.http.post<any>(this._addadminURL+"/", admin);
  }

  updateAdmin(adminid,admin){
    return this.http.put(this._updateadminURL+"/"+adminid,admin);
  }

  deleteAdmin(adminid){
    return this.http.delete(this._deleteadminURL+"/"+adminid);
  }
}
