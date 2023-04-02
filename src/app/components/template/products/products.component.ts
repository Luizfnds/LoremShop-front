import { Component, Injectable, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Filter } from 'src/app/filter';
import { __values } from 'tslib';
import { FindProductsService } from './find-products/find-products.service';
import { HeaderComponent } from '../header/header.component';

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

  title!: string;

  productName: string = '';
  filterList: string = "";
  sort: string = "";

  constructor(
    private findProducts: FindProductsService, 
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.productName = HeaderComponent.InputName != '' ? HeaderComponent.InputName : '';
    this.getAllProducts();
  }

  getAllProducts() {
    this.getProductName();
    this.getFilterList();
    this.getSort();
    this.allProducts = this.findProducts
    .getAllFiltredProducts(this.productName, this.filterList, this.sort)
    .subscribe((product) => this.allProducts = product);
  }

  getProductName() {
    this.title = HeaderComponent.InputName != '' ? 'Resultados para '+HeaderComponent.InputName : 'Todos produtos';
  }

  getFilterList() {
    var form = (<HTMLSelectElement>document.getElementsByClassName("filterCheckbox"));
    let filters: Filter[] = [];

    Array.prototype.forEach.call(form, filterElement => {
      let name = filterElement.classList[1];
      let filterName = filterElement.attributes.name.value;
      if(filterElement.checked) {
        let filterIndex = filters.findIndex(e => e.name == name);
        filterIndex >= 0 ? filters[filterIndex].types.push(filterName) : filters.push(new Filter(name, filterName)) ;
      }
    });
    
    let filterList = ""; 
    filters.forEach(e => {
      let filter = e.name + ':' + e.types;
      filterList = filters.length > filters.indexOf(e) + 1 ? filterList + filter + "__" : filterList + filter ;
    });
    this.filterList = filterList;
  }

  getSort() {
    this.sort = (<HTMLSelectElement>document.getElementById("order-filter_options")).value;
  }

  convertBase64ToImage(imageBase64: any) {
    let url = 'data:image/jpg;base64,' + imageBase64;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
