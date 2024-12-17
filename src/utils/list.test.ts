import { CameraCategory, CameraLevel, CameraType, PRICE_FROM } from '../const';
import { Camera } from '../types/camera';
import { calculateDiscount, checkSearchQueryInCameras, convertNumberIntoMoneyFormat, findMaximalPrice, findMinimalPrice, formatDateToDayMonth, formatDateToYearMonthDay, sortByAscendingPrice, sortByAscendingRating, sortByDescendingPrice, sortByDescendingRating, sortReviewsByDate } from './list';
import { makeFakeCameras, makeFakeReviews, makeFakeStore } from './mock';

describe('Function: convertNumberIntoMoneyFormat', () => {
  it('should return "10 000" when I send "10000"', () => {
    const mockElement = 10000;
    const expectedElement = '10\u00A0000';
    const convertedMockElement = convertNumberIntoMoneyFormat(mockElement);

    expect(expectedElement).toEqual(convertedMockElement);
  });
});

describe('Function: formatDateToYearMonthDay', () => {
  it('should return "2024-03-13" when I send "28.10.2024"', () => {
    const mockDate = '2024-03-13T10:05:34.532Z';
    const expectedDate = '2024-03-13';
    const formattedMockDate = formatDateToYearMonthDay(mockDate);

    expect(expectedDate).toEqual(formattedMockDate);
  });
});

describe('Function: formatDateToDayMonth', () => {
  it('should return "13 марта" when I send "28.10.2024"', () => {
    const mockDate = '2024-03-13T10:05:34.532Z';
    const expectedDate = '13 марта';
    const formattedMockDate = formatDateToDayMonth(mockDate);

    expect(expectedDate).toEqual(formattedMockDate);
  });
});

describe('Function: sortReviewsByDate', () => {
  const COUNT_OF_REVIEWS = 10;

  it('should return "true" when reviews differ', () => {
    const mockReviews = makeFakeReviews(COUNT_OF_REVIEWS);
    const sortedMockReviews = mockReviews.sort(sortReviewsByDate);
    const result = mockReviews.every((value, index) => value === sortedMockReviews[index]);

    expect(result).toBe(true);
  });

  it('should return "false" when reviews are no differ', () => {
    const mockReviews = makeFakeReviews(COUNT_OF_REVIEWS);
    const sortedMockReviews = mockReviews.sort(sortReviewsByDate);
    const result = mockReviews.every((value, index) => value !== sortedMockReviews[index]);

    expect(result).toBe(false);
  });
});

describe('Function: sortByDescendingPrice', () => {
  const COUNT_OF_CAMERAS = 10;

  it('should return "true" when cameras differ', () => {
    const mockCameras = makeFakeCameras(COUNT_OF_CAMERAS);
    const sortedMockCameras = mockCameras.sort(sortByDescendingPrice);
    const result = mockCameras.every((value, index) => value === sortedMockCameras[index]);

    expect(result).toBe(true);
  });

  it('should return "false" when cameras are no differ', () => {
    const mockCameras = makeFakeCameras(COUNT_OF_CAMERAS);
    const sortedMockCameras = mockCameras.sort(sortByDescendingPrice);
    const result = mockCameras.every((value, index) => value !== sortedMockCameras[index]);

    expect(result).toBe(false);
  });
});

describe('Function: sortByAscendingPrice', () => {
  const COUNT_OF_CAMERAS = 10;

  it('should return "true" when cameras differ', () => {
    const mockCameras = makeFakeCameras(COUNT_OF_CAMERAS);
    const sortedMockCameras = mockCameras.sort(sortByAscendingPrice);
    const result = mockCameras.every((value, index) => value === sortedMockCameras[index]);

    expect(result).toBe(true);
  });

  it('should return "false" when cameras are no differ', () => {
    const mockCameras = makeFakeCameras(COUNT_OF_CAMERAS);
    const sortedMockCameras = mockCameras.sort(sortByAscendingPrice);
    const result = mockCameras.every((value, index) => value !== sortedMockCameras[index]);

    expect(result).toBe(false);
  });
});

describe('Function: sortByDescendingRating', () => {
  const COUNT_OF_CAMERAS = 10;

  it('should return "true" when cameras differ', () => {
    const mockCameras = makeFakeCameras(COUNT_OF_CAMERAS);
    const sortedMockCameras = mockCameras.sort(sortByDescendingRating);
    const result = mockCameras.every((value, index) => value === sortedMockCameras[index]);

    expect(result).toBe(true);
  });

  it('should return "false" when cameras are no differ', () => {
    const mockCameras = makeFakeCameras(COUNT_OF_CAMERAS);
    const sortedMockCameras = mockCameras.sort(sortByDescendingRating);
    const result = mockCameras.every((value, index) => value !== sortedMockCameras[index]);

    expect(result).toBe(false);
  });
});

describe('Function: sortByAscendingRating', () => {
  const COUNT_OF_CAMERAS = 10;

  it('should return "true" when cameras differ', () => {
    const mockCameras = makeFakeCameras(COUNT_OF_CAMERAS);
    const sortedMockCameras = mockCameras.sort(sortByAscendingRating);
    const result = mockCameras.every((value, index) => value === sortedMockCameras[index]);

    expect(result).toBe(true);
  });

  it('should return "false" when cameras are no differ', () => {
    const mockCameras = makeFakeCameras(COUNT_OF_CAMERAS);
    const sortedMockCameras = mockCameras.sort(sortByAscendingRating);
    const result = mockCameras.every((value, index) => value !== sortedMockCameras[index]);

    expect(result).toBe(false);
  });
});

