import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  url: string = '';
  userName: string = '';
  constructor(
    private eservice:EcommerceService ,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {
    if (this.eservice.getCustomerName() !== null) {
      this.userName = this.eservice.getCustomerName();
    }
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      this.url = event?.url;
    });

  }  

  gotourl(link: string): void {
    if (link === '/admin/logout') {
      this.eservice.customerLogout();
      return;
    }
    this.router.navigate([link]);
  }

}
