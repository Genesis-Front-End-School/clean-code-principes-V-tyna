import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '../../services/http.service';
import { ErrorPageComponent } from './error-page.component';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;
  let httpService: HttpService;

  beforeEach(async () => {
    httpService = <HttpService>{};

    await TestBed.configureTestingModule({
      declarations: [ErrorPageComponent],
      providers: [
        { provide: HttpService, useValue: { error: null } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpService = TestBed.inject(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error from HttpService when component initialized', () => {
    httpService.error = new HttpErrorResponse({});

    component.ngOnInit();

    expect(component.error).toEqual(httpService.error);
  });
});
