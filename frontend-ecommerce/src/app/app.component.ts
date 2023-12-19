import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { EcommerceService } from './ecommerce.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-ecommerce';
  isLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;


  constructor(
    private router:Router,
    private eservice:EcommerceService)
    {
      this.router.events.pipe(
        filter(event => event instanceof NavigationStart)
      ).subscribe((event: any) => {
        if (this.eservice.getUserRole() !== null && this.eservice.getUserRole() === "client") {
          setTimeout(() => {
            this.isLoggedIn = true;
            this.isAdminLoggedIn = false;
          }, 100);
        } else {
          console.log('>>>>>>', this.eservice.getUserRole());
          if (this.eservice.getUserRole() !== null && this.eservice.getUserRole() === "admin") {
            setTimeout(() => {
              console.log("11111111111");
              this.isAdminLoggedIn = true;
              this.isLoggedIn = false;
            }, 100);
          } {
            setTimeout(() => {
              console.log("222222222");
              this.isLoggedIn = false;
              this.isAdminLoggedIn = false;
            }, 1);
          }
        }
      });
  //line 20 to 41-->check when routing(url) change it will check authorization


    }
  
}
