import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSort } from '../../store/product-data/selectors';
import { SortOrder, Sorts, SortType, URLParam } from '../../const';
import { sortCameras } from '../../store/product-data/product-data';
import { useSearchParams } from 'react-router-dom';

export default function CatalogSort(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(getSort);

  const [searchParams, setSearchParams] = useSearchParams();

  const urlSort = searchParams.get(URLParam.Sort) || Sorts.PRICE_LOW_TO_HIGH;
  const isCorrectUrl = Object.values(Sorts).includes(urlSort);

  const [sortType, setSortType] = useState(currentSort.split(' ')[0]);
  const [sortOrder, setSortOrder] = useState(currentSort.split(' ')[1]);

  useEffect(() => {
    dispatch(sortCameras(`${sortType} ${sortOrder}`));
  }, [dispatch, sortType, sortOrder]);

  useEffect(() => {
    if (isCorrectUrl) {
      const [urlSortType, urlSortOrder] = urlSort.split(' ');

      if (urlSortType !== sortType || urlSortOrder !== sortOrder) {
        setSortType(urlSortType);
        setSortOrder(urlSortOrder);
      }
    }
  }, [urlSort, sortType, sortOrder, isCorrectUrl]);

  const handleSortInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const checkedSort = evt.currentTarget.id;

    if (checkedSort === SortType.PRICE || checkedSort === SortType.POPULAR) {
      const dispatchedSort = `${checkedSort} ${sortOrder}`;

      setSortType(checkedSort);
      dispatch(sortCameras(dispatchedSort));

      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams);
        params.set(URLParam.Sort, dispatchedSort);
        return params;
      });
    } else if (checkedSort === SortOrder.UP || checkedSort === SortOrder.DOWN) {
      const dispatchedSort = `${sortType} ${checkedSort}`;

      setSortOrder(checkedSort);
      dispatch(sortCameras(dispatchedSort));

      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams);
        params.set(URLParam.Sort, dispatchedSort);
        return params;
      });
    }
  };

  return (
    <div className="catalog-sort" data-testid="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title&#45;&#45;h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                data-testid="by-price"
                type="radio"
                id="sortPrice"
                name="sort"
                checked={sortType === SortType.PRICE}
                onChange={handleSortInputChange}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                data-testid="by-popular"
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortType === SortType.POPULAR}
                onChange={handleSortInputChange}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn&#45;&#45;up">
              <input
                data-testid="up"
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={sortOrder === SortOrder.UP}
                onChange={handleSortInputChange}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn&#45;&#45;down">
              <input
                data-testid="down"
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={sortOrder === SortOrder.DOWN}
                onChange={handleSortInputChange}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
