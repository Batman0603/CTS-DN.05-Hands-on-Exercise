import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course.model';

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
export class CourseCard {

  @Input()
  course!: Course;

  @Output()
  cardClicked = new EventEmitter<number>();

  @Output()
  viewStudents = new EventEmitter<number>();

  isExpanded = false;

  constructor(
    public enrollmentService: EnrollmentService
  ) {}

  toggleEnrollment(): void {

    if (this.enrollmentService.isEnrolled(this.course.id)) {

      this.enrollmentService.unenroll(this.course.id);

    } else {

      this.enrollmentService.enroll(this.course.id);

    }

  }

  toggleDetails(): void {

    this.isExpanded = !this.isExpanded;

  }

  openCourse(): void {

    this.cardClicked.emit(this.course.id);

  }

  showStudents(): void {

    console.log("Button clicked");

    this.viewStudents.emit(this.course.id);

  }

  get cardClasses() {

    return {

      'card--enrolled':
        this.enrollmentService.isEnrolled(this.course.id),

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