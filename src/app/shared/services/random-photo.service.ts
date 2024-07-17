import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { mapToPhotosData } from '../utils/mappers';
import { FavoritePhotoModel, PhotoModel } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Messages } from '../messages.enum';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RandomPhotoService {
  protected photoUrl: string = '';
  
  constructor(
    private http: HttpClient,
    private matSnackBar: MatSnackBar
  ) { }

  public createRandomPhotos(): Observable<PhotoModel[]> {
    return this.http.get<PhotoModel[]>(`https://api.unsplash.com/photos/?&client_id=${environment.apiKey}`).pipe(
      map(photoData => mapToPhotosData(photoData))
    );
  }

  public fetchPhotos(): Observable<PhotoModel[]> {
    return this.http.get<PhotoModel[]>(`https://api.unsplash.com/photos/random?count=10&client_id=${environment.apiKey}`).pipe(
      delay(300),
      map(photoData => mapToPhotosData(photoData))
    );
  }

  public addToFavorites(id: string, url: string): void {
    const storagePhotos: FavoritePhotoModel[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    let shouldAddPhoto: boolean = true;

    if (storagePhotos.length) {
      storagePhotos.forEach(photo => {
        if (photo.id === id) {
          this.setSnackBarMessage(Messages.againAdd);
          shouldAddPhoto = false;
        }
      })
    }

    if (shouldAddPhoto || !storagePhotos.length) {
      storagePhotos.push({id: id, url: url});
      localStorage.setItem('favorites', JSON.stringify(storagePhotos));
      this.setSnackBarMessage(Messages.addPhoto);
    }
  }

  public setPhotoUrl(url: string): void {
    localStorage.setItem('photo-url', url);
  }
  
  public setSnackBarMessage(message: string): void {
    this.matSnackBar?.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 3000,
    })
  }

  public removePhoto(url: string): void {
    let storagePhotos: FavoritePhotoModel[] = JSON.parse(localStorage.getItem('favorites')!);

    storagePhotos = storagePhotos.filter(photo => photo.url !== url);

    localStorage.setItem('favorites', JSON.stringify(storagePhotos));
    history.back();
    this.setSnackBarMessage(Messages.deletePhoto);
  }

  public getPhotoUrl(): string {
    const photoUrl = localStorage.getItem('photo-url');
    
    return photoUrl ? photoUrl : '';
  }

  public getFavoritePhotos(): FavoritePhotoModel[] { 
    const photos = localStorage.getItem('favorites');
    
    return photos ? JSON.parse(photos) : [];
  }
}
