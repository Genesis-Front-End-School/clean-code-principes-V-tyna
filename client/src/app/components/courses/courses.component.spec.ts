import { HttpErrorResponse } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { CourseResponse } from 'src/app/models/course.model';
import { mockCourseData } from '../../configs/mock-data/course.mock';
import { HttpService } from '../../services/http.service';
import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  const mockCoursesResponse: CourseResponse = { courses: [mockCourseData], allCoursesLength: '100' };
  const courseDataObservable = of(mockCoursesResponse);
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let httpService: HttpService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      providers: [
        {
          provide: HttpService, useValue: {
            getAllCourses: jest.fn(),
            error: null,
          }
        },
        {
          provide: Router, useValue: {
            navigate: jest.fn(),
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpService = TestBed.inject(HttpService);
    router = TestBed.inject(Router);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let getAllCoursesSpy: jest.SpyInstance<Observable<CourseResponse>>;

    beforeEach(() => {
      getAllCoursesSpy = jest.spyOn(httpService, 'getAllCourses');
    });

    it('should get courses on initialization', () => {
      getAllCoursesSpy.mockReturnValueOnce(courseDataObservable);

      component.ngOnInit();

      expect(httpService.getAllCourses).toHaveBeenCalledWith({ limit: 10, offset: 0 });
      expect(component.courses$).toEqual(courseDataObservable);
      expect(component.allCoursesLength).toEqual(+mockCoursesResponse.allCoursesLength);
    });

    it('should handle error if request return an ERROR', () => {
      const httpServiceSpy = getAllCoursesSpy.mockReturnValueOnce(
        throwError(() => new HttpErrorResponse({ status: 500 }))
      );
      const routerNavigateSpy = jest.spyOn(router, 'navigate');

      component.ngOnInit();

      expect(httpServiceSpy).toHaveBeenCalled();
      expect(routerNavigateSpy).toHaveBeenCalledWith(['/error-page']);
      expect(httpService.error).toBeDefined();
    });
  });

  describe('handlePageEvent', () => {
    it('should handle page event and get courses with correct params', () => {
      const mockPageEvent = { pageIndex: 1, pageSize: 20, length: 30 };
      const getAllCoursesSpy = jest.spyOn(httpService, 'getAllCourses');
      getAllCoursesSpy.mockReturnValueOnce(courseDataObservable);

      component.handlePageEvent(mockPageEvent);

      expect(httpService.getAllCourses).toHaveBeenCalledWith({ limit: 40, offset: 20 });
      expect(component.pageSize).toEqual(mockPageEvent.pageSize);
      expect(component.courses$).toEqual(courseDataObservable);
    });
  });
});
