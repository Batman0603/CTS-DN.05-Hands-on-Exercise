import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard {

  @Input()
  course: any;

  // Whether the user has enrolled
  isEnrolled = false;

  // Controls Show Details
  isExpanded = false;

  enroll() {

    this.isEnrolled = true;

    console.log("Enrolled in", this.course.name);

  }

  toggleDetails() {

    this.isExpanded = !this.isExpanded;

  }

  /*
    Using a getter keeps the HTML template clean
    instead of writing long ngClass expressions.
  */
  get cardClasses() {

    return {

      'card--enrolled': this.isEnrolled,

      'card--full': this.course.credits >= 4,

      'expanded': this.isExpanded

    };

  }

}