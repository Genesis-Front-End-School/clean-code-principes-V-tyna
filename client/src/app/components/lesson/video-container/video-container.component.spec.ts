import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoService } from '../../../services/video.service';

import { VideoContainerComponent } from './video-container.component';

describe('VideoContainerComponent', () => {
  let component: VideoContainerComponent;
  let fixture: ComponentFixture<VideoContainerComponent>;
  let videoService: VideoService;

  beforeEach(async () => {
    videoService = <VideoService>{};
    await TestBed.configureTestingModule({
      declarations: [VideoContainerComponent],
      providers: [
        { provide: VideoService, useValue: videoService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VideoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
