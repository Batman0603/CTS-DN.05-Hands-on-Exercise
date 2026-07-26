import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';

export const selectEnrollmentState =
  createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledCourseIds = createSelector(
  selectEnrollmentState,
  state => state.enrolledCourseIds
);

export const selectSelectedCourseId = createSelector(
  selectEnrollmentState,
  state => state.selectedCourseId
);

export const selectSelectedCourseStudents = createSelector(
  selectEnrollmentState,
  state => state.students
);

export const selectStudentsLoading = createSelector(
  selectEnrollmentState,
  state => state.loadingStudents
);

export const selectEnrollmentError = createSelector(
  selectEnrollmentState,
  state => state.error
);

export const selectIsCourseEnrolled = createSelector(
  selectEnrolledCourseIds,
  (ids: number[], props: { courseId: number }) =>
    ids.includes(props.courseId)
);

export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledCourseIds,
  (courses, enrolledIds) =>
    courses.filter(course => enrolledIds.includes(course.id))
);
