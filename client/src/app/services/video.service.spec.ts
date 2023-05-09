import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import * as errorHandler from '../../app/shared/error-link.handler';
import Hls, { HlsConfig } from 'hls.js';

import { VideoService } from './video.service';

describe('VideoService', () => {
  const mockElementRef = <ElementRef<HTMLVideoElement>>{
    nativeElement: {
      id: 'djjksd-djkd-83jx'
    }
  };
  let service: VideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Getter and setter functions', () => {
    it('should set video id', () => {
      const id = 'fjhrf-3874-dnnc';
      service.setVideoId(id);
      expect(service.getVideoId()).toBe(id);
    });

    it('should set video link', () => {
      const link = 'https://video/fjhrf-3874-dnnc';
      service.setVideoLink(link);
      expect(service.getVideoLink()).toBe(link);
    });
  });

  describe('SimulateDifferentLinks', () => {

    it('should return one of the link from DUMMY_LINKS array', () => {
      const DUMMY_LINKS = [
        'https://wisey.app/videos/think-creatively-solve-problems-easily/lesson-5/AppleHLS1/lesson-5.m3u8',
        'https://wisey.app/videos/think-creatively-solve-problems-easily/lesson-3/AppleHLS1/lesson-3.m3u8',
        'https://wisey.app/videos/think-creatively-solve-problems-easily/lesson-4/AppleHLS1/lesson-4.m3u8',
      ];
      const result = service.simulateDifferentLinks();
      expect(DUMMY_LINKS).toContain(result);
    });
  });

  describe('runVideoStream', () => {
    let link = 'https://wisey.app/videos/think-creatively-solve-problems-easily/lesson-5/AppleHLS1/lesson-5.m3u8';
    const alternativeLink = 'https://validLink';
    const time = 56.009;

    beforeEach(() => {
      service.playVideo = jest.fn();
      service.simulateDifferentLinks = jest.fn();
    });

    it('should call playVideo function with current link, if get VALID link', async () => {
      jest.spyOn(errorHandler, 'errorLinkHandler').mockReturnValueOnce(Promise.resolve(true));
      await service.runVideoStream(link, mockElementRef, time);

      expect(errorHandler.errorLinkHandler).toHaveBeenCalled();
      expect(service.playVideo).toHaveBeenCalledWith(link, mockElementRef, time);
      expect(service.simulateDifferentLinks).not.toHaveBeenCalled();
    });

    it('should call playVideo function with alternativeLink, if get INVALID link', async () => {
      link = 'https://invalidLink';

      service.simulateDifferentLinks = jest.fn().mockReturnValue(alternativeLink);

      await service.runVideoStream(link, mockElementRef, time);

      expect(service.playVideo).toHaveBeenCalledWith(alternativeLink, mockElementRef, time);
      expect(service.simulateDifferentLinks).toHaveBeenCalled();
    });
  });

  describe('playVideo', () => {
    const link = 'https://wisey.app/videos/think-creatively-solve-problems-easily/lesson-5/AppleHLS1/lesson-5.m3u8';

    beforeEach(() => {
      jest.spyOn(Hls, 'isSupported').mockReturnValue(true);
      service.setVideoLink = jest.fn();
      service['hlsHandler'] = jest.fn();
    });

    it('should set id to passed parameter videoRef, set video link and call private method "hlsHandler" with correct parameters', () => {
      const config = <HlsConfig>{
        startPosition: 0
      };
      service.setVideoId('aaa-bbb');
      jest.spyOn(service, 'playVideo');

      service.playVideo(link, mockElementRef, 0);

      expect(mockElementRef.nativeElement.id).toEqual('aaa-bbb');
      expect(service.setVideoLink).toHaveBeenCalled();
      expect(service['hlsHandler']).toHaveBeenCalledWith(link, mockElementRef, config);
    });

    it('should call private method "hlsHandler" with correct parameters and set hlsElement', () => {
      const mockHls = new Hls();
      jest.spyOn(service, 'playVideo');
      service['hlsHandler'] = jest.fn().mockReturnValue(mockHls);

      service.playPreviewVideo(link, mockElementRef);

      expect(service['hlsHandler']).toHaveBeenCalledWith(link, mockElementRef);
      expect(service.hlsElement).toEqual(mockHls);
    });
  });

  describe('setVideoDataToLocalStorage', () => {
    it('should call LocalStorage.setItem', () => {
      const originalLS = window.localStorage
      Object.defineProperty(window, 'localStorage', {
        value: { setItem: jest.fn() },
      });

      jest.spyOn(service, 'setVideoDataToLocalStorage');

      service.setVideoDataToLocalStorage(0, 'someId', 'http://some-link');

      expect(localStorage.setItem).toHaveBeenCalled();

      Object.defineProperty(window, 'localStorage', {
        value: originalLS,
      });
    });
  });
});
