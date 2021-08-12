import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { BaseTheme } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Potential anti-pattern: master data is defined within the service (fetch from API)
  private readonly ardisDarkTheme = new BaseTheme('Dark', 'ardis-dark-theme', 'al-dark');
  private readonly ardisLightTheme = new BaseTheme('Light', 'ardis-light-theme', 'al-light');

  // Default theme instantiation
  private _selectedTheme: BaseTheme = this.ardisDarkTheme;
  // eslint-disable-next-line @typescript-eslint/member-ordering -- this variable depends on private variables
  public readonly selectedTheme$: BehaviorSubject<BaseTheme> = new BehaviorSubject(this.ardisDarkTheme);

  constructor() {
    this.selectedTheme$.subscribe(this.changeBodyClass);
  }

  get selectedTheme() {
    return this._selectedTheme;
  }

  list(): Observable<BaseTheme[]> {
    return of([this.ardisDarkTheme, this.ardisLightTheme]);
  }

  setTheme(theme: BaseTheme): void {
    this.selectedTheme$.next(theme);
  }

  // Change theme by removing old theme class and adding new theme class to root body tag
  private readonly changeBodyClass = (theme: BaseTheme) => {
    const classList = document.body.classList;
    if (this._selectedTheme.colorClass) {
      classList.remove(this._selectedTheme.colorClass);
    }
    if (theme.colorClass) {
      classList.add(theme.colorClass);
    }
    this._selectedTheme = theme;
  };

}
