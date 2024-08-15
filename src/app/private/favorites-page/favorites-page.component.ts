import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RandomPhotoService } from '../../shared/services/random-photo.service';
import { FavoritePhotoModel } from '../../shared/interfaces';
import { Observable } from 'rxjs';
import { FavoritePhotoService } from '../../shared/services/favorite-photo.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FavoritesPageComponent {
  public favoritePhotos$: Observable<FavoritePhotoModel[]>;

  constructor(private favoritePhotoService: FavoritePhotoService) { 
    this.favoritePhotos$ = this.favoritePhotoService.getFavoritePhotos();
  }
}
