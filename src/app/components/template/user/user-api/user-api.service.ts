import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginData } from '../user-login-data';
import { UserRegistryData } from '../user-registry-data';

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

  register(userRegistryData: UserRegistryData) {
    return this.http.post(`${this.apiURL}auth/register`, userRegistryData);
  }

  getUser(token: string) {
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiURL}user`, {headers: header});
  }

}
