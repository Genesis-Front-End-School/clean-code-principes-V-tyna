import { Component, Input } from '@angular/core';
import { CourseDetail } from '../../../models/lesson.model';

@Component({
  selector: 'app-lesson-details-card',
  templateUrl: './lesson-details-card.component.html',
  styleUrls: ['./lesson-details-card.component.css']
})
export class LessonDetailsCardComponent {
  @Input() public lessonDetails: CourseDetail;

  public countMinutes(sec: number): number {
    return Math.round(sec / 60);
  }
}
