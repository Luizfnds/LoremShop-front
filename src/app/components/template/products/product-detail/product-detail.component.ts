import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FindProductsService } from 'src/app/components/template/products/find-products/find-products.service';
import { UserApiService } from '../../user/user-api/user-api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  quantity: any = 1;
  numberOfInstallments: any = 6;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private findProduct: FindProductsService,
    private sanitizer: DomSanitizer,
    private userApi: UserApiService,
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const id = routeParams.get("id");
    this.getProduct(<String>id);
  }
  
  getProduct(id: String) {
    this.product = this.findProduct
    .getProductById(id)
    .subscribe((product) => (this.product = product));
  }

  
  async addItemOnCart() {    
    if(!!(this.getCookieValue("token"))) {
      const productId = this.product.productId;
      const quantity = this.quantity;  
      const token = this.getCookieValue("token");
      
      const req = this.userApi.addItemOnCart(token, {quantity:quantity , productId:productId});
      await lastValueFrom(req);
      this.router.navigate(['cart']);
    } else {
      this.router.navigate(['user']);
    }
  }

  getCookieValue(cookieName: string): string {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let cookieValue: string = "";
    cArray.forEach(cookie => {
      if(cookie.indexOf(cookieName) == 0) {
        cookieValue = cookie.substring(cookieName.length + 1);
      }
    })    
    return cookieValue;
  }

  convertBase64ToImage(imageBase64: any) {
    let url = 'data:image/jpg;base64,' + imageBase64;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
}
