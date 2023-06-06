import { Component, Injectable, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isLoggedIn: boolean = !(this.getCookieValue("token"));

  static InputName: string;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    HeaderComponent.InputName = "";
  }

  getInputName(event: any) {
    HeaderComponent.InputName = (<HTMLSelectElement>document.querySelector("#input-busca")).value;
    this.reloadComponent();
  }

  reloadComponent() {
    let url = "/products";
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([url]);
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

  async ce() {
    this.isLoggedIn = !!(this.getCookieValue("token"));
  }

}
