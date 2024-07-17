import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { PhotoModel } from '../interfaces';

import { RandomPhotoService } from './random-photo.service';

const photoDataMock: PhotoModel[] = [{ 
  urls: { small: 'd' },
  id: '123',
  smallUrl: 'url' 
}];

describe('RandomPhotoService', () => {
  let http: HttpClient;
  let snackBar: MatSnackBar;
  let service: RandomPhotoService;

  beforeEach(() => {
    service = new RandomPhotoService(http, snackBar);
  })

  it('should fetch photo data', () => {
    const spy = spyOn(service, 'fetchPhotos').and.returnValue(of(photoDataMock));

    service.fetchPhotos();

    expect(spy).toHaveBeenCalled();
  }); 

  it('should get photo url', () => {
    const urlMock = 'test';

    service.setPhotoUrl(urlMock);
    
    expect(service.getPhotoUrl()).toBe(urlMock);
  });
});
