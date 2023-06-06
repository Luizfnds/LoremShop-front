import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api/user-api.service';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  orders: any;

  constructor(
    private userApi: UserApiService,
    private sanitizer: DomSanitizer
  ) {}
  
  ngOnInit(): void {
    this.getOrders();
  }

  async getOrders() {
    if(!!(this.getCookieValue("token"))) {
      const req = this.userApi.getOrders(this.getCookieValue("token"));
      this.orders = await lastValueFrom(req);
      console.log(this.orders[0].items);
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
