import { Component, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FavoritePhotoService } from '../../shared/services/favorite-photo.service';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss'],
  standalone: true,
  imports: [MatCardModule, CommonModule]
})
export class PhotoPageComponent implements OnDestroy {
  public photoUrl$: Observable<string>;

  private photoId$: Observable<string>;
  private readonly subscription = new Subscription();

  constructor(
    private favoritePhotoService: FavoritePhotoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.photoId$ = this.route.params.pipe(map(params => params['id']));

    this.photoUrl$ = this.photoId$.pipe(
      switchMap(id => this.favoritePhotoService.getPhotoUrl(id))
    )
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removePhoto(url: string): void {
    this.subscription.add(
      this.photoId$
        .pipe(
          switchMap(id => this.favoritePhotoService.removeFromFavorites({ id, url }))
        ).subscribe(() => {
          this.router.navigate(['home/favorites']);
        })
    );
  }
}
