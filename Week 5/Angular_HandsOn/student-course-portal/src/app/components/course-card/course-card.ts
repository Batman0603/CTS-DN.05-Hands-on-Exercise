import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, take } from 'rxjs';

import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Store } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { enrollCourse, unenrollCourse } from '../../store/enrollment/enrollment.actions';
import { selectIsCourseEnrolled } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [
    CommonModule,
    CreditLabelPipe
  ],
  templateUrl: './course-card.html',
  styleUrls: ['./course-card.css']
})
export class CourseCard implements OnChanges {

  @Input()
  course!: Course;

  @Output()
  cardClicked = new EventEmitter<number>();

  @Output()
  viewStudents = new EventEmitter<number>();

  isExpanded = false;

  enrolled$!: Observable<boolean>;

  constructor(
    private store: Store
  ) {
    this.enrolled$ = of(false);
  }

  ngOnChanges(): void {
    if (this.course) {
      this.enrolled$ = this.store.select(
        selectIsCourseEnrolled,
        { courseId: this.course.id }
      );
    }
  }

  toggleEnrollment(): void {
    this.enrolled$.pipe(take(1)).subscribe(enrolled => {
      if (enrolled) {
        this.store.dispatch(unenrollCourse({ courseId: this.course.id }));
      } else {
        this.store.dispatch(enrollCourse({ courseId: this.course.id }));
      }
    });
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  openCourse(): void {
    this.cardClicked.emit(this.course.id);
  }

  showStudents(): void {
    console.log('Button clicked');
    this.viewStudents.emit(this.course.id);
  }

  get cardClasses() {
    return {
      'card--full':
        this.course.credits >= 4,
      'passed-course':
        this.course.gradeStatus === 'passed',
      'failed-course':
        this.course.gradeStatus === 'failed',
      'pending-course':
        this.course.gradeStatus === 'pending',
      expanded:
        this.isExpanded
    };
  }
}