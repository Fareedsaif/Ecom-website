import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{

  email: string= '';
  isShowChangePassword: boolean = false;
  newPassword: string = '';
  customer: any;

  constructor(
    private eservice: EcommerceService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const body = {
      emailID: this.email
    };
    this.eservice.forgotPassword(body).pipe(take(1)).subscribe((res) => {
      if (!!res && res?.customerId) {
        this.customer = res;
        this.isShowChangePassword = true;
      }
    }, err => {
      this.isShowChangePassword = false;
      alert("Customer not found . Please enter valid email.")
    });
  }

  onChangePassword(): void {
    this.customer.password = this.newPassword;
    this.eservice.changePassword(this.customer?.customerId,this.newPassword).pipe(take(1)).subscribe((res) => {
      if (res && res.customerId) {
        alert("Password changed successfully");
        this.route.navigate(["/customer-login"]);
      }
    }, error => {
      alert("Error occured while changing password.");
    });
  }

}
