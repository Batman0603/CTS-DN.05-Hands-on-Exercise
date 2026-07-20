import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loading = inject(LoadingService);

  console.log("SHOW");
  loading.show();

  return next(req).pipe(

    finalize(() => {

      console.log("HIDE");
      loading.hide();

    })

  );

};