import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-page/home-page.component').then(c => c.HomePageComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth-page/auth.component').then(c => c.AuthComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth-page/auth.component').then(c => c.AuthComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PublicPageModule {
}