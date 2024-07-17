import { PhotoModel } from "../interfaces";
import { mapToPhotosData } from "./mappers";

const expected: PhotoModel[] = [{ 
  urls: { small: 'd' },
  id: '123',
  smallUrl: 'd',
  alt_description: 'some' 
}];

const dataMock = [{ 
  alt_description: "some",
  blur_hash: "LNG8+YnhVsIUNgxZM{xZ00IooKW=",
  categories: [],
  color: "#a6a6a6",
  created_at: "2021-05-21T11:13:48-04:00",
  current_user_collections: [],
  description: "Creating my Content Creator Icon Pack!\n\nyou can get it from https://nublson.gumroad.com/#nEckj",
  height: 5000,
  urls: { small: 'd' },
  id: '123',
  smallUrl: 'd',
}];

describe('mappers', () => {
  it('should map photo data', () => {
    expect(mapToPhotosData(dataMock)).toEqual(expected);
  });
})