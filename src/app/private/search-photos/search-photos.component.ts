import { Component } from '@angular/core';
import { RandomPhotoService } from '../../shared/services/random-photo.service';
import { Subscription } from 'rxjs';
import { PhotoModel } from '../../shared/interfaces';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-photo',
  templateUrl: './search-photos.component.html',
  styleUrls: ['./search-photos.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  standalone: true
})
export class SearchPhotoComponent {
  searchTerm: string = '';
  photos: PhotoModel[] = [];

  private subscription = new Subscription();

  constructor(private randomPhotoService: RandomPhotoService) {}

  public onSearch(): void {
    if (this.searchTerm.trim()) {
      this.subscription.add(this.randomPhotoService.onSearch(this.searchTerm).subscribe(photos => {
        this.photos = photos;
      }))
    } else {
      this.photos = [];
    }
  }
}
