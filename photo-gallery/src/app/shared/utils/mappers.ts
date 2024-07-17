import { PhotoModel } from '../interfaces';

export function mapToPhotosData(data: PhotoModel[]): PhotoModel[]{
  return data.map((photo) => {
    return {
      alt_description: photo.alt_description,
      smallUrl: photo.urls['small'],
      id: photo.id,
      urls: photo.urls,
      isFavorite: false
    }
  });
}