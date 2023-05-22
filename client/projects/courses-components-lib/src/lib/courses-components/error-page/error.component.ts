import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DEFAULT_ERROR, PAGE_NOT_FOUND_ERROR } from '../configs/constants';
import { ErrorPageNotFound } from '../models/error-page-not-found';

@Component({
  selector: 'ccl-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() public errorInput: HttpErrorResponse | undefined;
  public error: HttpErrorResponse | ErrorPageNotFound;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  public ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === '**') {
      this.error = PAGE_NOT_FOUND_ERROR;
    } else if (this.errorInput) {
      this.error = this.errorInput;
    } else {
      this.error = DEFAULT_ERROR;
    }

  }

  public backOnPreviousPageHandler(): void {
    this.location.back();
  }

  public backHomeHandler(): void {
    this.router.navigate(['']);
  }
}
