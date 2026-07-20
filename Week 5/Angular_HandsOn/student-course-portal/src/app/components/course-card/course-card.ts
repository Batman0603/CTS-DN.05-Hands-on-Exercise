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

  styleUrl: './course-card.css'

})

export class CourseCard{

  @Input()
  course!: Course;

  @Output()
  cardClicked = new EventEmitter<number>();

  isExpanded = false;

  constructor(

    public enrollmentService: EnrollmentService

  ) {}

  toggleEnrollment() {

    if (this.enrollmentService.isEnrolled(this.course.id)) {

      this.enrollmentService.unenroll(this.course.id);

    }

    else {

      this.enrollmentService.enroll(this.course.id);

    }

  }

  toggleDetails() {

    this.isExpanded = !this.isExpanded;

  }

  openCourse() {

    this.cardClicked.emit(this.course.id);

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