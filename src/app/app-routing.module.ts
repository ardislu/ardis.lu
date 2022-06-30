import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

/* eslint-disable max-len */
const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule), canActivate: [AuthGuard] },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'image-generator', loadComponent: () => import('./pages/image-generator/image-generator.component').then(m => m.ImageGeneratorComponent) },
  { path: 'bfi', loadChildren: () => import('./pages/bfi/bfi.module').then(m => m.BfiModule) },
  { path: 'snek', loadChildren: () => import('./pages/snek/snek.module').then(m => m.SnekModule) },
  { path: 'colab-hosting', loadChildren: () => import('./pages/colab-hosting/colab-hosting.module').then(m => m.ColabHostingModule) },
  { path: '**', pathMatch: 'full', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) }
];
/* eslint-enable max-len */

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
