import { Injectable } from '@angular/core';


import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private auth: AuthService) { }

  canActivate() {
    if (!this.auth.loggedIn) {
      this.auth.login();
    }

    return this.auth.loggedIn;
  }
}
