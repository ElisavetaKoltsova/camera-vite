import { convertNumberIntoMoneyFormat, formatDateToDayMonth, formatDateToYearMonthDay, sortReviewsByDate } from './list';
import { makeFakeReviews } from './mock';

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

  it('should return "true" when offers differ', () => {
    const mockReviews = makeFakeReviews(COUNT_OF_REVIEWS);
    const sortedMockReviews = mockReviews.sort(sortReviewsByDate);
    const result = mockReviews.every((value, index) => value === sortedMockReviews[index]);

    expect(result).toBe(true);
  });

  it('should return "false" when offers are no differ', () => {
    const mockReviews = makeFakeReviews(COUNT_OF_REVIEWS);
    const sortedMockReviews = mockReviews.sort(sortReviewsByDate);
    const result = mockReviews.every((value, index) => value !== sortedMockReviews[index]);

    expect(result).toBe(false);
  });
});
