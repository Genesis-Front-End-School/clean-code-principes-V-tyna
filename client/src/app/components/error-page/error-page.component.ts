import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  public error?: HttpErrorResponse;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private location: Location
  ) { }

  public ngOnInit(): void {
    this.error = this.httpService.error;
  }

  public backOnPreviousPageHandler(): void {
    this.location.back();
  }

  public backHomeHandler(): void {
    this.router.navigate(['']);
  }
}
