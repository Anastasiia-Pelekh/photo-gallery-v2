import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, count, delay, map, Observable, tap } from 'rxjs';
import { mapToPhotosData } from '../utils/mappers';
import { FavoritePhotoModel, PhotoModel } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Messages } from '../messages.enum';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class RandomPhotoService {
  protected photoUrl: string = '';

  private unsplashAPI = 'https://api.unsplash.com';
  
  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  public createRandomPhotos(currentPage = 1): Observable<PhotoModel[]> {
    return this.http.get<PhotoModel[]>(`${this.unsplashAPI}/photos`, {
      params: {
        client_id: environment.apiKey,
        page: currentPage.toString()
      }
    }).pipe(
      map(photoData => mapToPhotosData(photoData))
    );
  }

  public fetchPhotos(currentPage = 1, searchTerm?: string): Observable<PhotoModel[]> {
    if (searchTerm?.length) {
      return this.onSearch(searchTerm, currentPage);
    }
    return this.http.get<PhotoModel[]>(`${this.unsplashAPI}/photos/random`, {
      params: {
        client_id: environment.apiKey,
        count: 10,
        page: currentPage.toString()
      }
    }).pipe(
      delay(300),
      map(photoData => mapToPhotosData(photoData))
    );
  }

  public onSearch(searchTerm: string, currentPage: number = 1): Observable<PhotoModel[]> {
    return this.http.get<any>(`${this.unsplashAPI}/search/photos`, {
      params: {
        client_id: environment.apiKey,
        query: searchTerm,
        page: currentPage.toString()
      }
    }).pipe(
        map(searchData => mapToPhotosData(searchData.results))
      )
  }
}
