import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Course } from '../models/course.model';

import { delay , tap } from 'rxjs/operators';

@Injectable({

  providedIn: 'root'

})

export class CourseService {

  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {
     console.log("HTTP COURSE SERVICE");
  }

  // GET ALL COURSES

  getCourses(): Observable<Course[]> {

  console.log("HTTP REQUEST STARTED");

  return this.http
    .get<Course[]>(this.apiUrl)
    .pipe(
      tap(() => console.log("HTTP RESPONSE RECEIVED")),
      delay(2000)
    );
}

  // GET COURSE BY ID

  getCourseById(id: number): Observable<Course> {

    return this.http.get<Course>(`${this.apiUrl}/${id}`);

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

}