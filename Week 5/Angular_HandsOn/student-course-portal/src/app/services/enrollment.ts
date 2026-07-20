import { Injectable } from '@angular/core';

import { Course } from '../models/course.model';

import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})

export class EnrollmentService {

  /*
      Stores only enrolled course IDs.
  */

  private enrolledCourseIds: number[] = [];

  /*
      Service-to-Service Dependency Injection

      EnrollmentService depends on CourseService.
  */

  constructor(
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

  getEnrolledCourses(): Course[] {

  return [];

}

}