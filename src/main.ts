import { enableProdMode, importProvidersFrom } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { AuthGuard } from './app/guards/auth.guard';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/* eslint-disable max-len */
const routes: Routes = [
  { path: '', loadComponent: () => import('./app/pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'settings', loadComponent: () => import('./app/pages/settings/settings.component').then(m => m.SettingsComponent), canActivate: [AuthGuard] },
  { path: 'about', loadComponent: () => import('./app/pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'image-generator', loadComponent: () => import('./app/pages/image-generator/image-generator.component').then(m => m.ImageGeneratorComponent) },
  { path: 'bfi', loadComponent: () => import('./app/pages/bfi/bfi.component').then(m => m.BfiComponent) },
  { path: 'snek', loadComponent: () => import('./app/pages/snek/snek.component').then(m => m.SnekComponent) },
  { path: 'colab-hosting', loadComponent: () => import('./app/pages/colab-hosting/colab-hosting.component').then(m => m.ColabHostingComponent) },
  { path: '**', pathMatch: 'full', loadComponent: () => import('./app/pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
/* eslint-enable max-len */

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules }),
      BrowserModule,
      ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
      HttpClientModule
    )
  ]
});
