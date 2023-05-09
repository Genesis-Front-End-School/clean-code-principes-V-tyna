import { Component, ElementRef, Input, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VIDEO_SPEED_STEP } from '../../../configs/constants';
import { VideoService } from '../../../services/video.service';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.css']
})
export class VideoContainerComponent implements OnInit, DoCheck, OnDestroy {
  @ViewChild('video', { static: true }) videoRef: ElementRef<HTMLVideoElement>;
  @Input() public videoId: string;
  @Input() public videoLink: string | undefined;
  public currentSpeed?: number;
  public isLoading = false;
  public videoStreamError = false;

  constructor(private videoService: VideoService) { }

  public async ngOnInit(): Promise<void> {
    this.videoService.videoRef = this.videoRef;
    this.currentSpeed = this.videoRef.nativeElement.playbackRate;

    if (document.pictureInPictureElement) {
      return;
    }

    const videoData = localStorage.getItem(this.videoId);
    if (videoData) {
      const { link, currentTime } = JSON.parse(videoData);

      this.videoService.setVideoLink(link);
      await this.videoService.runVideoStream(link, this.videoRef, +currentTime);

      return;
    }

    if (this.videoLink) {
      await this.videoService.runVideoStream(this.videoLink, this.videoRef, 0);
    }
  }

  public ngDoCheck(): void {
    this.videoStreamError = this.videoService.videoStreamError;
  }

  public leavePictureInPictureHandler(e: Event): void {
    this.setVideoDataToLocalStorage(e);
  }

  public pauseHandler(e: Event): void {
    this.setVideoDataToLocalStorage(e);
  }

  public async togglePictureInPicture(): Promise<void> {
    try {
      if (this.videoRef.nativeElement !== document.pictureInPictureElement) {
        await this.videoRef.nativeElement.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (e) {
      console.error('Picture in picture error: ', e);
    }
  }

  public speedUpHandler(e: Event): void {
    const ref = <HTMLVideoElement>e.target;
    ref.playbackRate = ref.playbackRate + VIDEO_SPEED_STEP;
    this.currentSpeed = ref.playbackRate;
  }

  public speedDownHandler(e: Event): void {
    const ref = <HTMLVideoElement>e.target;
    ref.playbackRate = ref.playbackRate - VIDEO_SPEED_STEP;
    this.currentSpeed = ref.playbackRate;
  }

  public startLoaderHandler(): void {
    this.isLoading = true;
  }

  public stopLoaderHandler(): void {
    this.isLoading = false;
  }

  public ngOnDestroy(): void {
    if (this.videoLink) {
      const { currentTime, id } = this.videoRef.nativeElement;

      this.videoService.setVideoDataToLocalStorage(currentTime, id, this.videoLink);
    }
  }

  private setVideoDataToLocalStorage(e: Event) {
    const ref = <HTMLVideoElement>e.target;
    const link = this.videoService.getVideoLink();
    this.videoService.setVideoDataToLocalStorage(ref.currentTime, ref.id, link!);
  }
}
