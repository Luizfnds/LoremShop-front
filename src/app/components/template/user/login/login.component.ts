import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserApiService } from '../user-api/user-api.service';
import { UserLoginData } from '../user-login-data';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { UserRegistryData } from '../user-registry-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLoggedIn: boolean = !(this.getCookieValue("token"));
  user: any = "";
  token: any;

  email = new FormControl('');
  password = new FormControl('');

  constructor(
    private userApi: UserApiService   
  ){}

  ngOnInit(): void {
    this.getUser();
  }

  async authenticate() {
    const userLoginData = new UserLoginData(this.email.value, this.password.value);
    const req = this.userApi.authenticate(userLoginData);
    const token = await firstValueFrom(req);
    this.addCookie(token);

    this.getUser();
    this.isLoggedIn = !(this.getCookieValue("token"));
  }

  async register() {
    const userRegistryData = new UserRegistryData("Simone","Rachel","SimoneR@gmail.com","1234");
    const req = this.userApi.register(userRegistryData);
    const token = await firstValueFrom(req);
    this.addCookie(token);

    this.getUser();
    this.isLoggedIn = !(this.getCookieValue("token"));
  }

  async getUser() {
    if(!!(this.getCookieValue("token"))) {
      const req = this.userApi.getUser(this.getCookieValue("token"));
      this.user = await firstValueFrom(req);
    }
  }

  addCookie(token: any) {
    const expiration = token.expiration.toUTCString;
    document.cookie = `${token.name}=${token.value}; expires=${expiration}; path=/`;
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

  removeCookie() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=strict";
    console.log("sla");
  }

}
