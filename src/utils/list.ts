import { months } from '../const';
import { Review } from '../types/review';

export const convertNumberIntoMoneyFormat = (value: number) => Math.round(value).toLocaleString('ru-RU');

export const formatDateToYearMonthDay = (oldDate: string) => {
  const date = new Date(oldDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateToDayMonth = (oldDate: string) => {
  const date = new Date(oldDate);

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
};

export const navigateToUpOfPage = () => {
  window.scrollTo(0, 0);
};

export const sortReviewsByDate = (reviewA: Review, reviewB: Review) => new Date(reviewB.createAt).getTime() - new Date(reviewA.createAt).getTime();
