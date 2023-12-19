import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    // config: NgbCarouselConfig,
    private route: Router
  ) {
    // config.interval = 2000;
    // config.keyboard = false;
    // config.pauseOnHover = false;
  }

  ngOnInit(): void {
  }

  gotoLogin(): void {
    this.route.navigate(['/login'])
  }

}
