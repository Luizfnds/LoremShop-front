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
    const urlDev = 'http://localhost:8080/';
    const urlProd = 'https://loremshop-back-production.up.railway.app/';
    this.apiURL = urlProd;
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

  alterUser(token: string, userData: any) {
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiURL}user`, userData, {headers: header});
  }

  getCart(token: string) {
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiURL}cart`, {headers: header});
  }

  addItemOnCart(token: string, cartItem: any/*CartItem*/) {
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiURL}cart`, cartItem, {headers: header});
  }

  alterItemOnCart(token: string, cartItem: any/*CartItem*/) {
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiURL}cart`, cartItem, {headers: header});
  }

  deleteItemOnCart(token: string, orderItemId: string) {
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiURL}cart/${orderItemId}`, {headers: header});
  }

  createOrder(token: string, orderItemIdList: Array<any>) {
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiURL}order`, orderItemIdList, {headers: header});
  }

  getOrders(token: string) {
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiURL}order`, {headers: header});
  }

}
