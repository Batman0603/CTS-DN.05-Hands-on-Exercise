import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('Auth Interceptor Executed');

  const clonedRequest = req.clone({

    setHeaders: {

      Authorization: 'Bearer mocktoken-12345'

    }

  });

  return next(clonedRequest);

};