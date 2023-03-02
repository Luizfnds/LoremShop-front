import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { HomePageComponent } from './components/template/home-page/home-page.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { ProductsComponent } from './components/template/products/products.component';
import { LoginComponent } from './components/template/user/login/login.component';
import { ProductDetailComponent } from './components/template/products/product/product-detail.component';
import { DataComponent } from './components/template/user/data/data.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailComponent,
    LoginComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
