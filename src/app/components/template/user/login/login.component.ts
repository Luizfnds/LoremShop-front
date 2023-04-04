import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserApiService } from '../user-api/user-api.service';
import { UserLoginData } from '../user-login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLoggedIn: boolean = !(this.getCookieValue("token"));

  email = new FormControl('');
  password = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private userApi: UserApiService   
  ){}

  ngOnInit(): void {
  }

  authenticate() {
    let userLoginData = new UserLoginData(this.email.value, this.password.value);
    this.userApi.authenticate(userLoginData).toPromise().then(token => this.addCookie(token));
    this.isLoggedIn = !!(this.getCookieValue("token"));
  }

  addCookie(token: any) {
    let expiration = token.expiration.toUTCString;
    document.cookie = `${token.name}=${token.value}; expires=${expiration}`;
  }

  getCookieValue(name: string) {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let cookieValue;

    cArray.forEach(cookie => {
      if(cookie.indexOf(name) == 0) {
        cookieValue = cookie.substring(name.length + 1);
      }
    })

    return cookieValue;
  }

}
