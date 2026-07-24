import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Student } from '../models/student.model';
import { Course } from '../models/course.model';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private apiUrl = 'http://localhost:3000/students';

  private enrolledCourseIds: number[] = [];

  constructor(
    private http: HttpClient,
    private courseService: CourseService
  ) {}

  enroll(courseId: number): void {

    if (!this.enrolledCourseIds.includes(courseId)) {

      this.enrolledCourseIds.push(courseId);

    }

  }

  unenroll(courseId: number): void {

    this.enrolledCourseIds =
      this.enrolledCourseIds.filter(id => id !== courseId);

  }

  isEnrolled(courseId: number): boolean {

    return this.enrolledCourseIds.includes(courseId);

  }

  getStudentsByCourse(courseId: number): Observable<Student[]> {

    return this.http.get<Student[]>(
      `${this.apiUrl}?courseId=${courseId}`
    );

  }

  // Keep this method for Student Profile
  getEnrolledCourses(): Course[] {

    return this.courseService
      .getCachedCourses()
      .filter(course =>
        this.enrolledCourseIds.includes(course.id)
      );

  }

}