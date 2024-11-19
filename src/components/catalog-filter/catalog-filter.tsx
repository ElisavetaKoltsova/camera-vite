import { FormEvent, useEffect, useState } from 'react';
import { CameraCategory, CameraFilterPrice, CameraLevel, CameraType, PRICE_FROM, PRICE_TO, URLParam } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterCamerasCategory, filterCamerasLevel, filterCamerasPrice, filterCamerasType, resetFilters } from '../../store/product-data/product-data';
import { getCameras, getFilteredCameras } from '../../store/product-data/selectors';
import { findMinimalPrice, findMaximalPrice } from '../../utils/list';
import { useDebounce } from 'use-debounce';
import { filterPrice } from '../../utils/filter';
import { useSearchParams } from 'react-router-dom';

type CatalogFilterProps = {
  priceFromParam: number;
  priceToParam: number;
  categoryFilter: CameraCategory | null;
  typeFilters: CameraType[];
  levelFilters: CameraLevel[];
}

const DEBOUNCE_TIMEOUT = 1000;

export default function CatalogFilter({priceFromParam, priceToParam, categoryFilter, typeFilters, levelFilters}: CatalogFilterProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  const cameras = useAppSelector(getCameras);
  const filteredCameras = useAppSelector(getFilteredCameras);

  const [priceFrom, setPriceFrom] = useState<number>(priceFromParam);
  const [priceTo, setPriceTo] = useState<number>(priceToParam);

  const [debouncedPriceFrom] = useDebounce(priceFrom, DEBOUNCE_TIMEOUT);
  const [debouncedPriceTo] = useDebounce(priceTo, DEBOUNCE_TIMEOUT);

  const minPrice = findMinimalPrice(cameras);
  const maxPrice = findMaximalPrice(cameras);

  const price: number | string = priceFrom !== PRICE_FROM ? priceFrom : '';
  const priceUp: number | string = priceTo !== PRICE_TO ? priceTo : '';

  // why category saved
  console.log(categoryFilter, typeFilters, levelFilters)

  useEffect(() => {
    setPriceFrom(priceFromParam);
    setPriceTo(priceToParam);
  }, [priceFromParam, priceToParam]);

  useEffect(() => {
    if (categoryFilter || typeFilters.length || levelFilters.length) {
      setPriceFrom(findMinimalPrice(filterPrice(filteredCameras, priceFrom, priceTo)));
      setPriceTo(findMaximalPrice(filterPrice(filteredCameras, priceFrom, priceTo)));
    } else {
      setPriceFrom(minPrice);
      setPriceTo(maxPrice);
    }
  }, [categoryFilter, typeFilters, levelFilters, filteredCameras, priceFrom, priceTo, minPrice, maxPrice]);

  useEffect(() => {
    if (debouncedPriceFrom <= debouncedPriceTo) {
      dispatch(filterCamerasPrice({ priceFrom: debouncedPriceFrom, priceTo: debouncedPriceTo }));
      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams);
        params.set(URLParam.PriceFrom, debouncedPriceFrom.toString());
        params.set(URLParam.PriceTo, debouncedPriceTo.toString());
        return params;
      });
    }
  }, [debouncedPriceFrom, debouncedPriceTo, dispatch, setSearchParams]);

  const handleFilterPriceInputInput = (evt: FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    const numericValue = Number(value) || 0;

    if (name === CameraFilterPrice.From) {
      setPriceFrom(Math.max(minPrice, Math.min(numericValue, priceTo)));
    }
    if (name === CameraFilterPrice.To) {
      setPriceTo(Math.max(priceFrom, Math.min(numericValue, maxPrice)));
    }
  };

  const handleFilterCategoryInputChange = (category: CameraCategory) => {
    if (category === CameraCategory.videocamera) {
      const updatedTypes: CameraType[] =
        typeFilters.filter((type) =>
          type !== CameraType.film && type !== CameraType.snapshot
        );

      dispatch(filterCamerasType(updatedTypes));
    }

    dispatch(filterCamerasCategory(category));
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set(URLParam.FilterOfCategory, category);
      return params;
    });
  };

  const handleFilterTypeInputChange = (type: CameraType) => {
    const updatedTypes =
      typeFilters.includes(type)
        ? typeFilters.filter((t) => t !== type)
        : [...typeFilters, type];

    dispatch(filterCamerasType(updatedTypes));

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set(URLParam.FilterOfTypes, updatedTypes.join(' '));
      return params;
    });
  };

  const handleFilterLevelInputChange = (level: CameraLevel) => {

    const updatedLevels =
      levelFilters.includes(level)
        ? levelFilters.filter((l) => l !== level)
        : [...levelFilters, level];

    dispatch(filterCamerasLevel(updatedLevels));

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set(URLParam.FilterOfLevels, updatedLevels.join(' '));
      return params;
    });
  };

  const handleResetFiltersButtonClick = () => {
    setPriceFrom(minPrice);
    setPriceTo(maxPrice);
    dispatch(resetFilters());

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.delete(URLParam.FilterOfCategory);
      params.delete(URLParam.FilterOfTypes);
      params.delete(URLParam.FilterOfLevels);
      params.set(URLParam.PriceFrom, minPrice.toString());
      params.set(URLParam.PriceTo, maxPrice.toString());
      return params;
    });
  };

  return (
    <div className="catalog-filter" data-testid="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  placeholder="от"
                  value={price}
                  onInput={handleFilterPriceInputInput}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder="до"
                  value={priceUp}
                  onInput={handleFilterPriceInputInput}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Категория</legend>
          {
            Object.entries(CameraCategory).map(([key, value]) => (
              <div className="custom-radio catalog-filter__item" key={key}>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value={key}
                    checked={value === categoryFilter}
                    onChange={() => handleFilterCategoryInputChange(value)}
                    data-testid="category-radio-button"
                  />
                  <span className="custom-radio__icon" ></span>
                  <span className="custom-radio__label">{value}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Тип камеры</legend>
          {
            Object.entries(CameraType).map(([key, value]) => (
              <div className="custom-checkbox catalog-filter__item" key={key}>
                <label>
                  <input
                    type="checkbox"
                    name={key}
                    disabled={categoryFilter === CameraCategory.videocamera && (value === CameraType.film || value === CameraType.snapshot)}
                    checked={typeFilters.includes(value)}
                    onChange={() => handleFilterTypeInputChange(value)}
                  />
                  <span className="custom-checkbox__icon"></span>
                  <span className="custom-checkbox__label">{value}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Уровень</legend>
          {
            Object.entries(CameraLevel).map(([key, value]) => (
              <div className="custom-checkbox catalog-filter__item" key={value}>
                <label>
                  <input
                    type="checkbox"
                    name={value}
                    checked={levelFilters.includes(value)}
                    onChange={() => handleFilterLevelInputChange(value)}
                  />
                  <span className="custom-checkbox__icon"></span>
                  <span className="custom-checkbox__label">{key}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset" onClick={handleResetFiltersButtonClick}>
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
