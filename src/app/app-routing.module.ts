import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  // Arranque en splash animado
  { path: '', redirectTo: 'splash-animado', pathMatch: 'full' },

  // Splash animado (STANDALONE: usa loadComponent)
  {
    path: 'splash-animado',
    loadComponent: () =>
      import('./pages/splash-animado/splash-animado.component')
        .then(m => m.SplashAnimadoComponent)
  },

  // Login
  // 🔹 Si tu login es MÓDULO, dejá ESTE:
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule)
  },

  // 🔹 Si tu login es STANDALONE, usá ESTE (y borrá el de arriba):
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./pages/login/login.component').then(m => m.LoginComponent)
  // },
  
  // App protegida (Tabs) en /app
  {
    path: 'app',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },

  // Cualquier otra ruta
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
