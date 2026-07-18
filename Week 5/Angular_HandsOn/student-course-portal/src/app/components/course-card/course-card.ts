import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-card',

  imports: [
    CommonModule,
    HighlightDirective,
    CreditLabelPipe
  ],

  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard {

  @Input()
  course: any;

  isEnrolled = false;
  isExpanded = false;

  enroll() {

    this.isEnrolled = true;

    console.log("Enrolled in", this.course.name);

  }

  toggleDetails() {

    this.isExpanded = !this.isExpanded;

  }

  get cardClasses() {

    return {

      'card--enrolled': this.isEnrolled,

      'card--full': this.course.credits >= 4,

      'expanded': this.isExpanded

    };

  }

}