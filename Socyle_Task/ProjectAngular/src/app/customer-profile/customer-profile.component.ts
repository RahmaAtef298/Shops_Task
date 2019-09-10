import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  customerName  = localStorage.getItem('Customer');
  customerData;
  shops;

  constructor(private _auth:AuthService) { }

  ngOnInit() {
    this._auth.getAllShops().subscribe(
      res => this.shops = res
    )

    this._auth.getShopAdmin(this.customerName).subscribe(
      res => this.customerData = res
    )
  }

  addtoFavoraite(shop){
    this.customerData.favoraitelist.push(shop);
  }

}
