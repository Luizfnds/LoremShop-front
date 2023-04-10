import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDataComponent } from '../user-data/user-data.component';
import { UserOrderComponent } from '../user-order/user-order.component';


@NgModule({
  declarations: [
    UserDataComponent,
    UserOrderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
