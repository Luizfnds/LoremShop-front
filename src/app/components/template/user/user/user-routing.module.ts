import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from '../user-data/user-data.component';
import { UserOrderComponent } from '../user-order/user-order.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent, children : [
    { path: 'data', component: UserDataComponent },
    { path: 'orders', component: UserOrderComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
