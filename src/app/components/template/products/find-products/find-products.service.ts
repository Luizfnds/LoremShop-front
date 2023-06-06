import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindProductsService {

  readonly apiURL!: string;

  constructor(private http:HttpClient) { 
    this.apiURL = 'http://loremshop-back-production.up.railway.app/';
  }
    
  getAllProducts(){
    return this.http.get(`${this.apiURL}product?size=3`);
  }

  getAllFiltredProducts(productName: string, filterList: string, sort: string, page: number){
    const config = { params: new HttpParams().set('productName', productName).set('filterList', filterList).set('sort', sort) };
    return this.http.get(`${this.apiURL}product?page=${page}`, config);
  }

  getProductById(id: any) {
    return this.http.get(`${this.apiURL}product/${id}`);
  }

//    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
//    const data = JSON.stringify(filter);

}
