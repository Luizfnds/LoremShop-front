import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserApiService } from '../user-api/user-api.service';
import { UserLoginData } from '../user-login-data';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { UserRegistryData } from '../user-registry-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  isLoggedIn: boolean = !(this.getCookieValue("token"));
  user: any = "";
  token: any;

  emailLogin = new FormControl('');
  passwordLogin = new FormControl('');

  nameRegistry = new FormControl('');
  surnameRegistry = new FormControl('');
  emailRegistry = new FormControl('');
  passwordRegistry = new FormControl('');
  passwordConfirmationRegistry = new FormControl('');

  constructor(
    private router: Router, 
    private userApi: UserApiService   
  ){}

  ngOnInit(): void {
    this.getUser();
  }

  async authenticate() {
    const userLoginData = new UserLoginData(this.emailLogin.value, this.passwordLogin.value);
    const req = this.userApi.authenticate(userLoginData);
    const sla = await firstValueFrom(req);

    this.isLoggedIn = !(this.getCookieValue("token"));
    console.log(this.getCookieValue("token"));
    
    this.router.navigate(['user/data']);
  }

  async register() {
    if(this.passwordRegistry.value === this.passwordConfirmationRegistry.value) {
      const userRegistryData = new UserRegistryData(this.nameRegistry.value, this.surnameRegistry.value, this.emailRegistry.value, this.passwordRegistry.value);
      const req = this.userApi.register(userRegistryData);
      const token = await lastValueFrom(req);
      this.addCookie(token);
  
      this.getUser();
      this.isLoggedIn = !(this.getCookieValue("token"));
      this.router.navigate(['user/data']);
    }
  }

  async getUser() {
    if(!!(this.getCookieValue("token"))) {
      const req = this.userApi.getUser(this.getCookieValue("token"));
      this.user = await firstValueFrom(req);
    }
  }

  addCookie(token: any) {
    let expiration = new Date(token.expiration);        
    console.log(token);
    console.log(token.value);
    document.cookie = `${token.name}=${token.value}; expires=${expiration}; path=/; SameSite=None; Secure`;
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
    this.isLoggedIn = !(this.getCookieValue("token"));
  }

}
