import { createAction, props } from '@ngrx/store';
import { Student } from '../../models/student.model';

export const enrollCourse = createAction(
  '[Enrollment] Enroll Course',
  props<{ courseId: number }>()
);

export const unenrollCourse = createAction(
  '[Enrollment] Unenroll Course',
  props<{ courseId: number }>()
);

export const loadCourseStudents = createAction(
  '[Enrollment] Load Course Students',
  props<{ courseId: number }>()
);

export const loadCourseStudentsSuccess = createAction(
  '[Enrollment] Load Course Students Success',
  props<{ courseId: number; students: Student[] }>()
);

export const loadCourseStudentsFailure = createAction(
  '[Enrollment] Load Course Students Failure',
  props<{ courseId: number; error: string }>()
);

export const clearSelectedCourse = createAction(
  '[Enrollment] Clear Selected Course'
);
