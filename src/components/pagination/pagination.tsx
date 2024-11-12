import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type PaginationProps = {
  currentPage: number;
  countOfPage: number;
}

export default function Pagination({currentPage, countOfPage}: PaginationProps): JSX.Element {
  const BASE_COUNT_OF_PAGE = 3;

  const startOfPagination = Math.floor((currentPage - 1) / BASE_COUNT_OF_PAGE) * BASE_COUNT_OF_PAGE + 1;
  const endOfPagination = Math.min(startOfPagination + BASE_COUNT_OF_PAGE - 1, countOfPage);

  const currentPages = Array.from(
    { length: endOfPagination - startOfPagination + 1 },
    (_, index) => startOfPagination + index
  );

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          startOfPagination < BASE_COUNT_OF_PAGE
            ? ''
            :
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--text" to={`${AppRoute.Page}${currentPage - 1}`}>Назад</Link>
            </li>
        }
        {
          currentPages.map((page) => (
            <li className="pagination__item" key={page}>
              <Link className={`pagination__link ${currentPage === page ? 'pagination__link--active' : ''}`} to={`${AppRoute.Page}${page}`}>{page}</Link>
            </li>
          ))
        }

        {/* <li className="pagination__item">
          <Link className="pagination__link" to="2">2</Link>
        </li>
        <li className="pagination__item">
          <Link className="pagination__link" to="3">3</Link>
        </li> */}
        {
          countOfPage <= endOfPagination
            ? ''
            :
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--text" to={`${AppRoute.Page}${currentPage + 1}`}>Далее</Link>
            </li>
        }
      </ul>
    </div>
  );
}
