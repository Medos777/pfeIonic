import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'addcollecte',
    loadChildren: () => import('./Collecte/add-collecte/add-collecte.module').then( m => m.AddCollectePageModule)
  },
  {
    path: 'lcollecte',
    loadChildren: () => import('./Collecte/lcollecte/lcollecte.module').then( m => m.LcollectePageModule)
  },
  {
    path: 'collectes',
    loadChildren: () => import('./Collecte/list-collecte/list-collecte.module').then( m => m.ListCollectePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./User/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'suivi',
    loadChildren: () => import('./Suivie/suivi/suivi.module').then( m => m.SuiviPageModule)
  },
 
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
