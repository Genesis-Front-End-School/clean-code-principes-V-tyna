import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PAGE_NOT_FOUND_ERROR } from '../../configs/constants';
import { ErrorPageNotFound } from '../../models/error-page-not-found';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  public error?: HttpErrorResponse | ErrorPageNotFound;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  public ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === '**') {
      this.error = PAGE_NOT_FOUND_ERROR;
    } else {
      this.error = this.httpService.error;
    }
  }

  public backOnPreviousPageHandler(): void {
    this.location.back();
  }

  public backHomeHandler(): void {
    this.router.navigate(['']);
  }
}
