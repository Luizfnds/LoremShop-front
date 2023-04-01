import { Component, Injectable, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Filter } from 'src/app/filter';
import { __values } from 'tslib';
import { FindProductsService } from './find-products/find-products.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  allProducts: any;

  title: string = "Todos produtos";

  inputName: any;

  productName!: string;
  filterList!: string;
  sort!: string;

  constructor(
    private findProducts: FindProductsService, 
    private sanitizer: DomSanitizer,
  ) {}

  orderFilter!: HTMLSelectElement;

  ngOnInit(): void {
    this.orderFilter = (<HTMLSelectElement>document.getElementById("order-filter_options"))
    console.log((<HTMLSelectElement>document.getElementById("fomrsla")));

    this.getAllProducts();
  }

  getAllProducts() {
    this.allProducts = this.findProducts
    .getAllFiltredProducts(this.productName, this.filterList, this.sort)
    .subscribe((product) => this.allProducts = product);
  }

  alterProductName() {

  }

  alterFilterList() {
    
  }

  alterSort() {
    
  }

  transformFilterListInJson(filterList: Filter[]) {
    return JSON.stringify(filterList);
  }

  convertBase64ToImage(imageBase64: any) {
    let url = 'data:image/jpg;base64,' + imageBase64;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
