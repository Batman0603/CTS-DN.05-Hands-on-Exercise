import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Subject } from 'rxjs';

import { switchMap, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

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

  styleUrl: './course-list.css'

})

export class CourseList implements OnInit {

  courses: Course[] = [];

  students: Student[] = [];

  selectedCourseId: number | null = null;

  // id of the course currently loading students
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
      switchMap cancels the previous HTTP request if
      another course is selected before it finishes.
      This prevents old responses from overwriting newer ones.
    */

    this.selectedCourse.pipe(

      // avoid rapid duplicate clicks and ignore repeated same id
      debounceTime(100),
      distinctUntilChanged(),

      // show loader while fetching and mark which course is loading
      tap((courseId: number) => {
        this.isLoading = true;
        this.loadingCourseId = courseId;
        this.students = [];
      }),

      switchMap(courseId =>
        this.enrollmentService.getStudentsByCourse(courseId)
      ),

      // clear loading flag when response arrives
      tap(() => {
        this.isLoading = false;
        this.loadingCourseId = null;
      })

    ).subscribe({

      next: students => {

        console.log('Students received', students);

        this.students = [...students];

      },

      error: err => {

        console.error('Failed to load students:', err);

        this.students = [];
        this.isLoading = false;

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

    console.log('Loading students for course:', courseId);

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