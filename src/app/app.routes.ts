import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PhotoPageComponent } from './photo-page/photo-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: 'photos/:id', component: PhotoPageComponent },
  { path: '**', redirectTo: '/'},
];
