import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HeaderComponent } from './components/header.component';
import { ThemeService } from './services/theme.service';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private theme: ThemeService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('../assets/logo.svg'));
    iconRegistry.addSvgIcon('login', sanitizer.bypassSecurityTrustResourceUrl('../assets/login.svg'));
    iconRegistry.addSvgIcon('settings', sanitizer.bypassSecurityTrustResourceUrl('../assets/settings.svg'));
    iconRegistry.addSvgIcon('info', sanitizer.bypassSecurityTrustResourceUrl('../assets/info.svg'));
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('../assets/github.svg'));
    iconRegistry.addSvgIcon('keyboard_arrow_right', sanitizer.bypassSecurityTrustResourceUrl('../assets/keyboard_arrow_right.svg'));
    iconRegistry.addSvgIcon('dice', sanitizer.bypassSecurityTrustResourceUrl('../assets/dice.svg'));
    iconRegistry.addSvgIcon('launch', sanitizer.bypassSecurityTrustResourceUrl('../assets/launch.svg'));
  }
}
