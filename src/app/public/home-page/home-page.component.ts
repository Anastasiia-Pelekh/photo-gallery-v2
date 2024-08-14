import { Component, OnInit, OnDestroy, signal, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PhotoModel } from '../../shared/interfaces';
import { RandomPhotoService } from '../../shared/services/random-photo.service';
import { InfiniteScrollDirective } from '../../shared/directives/load-more.directive';

@Component({
  selector: 'public-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [MatProgressSpinnerModule, CommonModule, MatTooltipModule, InfiniteScrollDirective],
  standalone: true
})
export class HomePageComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  public loader: boolean = false;
  public photoData: PhotoModel[] = [];

  constructor(
    private photoService: RandomPhotoService,
  ) {}

  ngOnInit(): void {
    this.getPhoto();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getPhoto(): void {
    this.subscription = this.photoService.createRandomPhotos()
      .subscribe(data => this.photoData = data);
  }

  public getMore(): void {
    if (this.loader) { return; }

    this.loader = true;

    this.subscription = this.photoService.fetchPhotos()
      .subscribe(data => {
        this.photoData.push(...data);
        this.loader = false;
      })
  }
}
