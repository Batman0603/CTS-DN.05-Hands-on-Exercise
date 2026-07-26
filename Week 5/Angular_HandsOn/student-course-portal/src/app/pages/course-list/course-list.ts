import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Observable,
  take
} from 'rxjs';

import {
  Store
} from '@ngrx/store';

import {
  Course
} from '../../models/course.model';

import {
  Student
} from '../../models/student.model';

import {
  CourseCard
} from '../../components/course-card/course-card';

import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../../store/course/course.selectors';

import {
  loadCourses
} from '../../store/course/course.actions';

import {
  loadCourseStudents,
  clearSelectedCourse
} from '../../store/enrollment/enrollment.actions';

import {
  selectSelectedCourseId,
  selectSelectedCourseStudents,
  selectStudentsLoading
} from '../../store/enrollment/enrollment.selectors';

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

  // -----------------------------
  // NgRx Store
  // -----------------------------

  courses$!: Observable<Course[]>;

  loading$!: Observable<boolean>;

  error$!: Observable<string | null>;

  selectedCourseId$!: Observable<number | null>;

  students$!: Observable<Student[]>;

  studentsLoading$!: Observable<boolean>;

  constructor(

    private store: Store

  ) {}

  ngOnInit(): void {

    this.courses$ =
      this.store.select(selectAllCourses);

    this.loading$ =
      this.store.select(selectCoursesLoading);

    this.error$ =
      this.store.select(selectCoursesError);

    this.selectedCourseId$ =
      this.store.select(selectSelectedCourseId);

    this.students$ =
      this.store.select(selectSelectedCourseStudents);

    this.studentsLoading$ =
      this.store.select(selectStudentsLoading);

    this.store.dispatch(loadCourses());

  }

  loadStudents(courseId: number): void {

    this.selectedCourseId$.pipe(take(1)).subscribe(current => {

      if (current === courseId) {

        this.store.dispatch(clearSelectedCourse());

      } else {

        this.store.dispatch(loadCourseStudents({ courseId }));

      }

    });

  }

  trackByCourseId(

    index: number,

    course: Course

  ): number {

    return course.id;

  }

}