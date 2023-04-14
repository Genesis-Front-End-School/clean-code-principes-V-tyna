import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { VideoService } from './video.service';

jest.mock('../shared/error-link.handler', () => {
  return {
    errorLinkHandler: jest.fn().mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
  }
});

describe('VideoService', () => {
  let service: VideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoService);
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
    const mockElementRef = <ElementRef<HTMLVideoElement>>{
      nativeElement: {
        id: 'djjksd-djkd-83jx'
      }
    };

    beforeEach(() => {
      service.playVideo = jest.fn();
      service.simulateDifferentLinks = jest.fn();
    });

    it('should call playVideo function with current link, if get VALID link', async () => {
      await service.runVideoStream(link, mockElementRef, time);

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
});
