import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
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
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('../assets/images/logo.svg'));
    iconRegistry.addSvgIcon('login', sanitizer.bypassSecurityTrustResourceUrl('../assets/images/login.svg'));
    iconRegistry.addSvgIcon('settings', sanitizer.bypassSecurityTrustResourceUrl('../assets/images/settings.svg'));
    iconRegistry.addSvgIcon('info', sanitizer.bypassSecurityTrustResourceUrl('../assets/images/info.svg'));
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('../assets/images/github.svg'));
    iconRegistry.addSvgIcon('keyboard_arrow_right', sanitizer.bypassSecurityTrustResourceUrl('../assets/images/keyboard_arrow_right.svg'));
    iconRegistry.addSvgIcon('dice', sanitizer.bypassSecurityTrustResourceUrl('../assets/images/dice.svg'));
    iconRegistry.addSvgIcon('launch', sanitizer.bypassSecurityTrustResourceUrl('../assets/images/launch.svg'));
  }
}
