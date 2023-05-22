import { Component, Input } from '@angular/core';
import { LessonDetail } from '../models/lesson-detail';

@Component({
  selector: 'ccl-lesson-details-card',
  templateUrl: './lesson-details-card.component.html',
  styleUrls: ['./lesson-details-card.component.css']
})
export class LessonDetailsCardComponent {
  @Input() public lessonDetails: LessonDetail;

  public countMinutes(sec: number): number {
    return Math.round(sec / 60);
  }
}
