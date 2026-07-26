import { createReducer, on } from '@ngrx/store';
import { Student } from '../../models/student.model';
import {
  enrollCourse,
  unenrollCourse,
  loadCourseStudents,
  loadCourseStudentsSuccess,
  loadCourseStudentsFailure,
  clearSelectedCourse
} from './enrollment.actions';

export interface EnrollmentState {
  enrolledCourseIds: number[];
  selectedCourseId: number | null;
  students: Student[];
  loadingStudents: boolean;
  error: string | null;
}

export const initialState: EnrollmentState = {
  enrolledCourseIds: [],
  selectedCourseId: null,
  students: [],
  loadingStudents: false,
  error: null
};

export const enrollmentReducer = createReducer(
  initialState,
  on(enrollCourse, (state, { courseId }) =>
    state.enrolledCourseIds.includes(courseId)
      ? state
      : {
          ...state,
          enrolledCourseIds: [...state.enrolledCourseIds, courseId]
        }
  ),
  on(unenrollCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter(id => id !== courseId)
  })),
  on(loadCourseStudents, (state, { courseId }) => ({
    ...state,
    selectedCourseId: courseId,
    students: [],
    loadingStudents: true,
    error: null
  })),
  on(loadCourseStudentsSuccess, (state, { students }) => ({
    ...state,
    students,
    loadingStudents: false,
    error: null
  })),
  on(loadCourseStudentsFailure, (state, { error }) => ({
    ...state,
    loadingStudents: false,
    error
  })),
  on(clearSelectedCourse, state => ({
    ...state,
    selectedCourseId: null,
    students: [],
    loadingStudents: false,
    error: null
  }))
);
