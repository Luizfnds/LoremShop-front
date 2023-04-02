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

}
