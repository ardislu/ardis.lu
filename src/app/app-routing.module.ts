import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

/* eslint-disable max-len */
const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'settings', loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent), canActivate: [AuthGuard] },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'image-generator', loadComponent: () => import('./pages/image-generator/image-generator.component').then(m => m.ImageGeneratorComponent) },
  { path: 'bfi', loadComponent: () => import('./pages/bfi/bfi.component').then(m => m.BfiComponent) },
  { path: 'snek', loadComponent: () => import('./pages/snek/snek.component').then(m => m.SnekComponent) },
  { path: 'colab-hosting', loadChildren: () => import('./pages/colab-hosting/colab-hosting.module').then(m => m.ColabHostingModule) },
  { path: '**', pathMatch: 'full', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
/* eslint-enable max-len */

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
