import { FormEvent, useEffect, useState } from 'react';
import { CameraCategory, CameraFilterPrice, CameraLevel, CameraType, PRICE_FROM, PRICE_TO, URLParam } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterCamerasCategory, filterCamerasLevel, filterCamerasPrice, filterCamerasType, resetFilters } from '../../store/product-data/product-data';
import { getCameras, getFilteredCameras } from '../../store/product-data/selectors';
import { findMinimalPrice, findMaximalPrice } from '../../utils/list';
import { useDebounce } from 'use-debounce';
import { filterPrice } from '../../utils/filter';
import { useSearchParams } from 'react-router-dom';
import { Camera } from '../../types/camera';

type CatalogFilterProps = {
  priceFromParam: number;
  priceToParam: number;
  categoryFilter: CameraCategory | null;
  typeFilters: CameraType[];
  levelFilters: CameraLevel[];
  usedCameras: Camera[];
}

const DEBOUNCE_TIMEOUT = 1000;

export default function CatalogFilter({usedCameras, priceFromParam, priceToParam, categoryFilter, typeFilters, levelFilters}: CatalogFilterProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  const cameras = useAppSelector(getCameras);
  const filteredCameras = useAppSelector(getFilteredCameras);

  const minPrice = findMinimalPrice(usedCameras);
  const maxPrice = findMaximalPrice(usedCameras);

  const [priceFrom, setPriceFrom] = useState<number>(priceFromParam);
  const [priceTo, setPriceTo] = useState<number>(priceToParam);

  const [debouncedPriceFrom] = useDebounce(priceFrom, DEBOUNCE_TIMEOUT);
  const [debouncedPriceTo] = useDebounce(priceTo, DEBOUNCE_TIMEOUT);

  const price: number | string = priceFrom !== PRICE_FROM ? priceFrom : '';
  const priceUp: number | string = priceTo !== PRICE_FROM ? priceTo : '';

  useEffect(() => {
    if (categoryFilter || typeFilters.length || levelFilters.length) {
      const filtered = filterPrice(filteredCameras, priceFrom, priceTo);
      setPriceFrom(findMinimalPrice(filtered));
      setPriceTo(findMaximalPrice(filtered));
    }

    if (priceToParam >= priceFrom) {
      setPriceFrom(findMinimalPrice(filterPrice(usedCameras, priceFromParam, priceToParam)));
      setPriceTo(findMaximalPrice(filterPrice(usedCameras, priceFromParam, priceToParam)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, typeFilters, levelFilters]);

  useEffect(() => {
    setPriceFrom(priceFromParam);
    setPriceTo(priceToParam);
  }, [priceFromParam, priceToParam]);

  useEffect(() => {
    const defaultMaxPrice = findMaximalPrice(cameras);

    const valuePriceFrom = Math.max(
      debouncedPriceFrom || minPrice,
      Math.min(debouncedPriceFrom || PRICE_FROM, debouncedPriceTo || maxPrice)
    );
    const valuePriceTo = Math.max(
      debouncedPriceFrom || minPrice,
      Math.min(debouncedPriceTo || maxPrice)
    );

    // не работает когда я хочу выбрать в от значение больше чем в до (оно просто сбрасывается обратно)
    const validPriceFrom = valuePriceFrom <= defaultMaxPrice ? valuePriceFrom : defaultMaxPrice;
    const validPriceTo = valuePriceTo < validPriceFrom ? validPriceFrom : valuePriceTo;

    if (debouncedPriceFrom <= debouncedPriceTo || validPriceFrom <= validPriceTo) {
      setPriceFrom(validPriceFrom);
      setPriceTo(validPriceTo);

      dispatch(filterCamerasPrice({ priceFrom: validPriceFrom, priceTo: validPriceTo }));

      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams);
        params.set(URLParam.PriceFrom, validPriceFrom.toString());
        params.set(URLParam.PriceTo, validPriceTo.toString());
        return params;
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPriceFrom, debouncedPriceTo, dispatch, setSearchParams]);

  const handleFilterPriceInputInput = (evt: FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    const numericValue = Number(value) || 0;

    if (name === CameraFilterPrice.From) {
      setPriceFrom(numericValue);
    }
    if (name === CameraFilterPrice.To) {
      setPriceTo(numericValue);
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
    setPriceFrom(PRICE_FROM);
    setPriceTo(PRICE_TO);
    dispatch(resetFilters());

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.delete(URLParam.FilterOfCategory);
      params.delete(URLParam.FilterOfTypes);
      params.delete(URLParam.FilterOfLevels);
      params.delete(URLParam.PriceFrom);
      params.delete(URLParam.PriceTo);
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
