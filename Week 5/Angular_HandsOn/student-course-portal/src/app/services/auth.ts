import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  /*
    Hardcoded login status.

    Change to false to test AuthGuard.
  */

  isLoggedIn = true;

}