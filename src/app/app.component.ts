import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HeaderComponent } from '@components/header.component';
import { ThemeService } from '@services/theme.service';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent
  ],
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: ''
})
export class AppComponent {
  constructor(private theme: ThemeService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('/logo.svg'));
    iconRegistry.addSvgIcon('login', sanitizer.bypassSecurityTrustResourceUrl('/login.svg'));
    iconRegistry.addSvgIcon('settings', sanitizer.bypassSecurityTrustResourceUrl('/settings.svg'));
    iconRegistry.addSvgIcon('info', sanitizer.bypassSecurityTrustResourceUrl('/info.svg'));
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('/github.svg'));
    iconRegistry.addSvgIcon('keyboard_arrow_right', sanitizer.bypassSecurityTrustResourceUrl('/keyboard_arrow_right.svg'));
    iconRegistry.addSvgIcon('dice', sanitizer.bypassSecurityTrustResourceUrl('/dice.svg'));
    iconRegistry.addSvgIcon('launch', sanitizer.bypassSecurityTrustResourceUrl('/launch.svg'));
  }
}
