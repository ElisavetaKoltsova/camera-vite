import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSort } from '../../store/product-data/selectors';
import { SortOrder, SortType } from '../../const';
import { sortCameras } from '../../store/product-data/product-data';

export default function CatalogSort(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(getSort);

  const [sortType, setSortType] = useState(currentSort.split(' ')[0]);
  const [sortOrder, setSortOrder] = useState(currentSort.split(' ')[1]);

  useEffect(() => {
    dispatch(sortCameras(`${sortType} ${sortOrder}`));
  }, [dispatch, sortType, sortOrder]);

  const handleSortInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const checkedSort = evt.currentTarget.id;

    if (checkedSort === SortType.PRICE || checkedSort === SortType.POPULAR) {
      setSortType(checkedSort);
      dispatch(sortCameras(`${checkedSort} ${sortOrder}`));
    } else if (checkedSort === SortOrder.UP || checkedSort === SortOrder.DOWN) {
      setSortOrder(checkedSort);
      dispatch(sortCameras(`${sortType} ${checkedSort}`));
    }
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title&#45;&#45;h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
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
