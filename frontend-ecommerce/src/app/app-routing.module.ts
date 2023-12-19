import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutusComponent } from './component/aboutus/aboutus.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { CustomerLoginComponent } from './component/customer/customer-login/customer-login.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { CustomerHomeComponent } from './component/customer/customer-home/customer-home.component';
import { CustomerCartComponent } from './component/customer/customer-cart/customer-cart.component';
import { CustomerOrderComponent } from './component/customer/customer-order/customer-order.component';
import { AdminAddproductComponent } from './component/admin/admin-addproduct/admin-addproduct.component';
import { AdminListproductComponent } from './component/admin/admin-listproduct/admin-listproduct.component';
import { AdminOrderlistComponent } from './component/admin/admin-orderlist/admin-orderlist.component';

import { CustomerRegisterComponent } from './component/customer/customer-register/customer-register.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'login',component:CustomerLoginComponent},
  {path:'customer-register',component:CustomerRegisterComponent},
  {path:'forgot-password',component:ForgetPasswordComponent},

  {path:'admin',children:[
    {path:'home',component:AdminHomeComponent},
    { path: 'additem',component:AdminAddproductComponent},
      { path: 'itemlist',component:AdminListproductComponent},
      { path: 'orderlist',component:AdminOrderlistComponent},
  
  ]},
  {path:'customer',children:[
    {path:'home',component:CustomerHomeComponent},
    { path: 'cart', component: CustomerCartComponent },
      { path: 'order', component: CustomerOrderComponent }
  
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
