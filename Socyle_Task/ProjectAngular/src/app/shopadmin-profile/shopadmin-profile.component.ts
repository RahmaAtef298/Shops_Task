import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-shopadmin-profile',
  templateUrl: './shopadmin-profile.component.html',
  styleUrls: ['./shopadmin-profile.component.css']
})
export class ShopadminProfileComponent implements OnInit {

  adminShopName  = localStorage.getItem('ShopAdmin');
  shopAdminData;
  shopData;
  constructor(private _auth:AuthService) { }

  ngOnInit() {
    this._auth.getShopData(this.adminShopName).subscribe(
      res => this.shopData = res
    )

    this._auth.getShopAdmin(this.adminShopName).subscribe(
      res => this.shopAdminData = res
    )
  }
  
  deleteShop(shop){
    this._auth.deleteShop(shop.shop_ID).subscribe(
      result => console.log(result)
    )
  }

  updateShop(shop){
    this._auth.updateShop(shop.value.shop_ID, shop.value).subscribe(
      result => console.log(result)
    )
  }

}
