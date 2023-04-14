import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseDetail } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public error: HttpErrorResponse;

  constructor(private http: HttpClient) { }

  public getAllCourses(paramsObj: { limit: number, offset: number }): Observable<{ courses: Course[], allCoursesLength: string }> {
    return this.http.get<{ courses: Course[], allCoursesLength: string }>('http://localhost:3000/', {
      params: new HttpParams({
        fromObject: paramsObj
      })
    });
  }

  public getCourse(id: string): Observable<CourseDetail> {
    return this.http.get<CourseDetail>('http://localhost:3000/course/' + id);
  }
}
