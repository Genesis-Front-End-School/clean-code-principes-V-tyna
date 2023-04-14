import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

import { ErrorPageComponent } from './error-page.component';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;
  let httpService: HttpService;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    httpService = <HttpService>{};
    router = <Router>{};
    location = <Location>{};
    await TestBed.configureTestingModule({
      declarations: [ErrorPageComponent],
      providers: [
        { provide: HttpService, useValue: httpService },
        { provide: Router, useValue: router },
        { provide: Location, useValue: location },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
