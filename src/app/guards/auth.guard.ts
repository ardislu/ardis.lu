import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate() {
    if (!this.auth.loggedIn) {
      this.auth.login();
    }

    return this.auth.loggedIn;
  }
}
