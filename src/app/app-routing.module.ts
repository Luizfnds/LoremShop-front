import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/template/home-page/home-page.component';
import { DataComponent } from './components/template/user/data/data.component';
import { LoginComponent } from './components/template/user/login/login.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'products', loadChildren: () => import('./components/template/products/products.module').then(m => m.ProductsModule) },
  { path: 'user/login', component: LoginComponent},
  { path: 'user/data', component: DataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
