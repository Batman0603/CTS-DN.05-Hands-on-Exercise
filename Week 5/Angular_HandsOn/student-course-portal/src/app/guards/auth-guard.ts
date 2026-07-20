// import { inject } from '@angular/core';

// import { CanActivateFn, Router } from '@angular/router';

// import { AuthService } from '../services/auth';

// export const authGuard: CanActivateFn = () => {

//   const authService = inject(AuthService);
//   const router = inject(Router);

//   if (authService.isLoggedIn) {

//     return true;

//   }

//   router.navigate(['/']);

//   return false;

// };
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {

  console.log("Auth Guard Executed");

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {

    console.log("Access Granted");

    return true;

  }

  console.log("Access Denied");

  router.navigate(['/']);

  return false;

};