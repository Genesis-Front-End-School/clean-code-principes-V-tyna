import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { CourseCardComponent } from './course-card.component';
import { VideoService } from '../../../services/video.service';
import { mockCourseData } from '../../../configs/mock-data/course.mock';
import Hls from 'hls.js';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let videoService: VideoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    videoService = TestBed.inject(VideoService);
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    component.course = mockCourseData;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    videoService.hlsElement = undefined;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('playVideoHandler', () => {
    it('should set isPlayingVideo to true and call playPreviewVideo with correct arguments', () => {
      const videoServiceSpy = jest.spyOn(videoService, 'playPreviewVideo');
      const mockLink = 'http://playPreviewVideo.com';

      videoService.simulateDifferentLinks = jest.fn().mockReturnValue(mockLink);
      component.playVideoHandler();

      expect(component.isPlayingVideo).toBe(true);
      expect(videoServiceSpy).toHaveBeenCalledWith(
        mockLink,
        component.videoRef
      );
    });
  });

  describe('pauseVideoHandler', () => {
    it('should set isPlayingVideo to false, pause video and destroy hlsElement', () => {
      jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => { });
      const videoRefSpy = jest.spyOn(component.videoRef.nativeElement, 'pause');
      videoService.hlsElement = new Hls();
      const hslSpy = jest.spyOn(videoService.hlsElement, 'destroy');

      component.playVideoHandler();
      component.pauseVideoHandler();

      expect(component.isPlayingVideo).toBe(false);
      expect(videoRefSpy).toHaveBeenCalled();
      expect(hslSpy).toHaveBeenCalled();
    });
  });

  describe('clickHandler', () => {
    it('should pause video and destroy hlsElement', () => {
      jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => { });
      const videoRefSpy = jest.spyOn(component.videoRef.nativeElement, 'pause');
      videoService.hlsElement = new Hls();
      const hslSpy = jest.spyOn(videoService.hlsElement, 'destroy');

      component.clickHandler();

      expect(component.isPlayingVideo).toBe(false);
      expect(videoRefSpy).toHaveBeenCalled();
      expect(hslSpy).toHaveBeenCalled();
    });
  });
});
