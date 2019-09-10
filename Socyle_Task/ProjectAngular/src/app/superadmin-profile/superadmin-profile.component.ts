import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-superadmin-profile',
  templateUrl: './superadmin-profile.component.html',
  styleUrls: ['./superadmin-profile.component.css']
})
export class SuperadminProfileComponent implements OnInit {

  shopadmins;
  shops;
  constructor(private _auth:AuthService) { }

  ngOnInit() {
    this._auth.getAllShops().subscribe(
      res => this.shops = res
    )

    this._auth.getShopAdmins().subscribe(
      res => this.shopadmins = res
    )
  }

  addShop(shop){
    this._auth.addShop(shop).subscribe(
      result => console.log(result)
    )
  }

  deleteShop(shop){
    this._auth.deleteShop(shop.shop_ID).subscribe(
      result => console.log(result)
    )
  }

  updateShop(shop){
    this._auth.updateShop(shop.shop_ID, shop).subscribe(
      result => console.log(result)
    )
  }

  addAdmin(admin){
    this._auth.addAdmin(admin).subscribe(
      result => console.log(result)
    )
  }

  deleteAdmin(admin){
    this._auth.deleteAdmin(admin.user_ID).subscribe(
      result => console.log(result)
    )
  }

  updateAdmin(admin){
    this._auth.updateAdmin(admin.shop_ID, admin).subscribe(
      result => console.log(result)
    )
  }

}
