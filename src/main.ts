import { enableProdMode, importProvidersFrom } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { AuthGuard } from '@guards/auth.guard';
import { environment } from '@environment';

if (environment.production) {
  enableProdMode();
}

/* eslint-disable max-len */
const routes: Routes = [
  { path: '', loadComponent: () => import('@pages/home.component').then(m => m.HomeComponent) },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'settings', loadComponent: () => import('@pages/settings.component').then(m => m.SettingsComponent), canActivate: [AuthGuard] },
  { path: 'about', loadComponent: () => import('@pages/about.component').then(m => m.AboutComponent) },
  { path: 'image-generator', loadComponent: () => import('@pages/image-generator.component').then(m => m.ImageGeneratorComponent) },
  { path: 'bfi', loadComponent: () => import('@pages/bfi.component').then(m => m.BfiComponent) },
  { path: 'snek', loadComponent: () => import('@pages/snek.component').then(m => m.SnekComponent) },
  { path: 'colab-hosting', loadComponent: () => import('@pages/colab-hosting.component').then(m => m.ColabHostingComponent) },
  { path: '**', pathMatch: 'full', loadComponent: () => import('@pages/not-found.component').then(m => m.NotFoundComponent) }
];
/* eslint-enable max-len */

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules }),
      BrowserModule,
      BrowserAnimationsModule,
      ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
    ),
    provideHttpClient(withFetch())
  ]
});
