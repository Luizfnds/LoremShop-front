import { Component, OnInit } from '@angular/core';
import { FindProductsService } from '../products/find-products/find-products.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

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

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.allProducts = this.findProducts
    .getAllProducts()
    .subscribe((product) => this.allProducts = product);
  }

  convertBase64ToImage(imageBase64: any) {
    let url = 'data:image/jpg;base64,' + imageBase64;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
