import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserApiService } from '../user-api/user-api.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  isCartNotEmpty: undefined | boolean;
  isLogged: undefined | boolean;
  subtotal: any = 0;
  numberOfInstallments: any = 6;

  cart: any;

  constructor(
    private router: Router, 
    private userApi: UserApiService, 
    private sanitizer: DomSanitizer,
  ) {}

  async ngOnInit() {
    await this.getCart();
    await this.getSubtotal();
  }

  async getCart() {
    if(!!(this.getCookieValue("token"))) {
      const req = this.userApi.getCart(this.getCookieValue("token"));
      this.cart = await lastValueFrom(req);
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.isCartNotEmpty = (this.cart.items.length > 0);    
  }

  async alterItemOnCart(event: any) {
    if(!!(this.getCookieValue("token"))) {
      const orderItemId = event.srcElement.parentElement.id;
      const quantity = event.srcElement.value;  
      const token = this.getCookieValue("token");

      const req = this.userApi.alterItemOnCart(token, {quantity:quantity , orderItemId:orderItemId});
      await lastValueFrom(req);
      await this.getCart();
      await this.getSubtotal();
    }
  }

  async deleteItemOnCart(event: any) {
    if(!!(this.getCookieValue("token"))) {
      const orderItemId = event.srcElement.parentElement.id;
      const token = this.getCookieValue("token");

      const req = this.userApi.deleteItemOnCart(token, orderItemId);
      await firstValueFrom(req);
      await this.getCart();
      await this.getSubtotal();
    }
  }

  async getSubtotal() {
    this.subtotal = 0;
    this.cart.items.forEach((e: any) => this.subtotal += (e.product.value * e.quantity));
  }

  async createOrder() {
    if(!!(this.getCookieValue( "token" ))) {
      const token = this.getCookieValue( "token" );
      let orderItemIdList: any[] = [];
      this.cart.items.forEach((e: { id: any; }) => orderItemIdList.push(e.id));
      
      const req = this.userApi.createOrder(token, orderItemIdList);
      await lastValueFrom(req);
      await this.getCart();
      await this.getSubtotal();
      this.router.navigate(['user/orders']);
    }
  }

  getCookieValue(cookieName: string): string {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let cookieValue: string = "";
    cArray.forEach(cookie => {
      if(cookie.indexOf(cookieName) == 0) {
        cookieValue = cookie.substring(cookieName.length + 1);
      }
    })
    return cookieValue;
  }

  convertBase64ToImage(imageBase64: any) {
    let url = 'data:image/jpg;base64,' + imageBase64;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
