import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CourseCardComponent } from './course-card.component';
import { Course } from 'src/app/models/course.model';
import { VideoService } from '../../../services/video.service';

const mockCourseData: Course = {
  "id": "352be3c6-848b-4c19-9e7d-54fe68fef183",
  "title": "Lack of Motivation & How to Overcome It",
  "tags": [
    "productivity"
  ],
  "launchDate": "2023-03-06T16:50:06.000Z",
  "status": "launched",
  "description": "Reignite your inner drive by managing factors that dampen your motivation.",
  "duration": 521,
  "lessonsCount": 2,
  "containsLockedLessons": true,
  "previewImageLink": "https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it",
  "rating": 3.5,
  "meta": {
    "slug": "lack-of-motivation-how-to-overcome-it",
    "skills": [
      "Aligning your goals with your motives",
    ],
    "courseVideoPreview": {
      "link": "https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/preview/AppleHLS1/preview.m3u8",
      "duration": 27,
      "previewImageLink": "https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it/preview"
    }
  }
};

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let videoService: VideoService;

  beforeEach(async () => {
    videoService = <VideoService>{};
    await TestBed.configureTestingModule({
      declarations: [CourseCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: VideoService, useValue: videoService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    component.course = mockCourseData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
