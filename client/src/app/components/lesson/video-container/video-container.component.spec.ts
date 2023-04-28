import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoService } from '../../../services/video.service';

import { VideoContainerComponent } from './video-container.component';

describe('VideoContainerComponent', () => {
  const mockLocalStorage = {
    getItem: jest.fn()
  };
  let component: VideoContainerComponent;
  let fixture: ComponentFixture<VideoContainerComponent>;
  let videoService: VideoService;

  beforeEach(async () => {
    videoService = <VideoService>{};
    await TestBed.configureTestingModule({
      declarations: [VideoContainerComponent],
      providers: [
        {
          provide: VideoService, useValue: {
            videoStreamError: false,
            runVideoStream: jest.fn(),
            setVideoLink: jest.fn(),
            setVideoDataToLocalStorage: jest.fn()
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VideoContainerComponent);
    component = fixture.componentInstance;
    component.videoLink = 'http://some-link';
    component.videoRef = <ElementRef<HTMLVideoElement>><unknown>{
      nativeElement: {
        id: 'djjksd-djkd-83jx'
      },
      playbackRate: 1
    };

    videoService = TestBed.inject(VideoService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should NOT run video, if picture in picture is in the document', async () => {
      const originalPictureInPictureElement = document.pictureInPictureElement;
      Object.defineProperty(document, 'pictureInPictureElement', {
        value: true
      });
      jest.spyOn(videoService, 'runVideoStream');

      await component.ngOnInit();

      expect(videoService.runVideoStream).not.toHaveBeenCalled();

      Object.defineProperty(document, 'pictureInPictureElement', {
        value: originalPictureInPictureElement
      });
    });

    it('should call videoService.runVideoStream with correct arguments, if videoData exists in LocalStorage', async () => {
      const originalLS = window.localStorage
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
      });

      const videoData = { link: 'video-url', currentTime: 10 };
      jest.spyOn(window.localStorage, 'getItem').mockImplementation(() => JSON.stringify(videoData));
      jest.spyOn(videoService, 'setVideoLink');
      jest.spyOn(videoService, 'runVideoStream');

      await component.ngOnInit();

      expect(videoService.setVideoLink).toHaveBeenCalled();
      expect(videoService.runVideoStream).toHaveBeenCalledWith('video-url', component.videoRef, 10);

      Object.defineProperty(window, 'localStorage', {
        value: originalLS,
      });
    });

    it('should call videoService.runVideoStream with correct arguments, if videoLink is defined', async () => {
      const videoLink = 'http://test-link';
      jest.replaceProperty(component, 'videoLink', videoLink);
      jest.spyOn(videoService, 'runVideoStream');

      await component.ngOnInit();

      expect(videoService.runVideoStream).toHaveBeenCalledWith(videoLink, component.videoRef, 0);
    });
  });

  describe('ngDoCheck', () => {
    it('should set videoStreamError to FALSE initially', async () => {
      component.ngDoCheck();

      expect(component.videoStreamError).toBe(false);
    });

    it('should set videoStreamError to TRUE if videoService.videoStreamError is true', async () => {
      jest.replaceProperty(videoService, 'videoStreamError', true);

      component.ngDoCheck();

      expect(component.videoStreamError).toBe(true);
    });
  });

  describe('leavePictureInPictureHandler', () => {
    it('should call private component method setVideoDataToLocalStorage', async () => {
      component['setVideoDataToLocalStorage'] = jest.fn();

      component.leavePictureInPictureHandler(new Event('leavepictureinpicture'));

      expect(component['setVideoDataToLocalStorage']).toHaveBeenCalled();
    });
  });

  describe('pauseHandler', () => {
    it('should call private component method setVideoDataToLocalStorage', async () => {
      component['setVideoDataToLocalStorage'] = jest.fn();

      component.pauseHandler(new Event('mouse-leave'));

      expect(component['setVideoDataToLocalStorage']).toHaveBeenCalled();
    });
  });

  describe('speedUpHandler', () => {
    it('should call increase current element video speed', async () => {
      const videoEvent = <Event><unknown>{
        target: component.videoRef
      };

      component.speedUpHandler(videoEvent);

      expect(component.currentSpeed).toEqual(1.25);
    });
  });

  describe('speedDownHandler', () => {
    it('should call decrease current element video speed', async () => {
      const videoEvent = <Event><unknown>{
        target: component.videoRef
      };

      component.speedDownHandler(videoEvent);

      expect(component.currentSpeed).toEqual(0.75);
    });
  });

  describe('startLoaderHandler', () => {
    it('should set isLoading to true', async () => {
      component.startLoaderHandler();

      expect(component.isLoading).toEqual(true);
    });
  });

  describe('stopLoaderHandler', () => {
    it('should set isLoading to false', async () => {
      component.stopLoaderHandler();

      expect(component.isLoading).toEqual(false);
    });
  });
});
