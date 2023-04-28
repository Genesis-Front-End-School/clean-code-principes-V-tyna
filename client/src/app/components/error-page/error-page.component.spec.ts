import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Location } from '@angular/common';

import { ErrorPageComponent } from './error-page.component';
import { PAGE_NOT_FOUND_ERROR } from '../../configs/constants';
import { HttpErrorResponse } from '@angular/common/http';

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
        { provide: HttpService, useValue: { error: null } },
        { provide: Router, useValue: { navigate: jest.fn() } },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: { routeConfig: { path: '**' } }
          }
        },
        { provide: Location, useValue: { back: jest.fn() } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpService = TestBed.inject(HttpService);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when current path is "**"', () => {
    it('should set the error to PAGE_NOT_FOUND_ERROR', () => {
      expect(component.error).toEqual(PAGE_NOT_FOUND_ERROR);
    });

    it('should not make a request to the http service', () => {
      expect(httpService.error).toBeNull();
    });
  });

  describe('when current path is NOT "**"', () => {
    beforeEach(() => {
      httpService.error = new HttpErrorResponse({});
      route.snapshot.routeConfig!.path = 'some-path';

      component.ngOnInit();
    });

    it('should set the error to the value of httpService.error', () => {
      expect(component.error).toEqual(httpService.error);
    });

    it('should not set the error to PAGE_NOT_FOUND_ERROR', () => {
      expect(component.error).not.toEqual(PAGE_NOT_FOUND_ERROR);
    });
  });

  describe('backOnPreviousPageHandler', () => {
    it('should call location.back', () => {
      component.backOnPreviousPageHandler();

      expect(location.back).toHaveBeenCalled();
    });
  });

  describe('backHomeHandler', () => {
    it('should navigate to the home page', () => {
      component.backHomeHandler();

      expect(router.navigate).toHaveBeenCalledWith(['']);
    });
  });
});
