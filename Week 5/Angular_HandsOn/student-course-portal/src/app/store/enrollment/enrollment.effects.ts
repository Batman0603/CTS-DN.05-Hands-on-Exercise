import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { EnrollmentService } from '../../services/enrollment';
import {
  loadCourseStudents,
  loadCourseStudentsSuccess,
  loadCourseStudentsFailure
} from './enrollment.actions';

@Injectable()
export class EnrollmentEffects {
  private actions$ = inject(Actions);
  private enrollmentService = inject(EnrollmentService);

  loadCourseStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourseStudents),
      tap(({ courseId }) =>
        console.log('[NgRx] loadCourseStudents', courseId)
      ),
      switchMap(({ courseId }) =>
        this.enrollmentService.getStudentsByCourse(courseId).pipe(
          map(students =>
            loadCourseStudentsSuccess({ courseId, students })
          ),
          catchError(error =>
            of(
              loadCourseStudentsFailure({
                courseId,
                error: error.message
              })
            )
          )
        )
      )
    )
  );
}
