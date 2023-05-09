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

    const currentRef = this.videoService.videoRef;
    currentRef?.nativeElement.pause();

    const videoData = localStorage.getItem(id);
    if (videoData && currentRef) {
      const { link, currentTime } = JSON.parse(videoData);
      await this.videoService.runVideoStream(link, currentRef, +currentTime);
      return;
    }

    if (currentRef) {
      await this.videoService.runVideoStream(link, currentRef, 0);
    }
  }

  private setCurrentLesson(id: string, idx: number): void {
    const searchingLesson = this.lessonsList.find((lesson: Lesson) => lesson.id === id);
    this.currentLesson = `${idx + 1}.${searchingLesson!.title}`;
  }
}
