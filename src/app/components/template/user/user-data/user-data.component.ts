import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api/user-api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  user: any = "";

  constructor(
    private userApi: UserApiService   
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    if(!!(this.getCookieValue("token"))) {
      const req = this.userApi.getUser(this.getCookieValue("token"));
      this.user = await firstValueFrom(req);
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

}
