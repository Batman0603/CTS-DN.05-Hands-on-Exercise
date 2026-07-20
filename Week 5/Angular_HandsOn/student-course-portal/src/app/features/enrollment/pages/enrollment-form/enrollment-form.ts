import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { CourseService } from '../../../../services/course.service';
import { Course } from '../../../../models/course.model';

@Component({
  selector: 'app-enrollment-form',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './enrollment-form.html',

  styleUrl: './enrollment-form.css'
})

export class EnrollmentForm {

  // -----------------------------
  // Form Model Properties
  // -----------------------------

  studentName: string = '';

  studentEmail: string = '';

  courseId: number | null = null;

  preferredSemester: string = 'Odd';

  agreeToTerms: boolean = false;

  submitted: boolean = false;

  constructor(
    private courseService: CourseService
  ) {}

  onSubmit(form: NgForm): void {

    if (form.invalid) {
      return;
    }

    // Creating a sample course from the form data
    const course: Omit<Course, 'id'> = {

      name: this.studentName,

      code: 'NEW101',

      credits: 3,

      gradeStatus: 'pending'

    };

    this.courseService.createCourse(course).subscribe({

      next: (response: Course) => {

        console.log('Course Created Successfully');

        console.log(response);

        this.submitted = true;

        // Reset Angular Form
        form.resetForm();

        // Reset model values
        this.studentName = '';
        this.studentEmail = '';
        this.courseId = null;
        this.preferredSemester = 'Odd';
        this.agreeToTerms = false;

      },

      error: (err: Error) => {

        console.error('Failed to create course');

        console.error(err);

      }

    });

  }

}