import { ElementRef, Injectable } from '@angular/core';
import Hls from 'hls.js';
import { errorLinkHandler } from '../shared/error-link.handler';

const DUMMY_LINKS = [
  'https://wisey.app/videos/think-creatively-solve-problems-easily/lesson-5/AppleHLS1/lesson-5.m3u8',
  'https://wisey.app/videos/think-creatively-solve-problems-easily/lesson-3/AppleHLS1/lesson-3.m3u8',
  'https://wisey.app/videos/think-creatively-solve-problems-easily/lesson-4/AppleHLS1/lesson-4.m3u8',
];

@Injectable({
  providedIn: 'root'
})

export class VideoService {
  public videoRef?: ElementRef<HTMLVideoElement>;
  public hlsElement?: Hls;
  public videoStreamError?: any
  private videoId!: string;
  private videoLink?: string;

  constructor() { }

  public setVideoId(id: string): void {
    this.videoId = id;
  }

  public getVideoId(): string {
    return this.videoId;
  }

  public setVideoLink(link: string): void {
    this.videoLink = link;
  }

  public getVideoLink(): string | undefined {
    return this.videoLink;
  }

  public async runVideoStream(link: string, ref: ElementRef<HTMLVideoElement>, currentTime: number): Promise<void> {
    this.videoStreamError = false;
    const response = await errorLinkHandler(link);
    if (response) {
      this.playVideo(link, ref, currentTime);
    } else {
      // Change link (small hack) to play video.
      const alternativeLink = this.simulateDifferentLinks();
      this.playVideo(alternativeLink, ref, currentTime);
      // To handle video stream errors, delete 2 lines above and uncomment 2 lines below:
      // this.videoRef?.nativeElement.remove();
      // this.videoStreamError = true;
    }
  }

  public playVideo(videoSrc: string, videoRef: ElementRef<HTMLVideoElement>, currentTime: number): void {
    videoRef.nativeElement.id = this.getVideoId();
    this.setVideoLink(videoSrc);
    if (Hls.isSupported() && videoSrc) {
      const config = {
        startPosition: currentTime
      }
      const hls = new Hls(config);
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.nativeElement);
    }
  }

  public playPreviewVideo(link: string, videoRef: ElementRef<HTMLVideoElement>): void {
    if (Hls.isSupported()) {
      const hls = new Hls();
      this.hlsElement = hls;
      hls.loadSource(link);
      hls.attachMedia(videoRef.nativeElement);
    }
  }

  public setVideoDataToLocalStorage(currentTime: number, videoId: string, link: string): void {
    localStorage.setItem(videoId, JSON.stringify({ link, currentTime }));
  }

  public simulateDifferentLinks(): string {
    const randomIndex = Math.round(Math.random() * (DUMMY_LINKS.length - 2) + 1);
    return DUMMY_LINKS[randomIndex];
  }
}
