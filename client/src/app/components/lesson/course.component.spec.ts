import { HttpErrorResponse } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { mockLessonDetailsData } from '../../configs/mock-data/lesson-detail.mock';
import { HttpService } from '../../services/http.service';
import { VideoService } from '../../services/video.service';
import { CourseComponent } from './course.component';

describe('CourseComponent', () => {
  const courseId = '352be3c6-848b-4c19-9e7d-54fe68fef183';
  const routeParams = of({ courseId });
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let httpService: HttpService;
  let router: Router;
  let videoService: VideoService;

  beforeEach(async () => {
    videoService = <VideoService>{};

    await TestBed.configureTestingModule({
      declarations: [CourseComponent],
      providers: [
        {
          provide: HttpService, useValue: {
            getCourse: jest.fn(),
            error: null,
          }
        },
        {
          provide: Router, useValue: {
            navigate: jest.fn(),
          }
        },
        {
          provide: ActivatedRoute, useValue: {
            params: routeParams
          }
        },
        {
          provide: VideoService, useValue: {
            setVideoId: jest.fn()
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();


    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpService = TestBed.inject(HttpService);
    router = TestBed.inject(Router);
    videoService = TestBed.inject(VideoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set course$ and call videoService.setVideoId and httpService.getCourse with right param - courseId', () => {
    const courseResponse = of(mockLessonDetailsData);
    jest.spyOn(videoService, 'setVideoId');
    jest.spyOn(httpService, 'getCourse').mockReturnValueOnce(courseResponse);

    component.ngOnInit();

    expect(httpService.getCourse).toHaveBeenCalledWith(courseId);
    expect(videoService.setVideoId).toHaveBeenCalledWith(courseId);
    expect(component.course$).toEqual(courseResponse);
  });

  it('should set error in httpService and navigate to error page if getCourse request returns an ERROR', () => {
    const mockError = new HttpErrorResponse({ status: 500 });
    jest.spyOn(httpService, 'getCourse').mockReturnValueOnce(throwError(() => mockError));

    component.ngOnInit();

    expect(httpService.error).toEqual(mockError);
    expect(router.navigate).toHaveBeenCalledWith(['/error-page']);
  });
});
