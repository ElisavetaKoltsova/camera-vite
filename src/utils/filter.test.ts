import { CameraType, CameraLevel, CameraCategory } from '../const';
import { Camera } from '../types/camera';
import { applyFilters, changeFiltersByPrice, filterCategory, filterLevel, filterPrice, filterType } from './filter';
import { makeFakeStore } from './mock';

describe('Test filters', () => {
  const mockCameras = makeFakeStore().PRODUCT.cameras;

  describe('Function: filterPrice', () => {
    it('should filter by price', () => {
      const expectedFilteredCameras: Camera[] = [
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
      ];

      const mockPriceFrom = 4990;
      const mockPriceTo = 8990;

      const filteredCameras = filterPrice([...mockCameras], mockPriceFrom, mockPriceTo);

      expect(expectedFilteredCameras).toEqual(filteredCameras);
    });
  });

  describe('Function: filterCategory', () => {
    it('should filter by photocamera', () => {
      const expectedFilteredCameras: Camera[] = [
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
      ];

      const filteredCameras = filterCategory[CameraCategory.photocamera]([...mockCameras]);

      expect(expectedFilteredCameras).toEqual(filteredCameras);
    });

    it('should filter by videocamera', () => {
      const expectedFilteredCameras: Camera[] = [
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

      const filteredCameras = filterCategory[CameraCategory.videocamera]([...mockCameras]);

      expect(expectedFilteredCameras).toEqual(filteredCameras);
    });
  });

  describe('Function: filterType', () => {
    it('should filter by digital', () => {
      const expectedFilteredCameras: Camera[] = [
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

      const filteredCameras = filterType[CameraType.digital]([...mockCameras]);

      expect(expectedFilteredCameras).toEqual(filteredCameras);
    });

    it('should filter by collection', () => {
      const expectedFilteredCameras: Camera[] = [
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

      const filteredCameras = filterType[CameraType.collection]([...mockCameras]);

      expect(expectedFilteredCameras).toEqual(filteredCameras);
    });

    it('should filter by film', () => {
      const expectedFilteredCameras: Camera[] = [
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

      const filteredCameras = filterType[CameraType.film]([...mockCameras]);

      expect(expectedFilteredCameras).toEqual(filteredCameras);
    });

    it('should filter by snapshot', () => {
      const expectedFilteredCameras: Camera[] = [];

      const filteredCameras = filterType[CameraType.snapshot]([...mockCameras]);

      expect(expectedFilteredCameras).toEqual(filteredCameras);
    });
  });

  describe('Function: filterLevel', () => {
    it('should filter by zero', () => {
      const expectedFilteredCameras: Camera[] = [
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

      const filteredCameras = filterLevel[CameraLevel.Нулевой]([...mockCameras]);

      expect(expectedFilteredCameras).toEqual(filteredCameras);
    });
  });

  it('should filter by non-professional', () => {
    const expectedFilteredCameras: Camera[] = [
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

    const filteredCameras = filterLevel[CameraLevel.Любительский]([...mockCameras]);

    expect(expectedFilteredCameras).toEqual(filteredCameras);
  });

  it('should filter by professional', () => {
    const expectedFilteredCameras: Camera[] = [
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

    const filteredCameras = filterLevel[CameraLevel.Профессиональный]([...mockCameras]);

    expect(expectedFilteredCameras).toEqual(filteredCameras);
  });
});

describe('Function: applyFilters', () => {
  const mockCameras = makeFakeStore().PRODUCT.cameras;

  it('should return filtered cameras', () => {
    const expectedFilteredCameras = [
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

    const filteredCameras = applyFilters(
      mockCameras,
      CameraCategory.photocamera,
      [CameraType.film],
      [CameraLevel.Профессиональный]
    );

    expect(expectedFilteredCameras).toEqual(filteredCameras);
  });
});

describe('Function: changeFiltersByPrice', () => {
  const mockCameras = makeFakeStore().PRODUCT.cameras;

  it('should change filters by price', () => {
    const expectedFilteredCameras = [
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
    ];

    const mockPriceFrom = 2000;
    const mockPriceTo = 9000;

    const expectedPriceFrom = 4990;
    const expectedPriceTo = 8990;

    const {filteredCameras, priceFrom, priceTo} = changeFiltersByPrice(
      mockCameras,
      mockPriceFrom,
      mockPriceTo
    );

    expect(expectedFilteredCameras).toEqual(filteredCameras);
    expect(expectedPriceFrom).toEqual(priceFrom);
    expect(expectedPriceTo).toEqual(priceTo);
  });
});
