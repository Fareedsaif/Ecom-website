import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutusComponent } from './component/aboutus/aboutus.component';
import { HomeComponent } from './component/home/home.component';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { PagingComponent } from './component/paging/paging.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { AdminHeaderComponent } from './component/admin/admin-header/admin-header.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { AdminAddproductComponent } from './component/admin/admin-addproduct/admin-addproduct.component';
import { AdminListproductComponent } from './component/admin/admin-listproduct/admin-listproduct.component';
import { AdminOrderlistComponent } from './component/admin/admin-orderlist/admin-orderlist.component';
import { CustomerHomeComponent } from './component/customer/customer-home/customer-home.component';
import { CustomerHeaderComponent } from './component/customer/customer-header/customer-header.component';
import { CustomerLoginComponent } from './component/customer/customer-login/customer-login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CustomerCartComponent } from './component/customer/customer-cart/customer-cart.component';
import { CustomerOrderComponent } from './component/customer/customer-order/customer-order.component';
import { CustomerOrderHistoryComponent } from './component/customer/customer-order-history/customer-order-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CustomerRegisterComponent } from './component/customer/customer-register/customer-register.component';
import { DatePipe } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { FooterComponent } from './component/footer/footer.component';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    HomeComponent,
    AppHeaderComponent,
    ContactusComponent,
    PagingComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent,
    AdminHeaderComponent,
    AdminHomeComponent,
    AdminAddproductComponent,
    AdminListproductComponent,
    AdminOrderlistComponent,
    CustomerHomeComponent,
    CustomerHeaderComponent,
    CustomerLoginComponent,
    CustomerCartComponent,
    
    CustomerOrderHistoryComponent,
    CustomerRegisterComponent,
    CustomerOrderComponent,
    FooterComponent
    
    
    
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRippleModule,
    MatInputModule
    
    
    
    
    
    
    
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
