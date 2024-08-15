import { Component, OnDestroy, HostListener } from '@angular/core';
import { Subscription, Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PhotoModel } from '../../shared/interfaces';
import { RandomPhotoService } from '../../shared/services/random-photo.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { InfiniteScrollDirective } from '../../shared/directives/load-more.directive';
import { FavoritePhotoService } from '../../shared/services/favorite-photo.service';

@Component({
  selector: 'private-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [
    MatProgressSpinnerModule, 
    CommonModule, 
    MatTooltipModule, 
    SearchBarComponent, 
    InfiniteScrollDirective
  ],
  standalone: true
})
export class HomePageComponent implements OnDestroy {
  public loader: boolean = false;
  public photoData$: Observable<PhotoModel[]>;

  private currentPage = 1;
  private currentSearchTerm = '';

  private updatedPhotos = new BehaviorSubject<PhotoModel[]>([]);
  private searchPhotos = new BehaviorSubject<PhotoModel[]>([]);
  private initialPhotos = new BehaviorSubject<PhotoModel[]>([]);
  private subscription = new Subscription();

  constructor(
    private photoService: RandomPhotoService,
    private favoritePhotoService: FavoritePhotoService
  ) {
    const initialPhotos$ = this.photoService.createRandomPhotos().pipe(
      map(photos => {
        this.initialPhotos.next(photos);
        return photos;
      })
    );
    this.photoData$ = combineLatest([
      initialPhotos$,
      this.updatedPhotos,
      this.searchPhotos
    ]).pipe(
      map(([photoData, updatedData, searchData]) => {
        return searchData.length > 0 ? searchData : [...photoData, ...updatedData];
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getMore(): void {
    if (this.loader) { return; }

    this.loader = true;
    this.currentPage++;

    this.subscription.add(
      this.photoService.fetchPhotos(this.currentPage, this.currentSearchTerm)
        .subscribe({
          next: data => {
            if (this.currentSearchTerm) {
              this.searchPhotos.next([...this.searchPhotos.value, ...data]);
            } else {
              this.updatedPhotos.next([...this.updatedPhotos.value, ...data]);
            }
            this.loader = false;
          },
          error: () => {
            this.loader = false;
          }
        })
    );
  }

  public addToFavorites(id: string, url: string): void {
    this.subscription.add(
      this.favoritePhotoService.addToFavorites({ id, url }).subscribe()
    )
  }

  public onSearchTermUpdate(searchTerm: string): void {
    this.currentSearchTerm = searchTerm;
    this.currentPage = 1;
    this.searchPhotos.next([]);
    this.updatedPhotos.next([]);

    if (searchTerm.length === 0) {
      this.searchPhotos.next(this.initialPhotos.value);
    } else {
      this.subscription.add(
        this.photoService.onSearch(this.currentSearchTerm, this.currentPage)
          .subscribe({
            next: data => {
              this.searchPhotos.next(data);
              this.loader = false;
            },
            error: () => {
              this.loader = false;
            }
        })
      );
    }
  }
}
