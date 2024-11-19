import { FormEvent, useEffect, useState } from 'react';
import { CameraCategory, CameraFilterPrice, CameraLevel, CameraType, PRICE_FROM, PRICE_TO, URLParam } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterCamerasCategory, filterCamerasLevel, filterCamerasPrice, filterCamerasType, resetFilters } from '../../store/product-data/product-data';
import { getCameras, getFilteredCameras, getPriceFrom, getPriceTo } from '../../store/product-data/selectors';
import { findMinimalPrice, findMaximalPrice } from '../../utils/list';
import { useDebounce } from 'use-debounce';
import { Camera } from '../../types/camera';
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

  const minPrice = useAppSelector(getPriceFrom);
  const maxPrice = useAppSelector(getPriceTo);

  let usedCameras: Camera[] = cameras;

  if (categoryFilter || typeFilters.length || levelFilters.length) {
    usedCameras = [...filteredCameras];
  }

  usedCameras = filterPrice(usedCameras, priceFromParam, priceToParam);

  const Price = {
    MIN_PRICE: findMinimalPrice(usedCameras),
    MAX_PRICE: findMaximalPrice(usedCameras)
  };

  //const {MIN_PRICE: priceFrom, MAX_PRICE: priceTo} = Price;

  const [priceFrom, setPriceFrom] = useState<number>(minPrice);
  const [priceTo, setPriceTo] = useState<number>(maxPrice);

  const [debouncedPriceFrom] = useDebounce(priceFrom, DEBOUNCE_TIMEOUT);
  const [debouncedPriceTo] = useDebounce(priceTo, DEBOUNCE_TIMEOUT);

  const price: number | string = priceFrom !== PRICE_FROM ? priceFrom : '';
  const priceUp: number | string = priceTo !== PRICE_TO ? priceTo : '';

  useEffect(() => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set(URLParam.PriceFrom, priceFromParam.toString());
      params.set(URLParam.PriceTo, priceToParam.toString());
      return params;
    });

    //dispatch(filterCamerasPrice({priceFrom: priceFromParam, priceTo: priceToParam}));
  }, [dispatch, priceFromParam, priceToParam, setSearchParams]);

  useEffect(() => {
    setPriceFrom(Price.MIN_PRICE);
    setPriceTo(Price.MAX_PRICE);
  }, [Price.MAX_PRICE, Price.MIN_PRICE]);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  useEffect(() => {
    if (debouncedPriceFrom < Price.MIN_PRICE) {
      setPriceFrom(Price.MIN_PRICE);
    }
    if (debouncedPriceFrom > debouncedPriceTo) {
      setPriceTo(debouncedPriceFrom);
    }
    if (debouncedPriceTo > Price.MAX_PRICE) {
      setPriceTo(Price.MAX_PRICE);
    }

    if (priceFrom !== PRICE_FROM && priceTo !== PRICE_TO) {
      dispatch(
        filterCamerasPrice({
          priceFrom,
          priceTo
        })
      );

      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams);
        params.set(URLParam.PriceFrom, priceFrom.toString());
        params.set(URLParam.PriceTo, priceTo.toString());
        return params;
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPriceFrom, debouncedPriceTo, dispatch, priceFrom, priceTo]);

  const handleFilterPriceInputInput = (evt: FormEvent<HTMLInputElement>) => {
    const type = evt.currentTarget.name as CameraFilterPrice;
    const value = Number(evt.currentTarget.value);


    if (type === CameraFilterPrice.From) {
      setPriceFrom(value);
    }
    if (type === CameraFilterPrice.To) {
      setPriceTo(value);
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
    setPriceFrom(findMinimalPrice(cameras));
    setPriceTo(findMaximalPrice(cameras));

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.delete(URLParam.FilterOfCategory);
      params.delete(URLParam.FilterOfTypes);
      params.delete(URLParam.FilterOfLevels);
      params.set(URLParam.PriceFrom, priceFrom.toString());
      params.set(URLParam.PriceTo, priceTo.toString());
      return params;
    });

    dispatch(resetFilters());
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
