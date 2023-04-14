import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CourseDetail } from '../../models/lesson.model';
import { HttpService } from '../../services/http.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {
  public course$?: Observable<CourseDetail> | null;
  private checkErrorSub?: Subscription;
  private paramSub?: Subscription;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideoService,
  ) { }

  public ngOnInit(): void {
    this.paramSub = this.route.params.subscribe((params: Params) => {
      this.course$ = this.httpService.getCourse(params['courseId']);
      this.checkErrorSub = this.course$.subscribe({
        error: (e: HttpErrorResponse) => {
          this.httpService.error = e;
          this.router.navigate(['/error-page']);
        }
      })
      this.videoService.setVideoId(params['courseId']);
    });
  }

  public ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
    this.checkErrorSub?.unsubscribe();
  }
}
