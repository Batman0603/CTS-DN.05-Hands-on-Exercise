import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';

import {
  provideRouter
} from '@angular/router';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import {
  provideStore
} from '@ngrx/store';

import {
  provideEffects
} from '@ngrx/effects';

import {
  provideStoreDevtools
} from '@ngrx/store-devtools';

import { routes } from './app.routes';

import { courseReducer } from './store/course/course.reducer';

import { CourseEffects } from './store/course/course.effects';

import { authInterceptor } from './interceptors/auth-interceptor';

import { loadingInterceptor } from './interceptors/loading-interceptor';

import { errorHandlerInterceptor } from './interceptors/error-handler-interceptor';

export const appConfig: ApplicationConfig = {

  providers: [

    provideRouter(routes),

    provideZoneChangeDetection({

      eventCoalescing: true

    }),

    provideHttpClient(

      withInterceptors([

        loadingInterceptor,

        authInterceptor,

        errorHandlerInterceptor

      ])

    ),

    provideStore({

      course: courseReducer

    }),

    provideEffects([

      CourseEffects

    ]),

    provideStoreDevtools({

      maxAge: 25,

      logOnly: false

    })

  ]

};