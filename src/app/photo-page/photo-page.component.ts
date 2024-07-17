import { Component } from '@angular/core';
import { RandomPhotoService } from './../shared/services/random-photo.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss'],
  standalone: true,
  imports: [MatCardModule]
})
export class PhotoPageComponent {
  public photoUrl: string = '';

  constructor(private photoService: RandomPhotoService) { 
    this.photoUrl = this.photoService.getPhotoUrl();
  }

  public removePhoto(url: string): void {
    this.photoService.removePhoto(url);
  }
}
