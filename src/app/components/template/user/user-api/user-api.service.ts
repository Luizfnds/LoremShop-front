import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginData } from '../user-login-data';

@Injectable({
  providedIn: 'root'
})

export class UserApiService {

  readonly apiURL!: string;

  constructor(private http:HttpClient) { 
    this.apiURL = 'http://localhost:8080/';
  }
    
  authenticate(userLoginData: UserLoginData) {
    return this.http.post(`${this.apiURL}auth/authenticate`, userLoginData);
  }

  getUser(token: string) {
    const config = { headers: new HttpHeaders().set("Authorization", "Bearer "+token) };
    return this.http.get(`${this.apiURL}user`, config);
  }

}
