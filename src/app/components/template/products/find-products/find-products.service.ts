import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindProductsService {

  readonly apiURL!: string;

  constructor(private http:HttpClient) { 
    this.apiURL = 'http://localhost:8080/';
  }
    
  getAllProducts(){
    return this.http.get(`${this.apiURL}product`);
  }

  getAllFiltredProducts(productName: string, filterList: string, sort: string){
    const config = { params: new HttpParams().set('productName', productName).set('filters', filterList).set('sort', sort) };
    return this.http.get(`${this.apiURL}product`, config);
  }

  getProductById(id: any) {
    return this.http.get(`${this.apiURL}product/${id}`);
  }

//    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
//    const data = JSON.stringify(filter);

}
