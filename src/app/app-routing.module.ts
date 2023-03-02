import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/template/home-page/home-page.component';
import { ProductDetailComponent } from './components/template/products/product/product-detail.component';
import { ProductsComponent } from './components/template/products/products.component';
import { DataComponent } from './components/template/user/data/data.component';
import { LoginComponent } from './components/template/user/login/login.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/detail', component: ProductDetailComponent },
  { path: 'user/login', component: LoginComponent},
  { path: 'user/data', component: DataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
