import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';

import {

  switchMap,
  map,
  catchError,
  tap

} from 'rxjs/operators';

import { CourseService } from '../../services/course.service';

import {

  loadCourses,
  loadCoursesSuccess,
  loadCoursesFailure

} from './course.actions';

@Injectable()

export class CourseEffects {

  private actions$ = inject(Actions);

  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>

    this.actions$.pipe(

      ofType(loadCourses),

      tap(() =>

        console.log('[NgRx] loadCourses action received')

      ),

      switchMap(() =>

        this.courseService.getCourses().pipe(

          map(courses =>

            loadCoursesSuccess({

              courses

            })

          ),

          tap(courses =>

            console.log('[NgRx] HTTP Success', courses)

          ),

          catchError(error =>

            of(

              loadCoursesFailure({

                error: error.message

              })

            )

          )

        )

      )

    )

  );

}