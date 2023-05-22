import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ButtonComponent } from './button/button.component';
import { ErrorComponent } from './error-page/error.component';
import { HeaderComponent } from './header/header.component';
import { LessonDetailsCardComponent } from './lesson-details-card/lesson-details-card.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ErrorComponent,
    HeaderComponent,
    LessonDetailsCardComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule
  ],
  exports: [
    ButtonComponent,
    ErrorComponent,
    HeaderComponent,
    LessonDetailsCardComponent
  ]
})
export class CoursesComponentsModule { }
