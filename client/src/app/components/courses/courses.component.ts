import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Course } from '../../models/course.model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  public courses$: Observable<{ courses: Course[], allCoursesLength: string }> | null = null;
  public allCoursesLength: number = 0;
  public pageSize: number = 10;
  private subscription?: Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.getCourses({ limit: 10, offset: 0 });
    this.subscription = this.courses$?.subscribe({
      next: (result: { courses: Course[], allCoursesLength: string }) => {
        this.allCoursesLength = +result.allCoursesLength;
      },
      error: (e: HttpErrorResponse) => {
        this.httpService.error = e;
        this.router.navigate(['/error-page']);
      }
    });
  }

  public handlePageEvent(e: PageEvent): void {
    this.pageSize = e.pageSize;
    this.getCourses({ limit: (e.pageIndex + 1) * e.pageSize, offset: e.pageIndex * e.pageSize });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private getCourses(params: { limit: number, offset: number }): void {
    this.courses$ = this.httpService.getAllCourses(params);
  }
}
