import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { EcommerceService } from 'src/app/ecommerce.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})

 

export class CustomerLoginComponent implements OnInit{
  
  emailID: string = "";
  password: string = "";
  ccustomerLoginForm = new FormGroup({});
  customerLoginForm:any;

  constructor(
    private router: Router,
    private eservice:EcommerceService,
    private fb: FormBuilder

  ) {
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    this.customerLoginForm = this.fb.group({
      emailID: ['', [Validators.required, Validators.pattern(pattern)]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });

  }

  ngOnInit(): void {
  }

  
  signIn(): void {

    const body = {
      "emailID": this.customerLoginForm.controls['emailID'].value,
      "password": this.customerLoginForm.controls['password'].value
    }
    console.log("=======>",body);
    this.eservice.customerSignIn(body).pipe(take(1)).subscribe((res :any) => {
      console.log("*****",res);
      if(res && res?.customerId){
       // alert("Login sucessful");
       if (res?.role) {
        this.eservice.storeUserRole(res?.role);
       }
        this.eservice.storeCustomerAuthorization(res?.customerId);
        let userName = '';
        if (res?.firstName) {
          userName+=res?.firstName;
        }
        if (res?.lastName){
          userName+=' ' + res?.lastName;
        }
        this.eservice.storeCustomerUserName(userName);
        console.log('>>>>>>', res?.role );
        if (res?.role === 'admin') {
          this.router.navigate(['/admin/home']);
        } else {
          this.router.navigate(['/customer/home']);
        }
       
      }
    },err => {
        console.log("Error ", err);
        console.log(">>> ", err);
        if(err?.error && err?.error.startsWith("Customer  not found with")      ){
          alert("Customer email/password is invalid");
        }
        else{
          alert("Something going wrong in login! pls try again");
        }
    })

  }

  routeToNewUser(): void {
    this.router.navigate(["/customer-register"]);
  }

  routeToForgotPassword(): void {
    this.router.navigate(["/forgot-password"]);
  }
  

  
  
}
  

 




