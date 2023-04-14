import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStarsModule } from 'ngx-stars';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseCardComponent } from './components/courses/course-card/course-card.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CourseComponent } from './components/lesson/course.component';
import { LessonDetailsCardComponent } from './components/lesson/lesson-details-card/lesson-details-card.component';
import { LessonsListComponent } from './components/lesson/lessons-list/lessons-list.component';
import { VideoContainerComponent } from './components/lesson/video-container/video-container.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseCardComponent,
    CourseComponent,
    CoursesComponent,
    ErrorPageComponent,
    HeaderComponent,
    LessonDetailsCardComponent,
    LessonsListComponent,
    PageNotFoundComponent,
    VideoContainerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    NgxStarsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
