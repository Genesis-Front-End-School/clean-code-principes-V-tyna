import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { LessonsListComponent } from './lessons-list.component';
import { VideoService } from '../../../services/video.service';

describe('LessonsListComponent', () => {
  const id: string = 'kdjjksfs-ada-adk';
  const link: string = 'https://link';
  const idx: number = 2;
  const mockElementRef = <ElementRef<HTMLVideoElement>>{
    nativeElement: {
      id: 'djjksd-djkd-83jx',
      pause: () => { }
    }
  };
  const mockLocalStorage = {
    getItem: jest.fn()
  };
  let component: LessonsListComponent;
  let fixture: ComponentFixture<LessonsListComponent>;
  let videoService: VideoService;

  beforeEach(async () => {
    videoService = <VideoService>{};
    await TestBed.configureTestingModule({
      declarations: [LessonsListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: VideoService, useValue: {
            setVideoId: jest.fn(),
            videoRef: mockElementRef,
            runVideoStream: jest.fn().mockReturnValue(() => Promise.resolve()),
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LessonsListComponent);
    component = fixture.componentInstance;
    component['setCurrentLesson'] = jest.fn();
    fixture.detectChanges();

    videoService = TestBed.inject(VideoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
    it('should call VideoService method setVideoId if NO data in LocalStorage', async () => {
      jest.spyOn(videoService, 'setVideoId');

      await component.playVideoHandler(id, link, idx);

      expect(videoService.setVideoId).toHaveBeenCalledWith(id);
      expect(videoService.runVideoStream).toHaveBeenCalledWith(link, mockElementRef, 0);
    });

    it('should call VideoService method setVideoId if data EXISTS in LocalStorage', async () => {
      const originalLS = window.localStorage;
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
      });

      const videoData = { link: 'video-url', currentTime: 10 };
      jest.spyOn(videoService, 'setVideoId');
      jest.spyOn(window.localStorage, 'getItem').mockImplementation(() => JSON.stringify(videoData));

      await component.playVideoHandler(id, link, idx);

      expect(videoService.setVideoId).toHaveBeenCalledWith(id);
      expect(videoService.runVideoStream).toHaveBeenCalledWith('video-url', mockElementRef, 10);

      Object.defineProperty(window, 'localStorage', {
        value: originalLS,
      });
    });
  });
});
