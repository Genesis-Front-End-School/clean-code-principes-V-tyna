import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { HttpErrorResponse } from '@angular/common/http';
import { ErrorComponent } from './error.component';
import { DEFAULT_ERROR, PAGE_NOT_FOUND_ERROR } from '../configs/constants';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let route: ActivatedRoute;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    route = <ActivatedRoute>{};
    router = <Router>{};
    location = <Location>{};

    await TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      providers: [
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

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

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

    it('should not set error of errorInput value', () => {
      expect(component.errorInput).toBeUndefined();
      expect(component.error).not.toEqual(component.errorInput);
    });
  });

  describe('when current path is NOT "**"', () => {

    beforeEach(() => {
      route.snapshot.routeConfig!.path = 'some-path';
      component.errorInput = new HttpErrorResponse({});

      component.ngOnInit();
    });

    it('should set the error to the value of errorInput', () => {
      expect(component.error).toEqual(component.errorInput);
    });

    it('should not set the error to PAGE_NOT_FOUND_ERROR', () => {
      expect(component.error).not.toEqual(PAGE_NOT_FOUND_ERROR);
    });
  });

  describe('when current path is NOT "**" and errorInput is undefined', () => {
    beforeEach(() => {
      route.snapshot.routeConfig!.path = 'error-page';
      component.errorInput = undefined;

      component.ngOnInit();
    });

    afterAll(() => {
      route.snapshot.routeConfig!.path = '**';
    });

    it('should set the error to DEFAULT_ERROR', () => {
      expect(component.error).toEqual(DEFAULT_ERROR);
    });

    it('should not make a request to the http service', () => {
      expect(component.errorInput).toBeUndefined();
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
