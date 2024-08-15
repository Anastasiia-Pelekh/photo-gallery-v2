import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { filter, from, map, merge, Observable, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { FavoritePhotoModel } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FavoritePhotoService {  
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  public addToFavorites(photo: FavoritePhotoModel): Observable<void> {
    return this.authService.user$.pipe(
      filter(Boolean),
      switchMap(user => {
        return from(this.firestore.collection('favoritePhotos')
          .doc(user.uid)
          .set({
            photos: firebase.firestore.FieldValue.arrayUnion(photo)
          }, { merge: true })
        );
      })
    )
  }

  public removeFromFavorites(photo: FavoritePhotoModel): Observable<void> {
    return this.authService.user$.pipe(
      filter(Boolean),
      switchMap(user => {
        return from(this.firestore.collection('favoritePhotos')
          .doc(user.uid)
          .set({
            photos: firebase.firestore.FieldValue.arrayRemove(photo)
          })
        );
      })
    )
  }

  public getFavoritePhotos(): Observable<FavoritePhotoModel[]> {
    return this.authService.user$.pipe(
      filter(Boolean),
      switchMap(user => {
        return from(this.firestore.collection('favoritePhotos')
          .doc(user.uid)
          .valueChanges()
          .pipe(
            map((data: any) => data?.photos ?? [])
          )
        );
      })
    )
  }
}
