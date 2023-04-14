import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { LessonsListComponent } from './lessons-list.component';
import { VideoService } from '../../../services/video.service';

describe('LessonsListComponent', () => {
  let component: LessonsListComponent;
  let fixture: ComponentFixture<LessonsListComponent>;
  let videoService: VideoService;

  beforeEach(async () => {
    videoService = <VideoService>{};
    await TestBed.configureTestingModule({
      declarations: [LessonsListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: VideoService, useValue: videoService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LessonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('countMinutes', () => {
    it('should return rounded minutes', () => {
      expect(component.countMinutes(343)).toBe(6);
    });
  });

  describe('playVideoHandler', () => {
    it('should call VideoService method setVideoId', async () => {
      const id: string = 'kdjjksfs-ada-adk';
      const link: string = 'https://link';
      const idx: number = 2;
      const mockElementRef = <ElementRef<HTMLVideoElement>>{
        nativeElement: {
          id: 'djjksd-djkd-83jx',
          pause: () => { }
        }
      };

      videoService.videoRef = mockElementRef;
      videoService.setVideoId = jest.fn();
      videoService.runVideoStream = jest.fn().mockReturnValue(() => Promise.resolve());
      component['setCurrentLesson'] = jest.fn();

      await component.playVideoHandler(id, link, idx);

      expect(videoService.setVideoId).toHaveBeenCalledWith(id);
      expect(videoService.runVideoStream).toHaveBeenCalledWith(link, mockElementRef, 0);
    });
  });

});
