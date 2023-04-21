import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../configs/constants';
import { Course } from '../models/course.model';
import { CourseDetail } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public error: HttpErrorResponse;

  constructor(private http: HttpClient) { }

  public getAllCourses(paramsObj: { limit: number, offset: number }): Observable<{ courses: Course[], allCoursesLength: string }> {
    return this.http.get<{ courses: Course[], allCoursesLength: string }>(BASE_URL, {
      params: new HttpParams({
        fromObject: paramsObj
      })
    });
  }

  public getCourse(id: string): Observable<CourseDetail> {
    return this.http.get<CourseDetail>(`${BASE_URL}course/${id}`);
  }
}
