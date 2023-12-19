import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit  {

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  dob: string = "";
  phone: string = "";
  district: string = "";
  state: string = "";
  zipcode: string = "";
  gender: string = "male";
  address: string = "";
  

  
  constructor(
    
    private router: Router,
    private datePipe: DatePipe,
    private eservice: EcommerceService

  ) { }

  ngOnInit(): void {
  }



  signup():void{
    if (this.firstName === '' || this.firstName.length < 3) {
      alert('FirstName must contain atleast 3 characters');
      return;
    }
    if (this.lastName === '' || this.lastName.length < 3) {
      alert('LastName must contain atleast 3 characters');
      return;
    }

    if (this.phone === '' || this.phone.length < 10 || this.phone.length > 10) {
      alert('Phone must contain atleast 10 characters');
      return;
    }
    const pattern=/^[6789][0-9]{9}$/;
    if (!pattern.test(this.phone)) {
      alert('Invalid mobile number.');
      return;
    }
    if (this.district === '' || this.district.length < 3) {
      alert('District must contain atleast 3 characters');
      return;
    }
    if (this.state === '' || this.state.length < 3) {
      alert('State must contain atleast 3 characters');
      return;
    }
    if (this.zipcode === '' || this.zipcode.length < 6) {
      alert('Zipcode must contain atleast 6 characters');
      return;
    }
//alert("sucess")
    const body: any = {
      firstName : this.firstName,
      lastName : this.lastName,
      dateOfBirth :this.dob,
      phoneNumber : this.phone,
      district : this.district,
      state: this.state,
      zipCode :this.zipcode,
      emailID :this.email,
      gender :this.gender,
      password:this.password,
      address: this.address,
      role: "client" // "admin" 
     // role: "admin"
    }
    console.log("=======>",body);
    this.eservice.SignUp(body).pipe(take(1)).subscribe((res :any) => {
      console.log("*****",res);
      if(res && res?.customerId){
        alert("Registration sucessful");
        this.router.navigate(["/login"]);
      }
    }, err =>{
        console.log("Error  ", err);
        if (err && err?.error === 'Oops duplicate Entry of the data !') {
          alert("Email address registered already, please go to login.");
        } else {
          alert("Something going wrong..pls try again");
        }
    })

  }


  }

  




