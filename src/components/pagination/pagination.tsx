import { Link, useSearchParams } from 'react-router-dom';
import { FormEvent } from 'react';
import { URLParam } from '../../const';

type PaginationProps = {
  currentPage: number;
  countOfPage: number;
}

export default function Pagination({currentPage, countOfPage}: PaginationProps): JSX.Element {
  const [, setSearchParams] = useSearchParams();
  const BASE_COUNT_OF_PAGE = 3;
  const BASE_PAGE = 1;

  const startOfPagination = Math.floor((currentPage - BASE_PAGE) / BASE_COUNT_OF_PAGE) * BASE_COUNT_OF_PAGE + BASE_PAGE;
  const endOfPagination = Math.min(startOfPagination + BASE_COUNT_OF_PAGE - BASE_PAGE, countOfPage);

  const currentPages = Array.from(
    { length: endOfPagination - startOfPagination + BASE_PAGE },
    (_, index) => startOfPagination + index
  );

  const handlePaginationClick = (pageNumber: number, evt: FormEvent<HTMLElement>) => {
    evt.preventDefault();

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set(URLParam.Page, pageNumber.toString());
      return params;
    });
  };

  return (
    <div className="pagination" data-testid="pagination">
      <ul className="pagination__list">
        {
          startOfPagination < BASE_COUNT_OF_PAGE
            ? ''
            :
            <li className="pagination__item">
              <Link
                className="pagination__link pagination__link--text"
                to='#'
                onClick={(evt) => handlePaginationClick(currentPage - BASE_PAGE, evt)}
                data-testid="back"
              >
                Назад
              </Link>
            </li>
        }
        {
          currentPages.length === BASE_PAGE && currentPages[0] === BASE_PAGE
            ? ''
            :
            currentPages.map((page) => (
              <li className="pagination__item" key={page}>
                <Link
                  className={`pagination__link ${currentPage === page ? 'pagination__link--active' : ''}`}
                  to='#'
                  onClick={(evt) => handlePaginationClick(page, evt)}
                >
                  {page}
                </Link>
              </li>
            ))
        }
        {
          countOfPage <= endOfPagination
            ? ''
            :
            <li className="pagination__item">
              <Link
                className="pagination__link pagination__link--text"
                to='#'
                onClick={(evt) => handlePaginationClick(currentPage + BASE_PAGE, evt)}
                data-testid="next"
              >
                Далее
              </Link>
            </li>
        }
      </ul>
    </div>
  );
}
