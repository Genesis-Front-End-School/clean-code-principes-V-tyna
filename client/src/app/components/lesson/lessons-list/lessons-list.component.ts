import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from '../../../models/lesson.model';
import { VideoService } from '../../../services/video.service';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit {
  @Input() public lessonsList: Lesson[];
  @Input() public initLessonTitle?: string;
  public currentLesson?: string;

  constructor(private videoService: VideoService) { }

  public ngOnInit(): void {
    this.currentLesson = this.initLessonTitle;
  }

  public countMinutes(sec: number): number {
    return Math.round(sec / 60);
  }

  public async playVideoHandler(id: string, link: string, idx: number): Promise<void> {
    this.videoService.setVideoId(id);
    this.setCurrentLesson(id, idx);

    // Before each new play, previous video (that is still current playing) has been stopped.
    // pauseHandler() in video-container.component.ts writes data into LocalStorage to save currentTime for this video.
    const currentRef = this.videoService.videoRef;
    currentRef?.nativeElement.pause();

    // Check if there is data in the LocalStorage with timeline for the video
    const videoData = localStorage.getItem(id);
    if (videoData && currentRef) {
      const { link, currentTime } = JSON.parse(videoData);
      await this.videoService.runVideoStream(link, currentRef, +currentTime);
      return;
    }

    // Initially play video
    if (currentRef) {
      await this.videoService.runVideoStream(link, currentRef, 0);
    }
  }

  private setCurrentLesson(id: string, idx: number): void {
    const searchingLesson = this.lessonsList.find((lesson: Lesson) => lesson.id === id);
    this.currentLesson = idx + 1 + '. ' + searchingLesson?.title;
  }
}
