import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

import { ErrorPageComponent } from './error-page.component';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;
  let httpService: HttpService;
  let route: ActivatedRoute;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    httpService = <HttpService>{};
    route = <ActivatedRoute>{};
    router = <Router>{};
    location = <Location>{};
    await TestBed.configureTestingModule({
      declarations: [ErrorPageComponent],
      providers: [
        { provide: HttpService, useValue: httpService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: { routeConfig: { path: '**' } }
          }
        },
        { provide: Location, useValue: location },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
