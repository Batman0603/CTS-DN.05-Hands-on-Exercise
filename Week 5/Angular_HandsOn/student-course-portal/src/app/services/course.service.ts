import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import {
  map,
  tap,
  retry,
  catchError,
  delay
} from 'rxjs/operators';

import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/courses';

  private cachedCourses: Course[] = [];

  constructor(
    private http: HttpClient
  ) {}

  // GET ALL COURSES

  getCourses(): Observable<Course[]> {

    return this.http
      .get<Course[]>(this.apiUrl)
      .pipe(

        // Step 83
        map(courses =>
          courses.filter(course => course.credits > 0)
        ),

        // Step 85
        tap(courses => {

          this.cachedCourses = courses;

          console.log(
            'Courses loaded:',
            courses.length
          );

        }),

        // Optional delay to demonstrate loading
        delay(2000),

        // Step 86
        retry(2),

        // Step 84
        catchError(err => {

          console.error(err);

          return throwError(() =>
            new Error(
              'Failed to load courses. Please try again.'
            )
          );

        })

      );

  }

  // GET COURSE BY ID

  getCourseById(id: number): Observable<Course> {

    return this.http.get<Course>(
      `${this.apiUrl}/${id}`
    );

  }

  // CREATE COURSE

  createCourse(
    course: Omit<Course, 'id'>
  ): Observable<Course> {

    return this.http.post<Course>(
      this.apiUrl,
      course
    );

  }

  // UPDATE COURSE

  updateCourse(
    id: number,
    course: Course
  ): Observable<Course> {

    return this.http.put<Course>(
      `${this.apiUrl}/${id}`,
      course
    );

  }

  // DELETE COURSE

  deleteCourse(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

  getCachedCourses(): Course[] {

    return this.cachedCourses;

  }

}