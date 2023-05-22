import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})

export class ErrorPageComponent implements OnInit {
  public error: HttpErrorResponse;

  constructor(
    private httpService: HttpService,
  ) { }

  public ngOnInit(): void {
    this.error = this.httpService.error;
  }
}
