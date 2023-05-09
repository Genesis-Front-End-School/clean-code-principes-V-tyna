import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockLessonDetailsData } from '../../../configs/mock-data/lesson-detail.mock';
import { LessonDetailsCardComponent } from './lesson-details-card.component';

describe('LessonDetailsCardComponent', () => {
  let component: LessonDetailsCardComponent;
  let fixture: ComponentFixture<LessonDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonDetailsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LessonDetailsCardComponent);
    component = fixture.componentInstance;
    component.lessonDetails = mockLessonDetailsData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return rounded minutes', () => {
    expect(component.countMinutes(325)).toBe(5);
  });
});
