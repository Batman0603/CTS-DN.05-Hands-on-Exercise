import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-card',
  standalone: true,

  imports: [
    CommonModule,
    CreditLabelPipe
  ],

  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard {

  @Input()
  course!: Course;

  isExpanded = false;

  constructor(
    public enrollmentService: EnrollmentService
  ) {}

  toggleEnrollment(): void {

    if (this.enrollmentService.isEnrolled(this.course.id)) {

      this.enrollmentService.unenroll(this.course.id);

      console.log("Unenrolled from", this.course.name);

    } else {

      this.enrollmentService.enroll(this.course.id);

      console.log("Enrolled in", this.course.name);

    }

  }

  toggleDetails(): void {

    this.isExpanded = !this.isExpanded;

  }

  get cardClasses() {

    return {

      'card--enrolled':
        this.enrollmentService.isEnrolled(this.course.id),

      'card--full':
        this.course.credits >= 4,

      'expanded':
        this.isExpanded

    };

  }

}