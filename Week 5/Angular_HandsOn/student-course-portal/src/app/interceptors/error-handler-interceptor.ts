import { inject } from '@angular/core';

import {

  HttpErrorResponse,

  HttpInterceptorFn

} from '@angular/common/http';

import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (

  req,

  next

) => {

  const router = inject(Router);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      console.error('HTTP Error:', error);

      if (error.status === 401) {

        alert('Unauthorized');

        router.navigate(['/']);

      }

      if (error.status === 500) {

        alert('Internal Server Error');

      }

      return throwError(() => error);

    })

  );

};