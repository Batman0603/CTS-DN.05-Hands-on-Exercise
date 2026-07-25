import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subject } from 'rxjs';

import {
  switchMap,
  debounceTime,
  distinctUntilChanged,
  tap
} from 'rxjs/operators';

import { CourseCard } from '../../components/course-card/course-card';

import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment';

import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-course-list',

  standalone: true,

  imports: [
    CommonModule,
    CourseCard
  ],

  templateUrl: './course-list.html',

  styleUrls: ['./course-list.css']
})

export class CourseList implements OnInit {

  courses: Course[] = [];

  students: Student[] = [];

  selectedCourseId: number | null = null;

  loadingCourseId: number | null = null;

  isLoading = true;

  errorMessage = '';

  private selectedCourse = new Subject<number>();

  constructor(

    private courseService: CourseService,

    private enrollmentService: EnrollmentService

  ) {}

  ngOnInit(): void {

    this.loadCourses();

    /*
      switchMap cancels the previous HTTP request
      whenever another course is selected.
      This prevents old responses from replacing
      newer ones.
    */

    this.selectedCourse.pipe(

      debounceTime(100),

      distinctUntilChanged(),

      tap(courseId => {

        this.loadingCourseId = courseId;

        this.students = [];

      }),

      switchMap(courseId =>

        this.enrollmentService.getStudentsByCourse(courseId)

      )

    ).subscribe({

      next: students => {

        console.log('Students:', students);

        this.students = students;

        this.loadingCourseId = null;

      },

      error: err => {

        console.error(err);

        this.students = [];

        this.loadingCourseId = null;

      }

    });

  }

  loadCourses(): void {

    this.isLoading = true;

    this.errorMessage = '';

    this.courseService.getCourses().subscribe({

      next: courses => {

        this.courses = courses;

        this.isLoading = false;

      },

      error: err => {

        this.errorMessage = err.message;

        this.isLoading = false;

      }

    });

  }

  loadStudents(courseId: number): void {

    /*
      Clicking the same course again hides
      the students list.
    */

    if (this.selectedCourseId === courseId) {

      this.selectedCourseId = null;

      this.students = [];

      this.loadingCourseId = null;

      return;

    }

    this.selectedCourseId = courseId;

    this.selectedCourse.next(courseId);

  }

  trackByCourseId(

    index: number,

    course: Course

  ): number {

    return course.id;

  }

}