import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { environment } from '@environment';
import { UserProfile } from '@models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfile$: BehaviorSubject<UserProfile | null>;
  loggedIn: boolean;

  constructor(private router: Router) {
    this.userProfile$ = new BehaviorSubject<UserProfile | null>(null);
    this.loggedIn = false;

    this.handleRedirectCallback();
  }

  /* Adapter to convert the the id_token from /oauth/token into UserProfile */
  public static toUserProfile(payload: Record<string, any>): UserProfile {
    return {
      email: payload.email,
      email_verified: payload.email_verified,
      name: payload.name,
      nickname: payload.nickname,
      picture: payload.picture,
      updated_at: payload.updated_at
    };
  }

  public async login(redirectPath = location.pathname) {
    sessionStorage.setItem('auth_redirect_path', redirectPath);

    const state = crypto.randomUUID();
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    sessionStorage.setItem('state', state);
    sessionStorage.setItem('code_verifier', codeVerifier);

    const params = new URLSearchParams({
      response_type: 'code',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      client_id: environment.authClientId,
      redirect_uri: location.origin,
      scope: 'openid profile email',
      state
    });
    location.href = `${environment.authOrigin}/authorize?${params}`;
  }

  public logout() {
    this.userProfile$.next(null);
    this.loggedIn = false;

    const params = new URLSearchParams({
      returnTo: location.origin,
      client_id: environment.authClientId
    });
    location.href = `${environment.authOrigin}/v2/logout?${params}`;
  }

  private async handleRedirectCallback() {
    const { code, state } = Object.fromEntries(new URLSearchParams(location.search));

    if (code === undefined || state === undefined || sessionStorage.getItem('state') !== state) {
      return;
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: environment.authClientId,
      code_verifier: sessionStorage.getItem('code_verifier') as string,
      code,
      redirect_uri: location.origin,
      scope: 'openid profile email'
    });
    const idPayload = await fetch('https://ardislu.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    })
      .then(r => r.json())
      .then(this.getIdTokenPayload.bind(this));

    this.userProfile$.next(AuthService.toUserProfile(idPayload));
    this.loggedIn = true;

    this.router.navigateByUrl(sessionStorage.getItem('auth_redirect_path') as string);
  }

  /* Helper functions */
  private base64UrlEncode(s: string) {
    return btoa(s)
      .replaceAll('=', '')
      .replaceAll('+', '-')
      .replaceAll('/', '_');
  }

  private base64UrlDecode(s: string) {
    return atob(s
      .replaceAll('+', '-')
      .replaceAll('/', '_'));
  }

  private getIdTokenPayload(response: Record<string, any>) {
    const payload = response.id_token.split('.')[1];
    const buffer = Uint8Array.from(this.base64UrlDecode(payload), c => c.charCodeAt(0));
    const decoded = new TextDecoder().decode(buffer);
    return JSON.parse(decoded);
  }

  private generateCodeVerifier() {
    const a = new Uint8Array(64);
    crypto.getRandomValues(a);
    return [...a].map(c => c.toString(16).padStart(2, '0')).join('');
  }

  private async generateCodeChallenge(codeVerifier: string) {
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier));
    const str = String.fromCharCode(...new Uint8Array(buffer));
    return this.base64UrlEncode(str);
  }
}
