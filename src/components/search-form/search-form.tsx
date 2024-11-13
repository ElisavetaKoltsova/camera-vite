import React, { FormEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/product-data/selectors';
import { Camera } from '../../types/camera';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import './search-form.css';
import { checkSearchQueryInCameras } from '../../utils/list';

const START_LENGTH_OF_SEARCH_QUERY = 3;

export default function SearchForm(): JSX.Element {
  const navigate = useNavigate();

  const cameras = useAppSelector(getCameras);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundCameras, setFoundCameras] = useState<Camera[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (searchQuery.length >= START_LENGTH_OF_SEARCH_QUERY) {
      setFoundCameras(cameras.filter((camera) =>
        checkSearchQueryInCameras(camera, searchQuery)
      ));
      setSelectedIndex(null);
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
    setSelectedIndex(null);
  };

  const handleInputKeyDown = (evt: React.KeyboardEvent) => {
    if (foundCameras.length === 0) {
      return;
    }

    if (evt.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        prevIndex === null || prevIndex === foundCameras.length - 1 ? 0 : prevIndex + 1
      );
    } else if (evt.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0 ? foundCameras.length - 1 : prevIndex - 1
      );
    } else if (evt.key === 'Enter' && selectedIndex !== null) {
      evt.preventDefault();
      const selectedCamera = foundCameras[selectedIndex];
      navigate(`${AppRoute.Product}/${selectedCamera.id}`);
    }
  };

  return (
    <React.Fragment>
      <div
        data-testid="search-from"
        className={`form-search ${foundCameras.length ? 'list-opened' : ''}`}
      >
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
              onKeyDown={handleInputKeyDown}
            />
          </label>
          <ul
            className="form-search__select-list"
            data-testid="search-results"
            data-opened={foundCameras.length > 0}
          >
            {
              foundCameras.map((camera, index) =>
                (
                  <li
                    className={`form-search__select-item ${selectedIndex === index ? 'hover' : ''}`}
                    tabIndex={index}
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
          style={{ display: searchQuery.length ? 'flex' : 'none' }}
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
