import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-page/home-page.component').then(c => c.HomePageComponent),
  },
  {
    path: 'favorites',
    loadComponent: () => import('./favorites-page/favorites-page.component').then(c => c.FavoritesPageComponent),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PrivatePageModule {
}