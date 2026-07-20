import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authReq = req.clone({

    setHeaders: {

      Authorization: 'Bearer mocktoken-12345'

    }

  });

  console.log('Auth Interceptor Executed');

  return next(authReq);

};