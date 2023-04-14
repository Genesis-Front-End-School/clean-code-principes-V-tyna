import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CourseComponent } from './components/lesson/course.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { appPaths } from './configs/app-paths';

const routes: Routes = [
  { path: appPaths['courses'], component: CoursesComponent },
  { path: appPaths['course'], component: CourseComponent },
  { path: appPaths['error'], component: ErrorPageComponent },
  { path: appPaths['pageNotFound'], component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
