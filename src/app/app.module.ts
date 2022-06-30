import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

// Common (only import once)
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// Progressive web app
import { ServiceWorkerModule } from '@angular/service-worker';

// Environment variables
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HeaderComponent,
    BrowserModule,
    HammerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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
