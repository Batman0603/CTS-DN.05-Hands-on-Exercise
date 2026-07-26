import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Observable
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
  EnrollmentService
} from '../../services/enrollment';

import {
  loadCourses
} from '../../store/course/course.actions';

import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../../store/course/course.selectors';

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

  courses$!: Observable<Course[]>;

  loading$!: Observable<boolean>;

  error$!: Observable<string | null>;

  selectedCourseId: number | null = null;

  students: Student[] = [];

  constructor(
    private store: Store,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {

    this.courses$ =
      this.store.select(selectAllCourses);

    this.loading$ =
      this.store.select(selectCoursesLoading);

    this.error$ =
      this.store.select(selectCoursesError);

    this.store.dispatch(
      loadCourses()
    );

  }

  trackByCourseId(
    index: number,
    course: Course
  ): number {

    return course.id;

  }

  loadStudents(courseId: number): void {

    console.log('Loading students for course:', courseId);

    // Toggle: if same course is selected, hide it; otherwise load and show
    if (this.selectedCourseId === courseId) {

      this.selectedCourseId = null;

      this.students = [];

      return;

    }

    this.selectedCourseId = courseId;

    this.enrollmentService.getStudentsByCourse(courseId).subscribe({

      next: (students) => {

        console.log('Students received:', students);

        this.students = students;

      },

      error: (err) => {

        console.error('Failed to load students:', err);

        this.students = [];

      }

    });

  }

}
