import React, { FormEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/product-data/selectors';
import { Camera } from '../../types/camera';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

const START_LENGTH_OF_SEARCH_QUERY = 3;

export default function SearchForm(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundCameras, setFoundCameras] = useState<Camera[]>([]);

  useEffect(() => {
    if (searchQuery.length >= START_LENGTH_OF_SEARCH_QUERY) {
      setFoundCameras(cameras.filter((camera) =>
        camera.name.toUpperCase().includes(searchQuery.toUpperCase())
      ));
    } else {
      setFoundCameras([]);
    }
  }, [searchQuery, cameras]);

  const handleSearchInputInput = (evt: FormEvent<HTMLInputElement>) => {
    const query = evt.currentTarget.value;
    setSearchQuery(query);
  };

  const handleResetSearchButtonClick = () => {
    setSearchQuery('');
    setFoundCameras([]);
  };

  return (
    <React.Fragment>
      <div className={`form-search ${foundCameras.length > 0 ? 'list-opened' : ''}`}>
        <form onSubmit={(evt) => evt.preventDefault()}>
          <label>
            <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-lens"></use>
            </svg>
            <input
              className="form-search__input"
              type="text" autoComplete="off"
              placeholder="Поиск по сайту"
              value={searchQuery}
              onInput={handleSearchInputInput}
            />
          </label>
          <ul className="form-search__select-list">
            {
              foundCameras.map((camera) =>
                (
                  <li
                    className="form-search__select-item"
                    tabIndex={foundCameras.indexOf(camera)}
                    key={camera.id}
                  >
                    <Link to={`${AppRoute.Product}/${camera.id}`}>
                      {camera.name}
                    </Link>
                  </li>
                )
              )
            }
          </ul>
        </form>
        <button
          className="form-search__reset"
          type="button"
          onClick={handleResetSearchButtonClick}
          style={{ display: searchQuery.length > 0 ? 'flex' : 'none' }} // Управляем видимостью
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
          <span className="visually-hidden">Сбросить поиск</span>
        </button>
      </div>
      {/* <Link className="header__basket-link" to={AppRoute.Basket}>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-basket"></use>
        </svg>
      </Link> */}
    </React.Fragment>
  );
}
