import { CameraType, CameraCategory, Sorts } from '../const';
import { Camera } from '../types/camera';
import { makeFakeStore } from './mock';
import { sort } from './sort';

describe('Function: sort', () => {
  const mockCameras = makeFakeStore().PRODUCT.cameras;

  it ('sort: PRICE_LOW_TO_HIGH', () => {
    const expectedSortedCameras: Camera[] = [
      {
        id: 0,
        name: 'Camera1',
        vendorCode: '',
        type: CameraType.digital,
        category: 'Фотоаппарат',
        description: '',
        level: 'Нулевой',
        price: 4990,
        rating: 5,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
      {
        id: 1,
        name: 'Camera2',
        vendorCode: '',
        type: CameraType.film,
        category: 'Фотоаппарат',
        description: '',
        level: 'Профессиональный',
        price: 8990,
        rating: 1,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
      {
        id: 2,
        name: 'Camera3',
        vendorCode: '',
        type: CameraType.collection,
        category: CameraCategory.videocamera,
        description: '',
        level: 'Любительский',
        price: 10990,
        rating: 3,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      }
    ];

    const sortedCameras = sort[Sorts.PRICE_LOW_TO_HIGH]([...mockCameras]);

    expect(expectedSortedCameras).toEqual(sortedCameras);
  });

  it ('sort: PRICE_HIGH_TO_LOW', () => {
    const expectedSortedCameras: Camera[] = [
      {
        id: 2,
        name: 'Camera3',
        vendorCode: '',
        type: CameraType.collection,
        category: CameraCategory.videocamera,
        description: '',
        level: 'Любительский',
        price: 10990,
        rating: 3,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
      {
        id: 1,
        name: 'Camera2',
        vendorCode: '',
        type: CameraType.film,
        category: 'Фотоаппарат',
        description: '',
        level: 'Профессиональный',
        price: 8990,
        rating: 1,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
      {
        id: 0,
        name: 'Camera1',
        vendorCode: '',
        type: CameraType.digital,
        category: 'Фотоаппарат',
        description: '',
        level: 'Нулевой',
        price: 4990,
        rating: 5,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
    ];

    const sortedCameras = sort[Sorts.PRICE_HIGH_TO_LOW]([...mockCameras]);

    expect(expectedSortedCameras).toEqual(sortedCameras);
  });

  it ('sort: POPULAR_HIGH_TO_LOW', () => {
    const expectedSortedCameras: Camera[] = [
      {
        id: 0,
        name: 'Camera1',
        vendorCode: '',
        type: CameraType.digital,
        category: 'Фотоаппарат',
        description: '',
        level: 'Нулевой',
        price: 4990,
        rating: 5,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
      {
        id: 2,
        name: 'Camera3',
        vendorCode: '',
        type: CameraType.collection,
        category: CameraCategory.videocamera,
        description: '',
        level: 'Любительский',
        price: 10990,
        rating: 3,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
      {
        id: 1,
        name: 'Camera2',
        vendorCode: '',
        type: CameraType.film,
        category: 'Фотоаппарат',
        description: '',
        level: 'Профессиональный',
        price: 8990,
        rating: 1,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
    ];

    const sortedCameras = sort[Sorts.POPULAR_HIGH_TO_LOW]([...mockCameras]);

    expect(expectedSortedCameras).toEqual(sortedCameras);
  });

  it ('sort: POPULAR_LOW_TO_HIGH', () => {
    const expectedSortedCameras: Camera[] = [
      {
        id: 1,
        name: 'Camera2',
        vendorCode: '',
        type: CameraType.film,
        category: 'Фотоаппарат',
        description: '',
        level: 'Профессиональный',
        price: 8990,
        rating: 1,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
      {
        id: 2,
        name: 'Camera3',
        vendorCode: '',
        type: CameraType.collection,
        category: CameraCategory.videocamera,
        description: '',
        level: 'Любительский',
        price: 10990,
        rating: 3,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
      {
        id: 0,
        name: 'Camera1',
        vendorCode: '',
        type: CameraType.digital,
        category: 'Фотоаппарат',
        description: '',
        level: 'Нулевой',
        price: 4990,
        rating: 5,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
    ];

    const sortedCameras = sort[Sorts.POPULAR_LOW_TO_HIGH]([...mockCameras]);

    expect(expectedSortedCameras).toEqual(sortedCameras);
  });
});

