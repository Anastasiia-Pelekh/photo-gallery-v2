import { Component } from '@angular/core';
import { RandomPhotoService } from './../shared/services/random-photo.service';
import { FavoritePhotoModel } from '../shared/interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FavoritesPageComponent {
  public favoritePhotos: FavoritePhotoModel[] = [];

  constructor(private photoService: RandomPhotoService) { 
    this.favoritePhotos = this.photoService.getFavoritePhotos();
  }

  public setPhotoUrl(url: string): void {
    this.photoService.setPhotoUrl(url);
  }
}
