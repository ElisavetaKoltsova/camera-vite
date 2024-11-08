import { FormEvent, useEffect, useState } from 'react';
import { CameraCategory, CameraFilterPrice, CameraLevel, CameraType, PRICE_FROM, PRICE_TO } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterCamerasCategory, filterCamerasLevel, filterCamerasPrice, filterCamerasType, resetFilters } from '../../store/product-data/product-data';
import { getCameras, getCategoryFilter, getFilteredCameras, getLevelFilter, getPriceFilter, getPriceFrom, getPriceTo, getTypeFilter } from '../../store/product-data/selectors';
import { findMinimalPrice, findMaximalPrice } from '../../utils/list';
import { useDebounce } from 'use-debounce';
import { Camera } from '../../types/camera';

const DEBOUNCE_TIMEOUT = 1000;

export default function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const cameras = useAppSelector(getCameras);
  const filteredCameras = useAppSelector(getFilteredCameras);

  const priceFilter = useAppSelector(getPriceFilter);
  const categoryFilter = useAppSelector(getCategoryFilter);
  const typeFilter = useAppSelector(getTypeFilter);
  const levelFilter = useAppSelector(getLevelFilter);

  let usedCameras: Camera[] = [...cameras];

  if (categoryFilter || priceFilter || typeFilter.length > 0 || levelFilter.length > 0) {
    usedCameras = [...filteredCameras];
  }

  const Price = {
    MIN_PRICE: findMinimalPrice(usedCameras),
    MAX_PRICE: findMaximalPrice(usedCameras)
  };

  const minPrice = useAppSelector(getPriceFrom);
  const maxPrice = useAppSelector(getPriceTo);

  const [selectedTypes, setSelectedTypes] = useState<CameraType[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<CameraLevel[]>([]);
  const [selectedPriceTypeFilter, setSelectedPriceTypeFilter] = useState<CameraFilterPrice | null>(null);
  const [priceFrom, setPriceFrom] = useState<number | null>(minPrice);
  const [priceTo, setPriceTo] = useState<number | null>(maxPrice);

  const [debouncedPriceFrom] = useDebounce(minPrice, DEBOUNCE_TIMEOUT);
  const [debouncedPriceTo] = useDebounce(priceTo, DEBOUNCE_TIMEOUT);

  let price: number | string = priceFrom ?? '';
  let priceUp: number | string = priceTo ?? '';

  if (priceFrom === PRICE_FROM) {
    price = '';
  }

  if (priceTo === PRICE_TO) {
    priceUp = '';
  }

  useEffect(() => {
    setPriceFrom(minPrice);
    setPriceTo(maxPrice);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  useEffect(() => {
    if (debouncedPriceFrom !== null && debouncedPriceFrom < Price.MIN_PRICE) {
      setPriceFrom(Price.MIN_PRICE);
    }
    if (debouncedPriceFrom !== null && debouncedPriceTo !== null && debouncedPriceFrom >= debouncedPriceTo) {
      setPriceTo(debouncedPriceFrom);
    }
    if (debouncedPriceTo !== null && debouncedPriceTo > Price.MAX_PRICE) {
      setPriceTo(Price.MAX_PRICE);
    }

    dispatch(
      filterCamerasPrice({
        priceFrom,
        priceTo,
        type: selectedPriceTypeFilter
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPriceFrom, debouncedPriceTo, dispatch, priceFrom, priceTo, selectedPriceTypeFilter]);

  const handleFilterPriceInputInput = (evt: FormEvent<HTMLInputElement>) => {

    const type = evt.currentTarget.name as CameraFilterPrice;
    const value = Number(evt.currentTarget.value);

    setSelectedPriceTypeFilter(type);

    if (type === CameraFilterPrice.From) {
      setPriceFrom(value);
    }
    if (type === CameraFilterPrice.To) {
      setPriceTo(value);
    }
  };

  const handleFilterCategoryInputChange = (category: CameraCategory) => {
    if (category === CameraCategory.videocamera) {
      const updatedTypes: CameraType[] = selectedTypes.filter((type) => type !== CameraType.film && type !== CameraType.snapshot);

      setSelectedTypes(updatedTypes);
      dispatch(filterCamerasType(updatedTypes));
    }

    dispatch(filterCamerasCategory(category));
  };

  const handleFilterTypeInputChange = (type: CameraType) => {
    const updatedTypes =
      selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes, type];

    setSelectedTypes(updatedTypes);
    dispatch(filterCamerasType(updatedTypes));
  };

  const handleFilterLevelInputChange = (level: CameraLevel) => {
    const updatedLevels =
      selectedLevels.includes(level)
        ? selectedLevels.filter((l) => l !== level)
        : [...selectedLevels, level];

    setSelectedLevels(updatedLevels);
    dispatch(filterCamerasLevel(updatedLevels));
  };

  const handleResetFiltersButtonClick = () => {
    setSelectedTypes([]);
    setSelectedLevels([]);
    setPriceFrom(minPrice);
    setPriceTo(maxPrice);

    dispatch(resetFilters());
  };

  return (
    <div className="catalog-filter">
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
                    checked={selectedTypes.includes(value)}
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
