import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  constructor(
    private router: Router,
    private location: Location
  ) { }

  public backOnPreviousPageHandler(): void {
    this.location.back();
  }

  public backHomeHandler(): void {
    this.router.navigate(['']);
  }
}