describe('Function: findMinimalPrice', () => {
  const store = makeFakeStore();

  it('should return minimal price', () => {
    const expectedPrice = 4990;
    const mockCameras = store.PRODUCT.cameras;
    const minPrice = findMinimalPrice(mockCameras);

    expect(minPrice).toEqual(expectedPrice);
  });

  it('should return default price when there are no cameras', () => {
    const mockCameras: Camera[] = [];
    const minPrice = findMinimalPrice(mockCameras);

    expect(minPrice).toEqual(PRICE_FROM);
  });
});

describe('Function: findMaximalPrice', () => {
  const store = makeFakeStore();

  it('should return minimal price', () => {
    const expectedPrice = 10990;
    const mockCameras = store.PRODUCT.cameras;
    const maxPrice = findMaximalPrice(mockCameras);

    expect(maxPrice).toEqual(expectedPrice);
  });

  it('should return default price when there are no cameras', () => {
    const mockCameras: Camera[] = [];
    const maxPrice = findMaximalPrice(mockCameras);

    expect(maxPrice).toEqual(PRICE_FROM);
  });
});

describe('Function: checkSearchQueryInCameras', () => {
  const camera: Camera = {
    id: 0,
    name: 'Camera Name',
    vendorCode: '',
    type: CameraType.collection,
    category: CameraCategory.photocamera,
    description: '',
    level: CameraLevel.Любительский,
    price: 0,
    rating: 0,
    reviewCount: 0,
    previewImg: '',
    previewImg2x: '',
    previewImgWebp: '',
    previewImgWebp2x: ''
  };

  it('should return true when there is camera', () => {
    const expectedNameOfCamera = 'Camera Name';
    const result = checkSearchQueryInCameras(camera, expectedNameOfCamera);

    expect(result).toEqual(true);
  });

  it('should return false when there is no camera', () => {
    const expectedNameOfCamera = 'Camera Pro';
    const result = checkSearchQueryInCameras(camera, expectedNameOfCamera);

    expect(result).toEqual(false);
  });
});

describe('Function: calculateDiscount', () => {
  it('should return "0" when there are not cameras in basket', () => {
    const expectedDiscount = 0;
    const cameras = [];
    const totalPrice = 0;
    const couponDiscount = 0;

    const result = calculateDiscount(cameras.length, totalPrice, couponDiscount);

    expect(result).toEqual(expectedDiscount);
  });

  it('should return "3" when there are 2 cameras in basket', () => {
    const expectedDiscount = 3;
    const cameras = makeFakeCameras(2);
    const totalPrice = 2000;
    const couponDiscount = 0;

    const result = 100 - calculateDiscount(cameras.length, totalPrice, couponDiscount) * 100 / totalPrice;

    expect(result).toEqual(expectedDiscount);
  });

  it('should return "5" when there are 3-5 cameras in basket', () => {
    const expectedDiscount = 5;
    const cameras = makeFakeCameras(4);
    const totalPrice = 5000;
    const couponDiscount = 0;

    const result = 100 - calculateDiscount(cameras.length, totalPrice, couponDiscount) * 100 / totalPrice;

    expect(result).toEqual(expectedDiscount);
  });

  it('should return "10" when there are 6-10 cameras in basket', () => {
    const expectedDiscount = 10;
    const cameras = makeFakeCameras(7);
    const totalPrice = 8000;
    const couponDiscount = 0;

    const result = 100 - calculateDiscount(cameras.length, totalPrice, couponDiscount) * 100 / totalPrice;

    expect(result).toEqual(expectedDiscount);
  });

  it('should return "15" when there are >10 cameras in basket', () => {
    const expectedDiscount = 15;
    const cameras = makeFakeCameras(11);
    const totalPrice = 9000;
    const couponDiscount = 0;

    const result = 100 - calculateDiscount(cameras.length, totalPrice, couponDiscount) * 100 / totalPrice;

    expect(result).toEqual(expectedDiscount);
  });

  it('should return "14" when there are >10 cameras in basket and total price >10000', () => {
    const expectedDiscount = 14;
    const cameras = makeFakeCameras(11);
    const totalPrice = 11000;
    const couponDiscount = 0;

    const result = 100 - calculateDiscount(cameras.length, totalPrice, couponDiscount) * 100 / totalPrice;

    expect(result).toEqual(expectedDiscount);
  });

  it('should return "13" when there are >10 cameras in basket and total price >20000', () => {
    const expectedDiscount = 13;
    const cameras = makeFakeCameras(11);
    const totalPrice = 22000;
    const couponDiscount = 0;

    const result = 100 - calculateDiscount(cameras.length, totalPrice, couponDiscount) * 100 / totalPrice;

    expect(result).toEqual(expectedDiscount);
  });

  it('should return "12" when there are >10 cameras in basket and total price >30000', () => {
    const expectedDiscount = 12;
    const cameras = makeFakeCameras(11);
    const totalPrice = 33000;
    const couponDiscount = 0;

    const result = 100 - calculateDiscount(cameras.length, totalPrice, couponDiscount) * 100 / totalPrice;

    expect(result).toEqual(expectedDiscount);
  });

  it('should return "30" when there are >10 cameras in basket and total price >30000 and coupon', () => {
    const expectedDiscount = 30;
    const cameras = makeFakeCameras(11);
    const totalPrice = 33000;
    const couponDiscount = 18;

    const result = 100 - calculateDiscount(cameras.length, totalPrice, couponDiscount) * 100 / totalPrice;

    expect(result).toEqual(expectedDiscount);
  });
});
