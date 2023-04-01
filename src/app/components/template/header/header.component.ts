import { Component, Injectable, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  static InputName: String;

  constructor(
    private productsComponent: ProductsComponent
  ) {}

  ngOnInit(): void {
    HeaderComponent.InputName = "";
  }

  getInputName(event: any) {
    HeaderComponent.InputName = (<HTMLSelectElement>document.querySelector("#input-busca")).value;
  //  this.productsComponent.getProducts();
  }

}
