import { Routes } from '@angular/router';
import { PublicPageLayoutComponent } from './public/public-page-layout/public-layout-page.component';
import { PrivatePageLayoutComponent } from './private/private-layout-page/private-layout-page.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '',
    component: PublicPageLayoutComponent,
    loadChildren: () => import('./public/public-page.module').then(m => m.PublicPageModule),
  },
  {
    path: 'home',
    component: PrivatePageLayoutComponent,
    loadChildren: () => import('./private/private-page.module').then(m => m.PrivatePageModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home' },
];
