import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Empty-Project';

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigateByUrl('/main')
  }

  goToUsers() {
    this.router.navigateByUrl('/user')
  }

  ngOnInit() {
    // Remove 'router-outlet' from the docuemnt
    document.querySelector('router-outlet')?.remove()
  }
}
