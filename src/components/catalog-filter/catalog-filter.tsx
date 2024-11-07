import { FormEvent, useEffect, useState } from 'react';
import { CameraCategory, CameraFilterPrice, CameraLevel, CameraType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterCamerasCategory, filterCamerasLevel, filterCamerasPrice, filterCamerasType, resetFilters } from '../../store/product-data/product-data';
import { getCameras, getCategoryFilter, getPriceFrom, getPriceTo } from '../../store/product-data/selectors';
import { findMinimalPrice, findMaximalPrice } from '../../utils/list';
import { useDebounce } from 'use-debounce';

const DEBOUNCE_TIMEOUT = 1000;

export default function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const cameras = useAppSelector(getCameras);
  const categoryFilter = useAppSelector(getCategoryFilter);

  const Price = {
    MIN_PRICE: findMinimalPrice(cameras),
    MAX_PRICE: findMaximalPrice(cameras)
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

  useEffect(() => {
    setPriceFrom(minPrice);
    setPriceTo(maxPrice);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  useEffect(() => {
    if (debouncedPriceFrom && debouncedPriceFrom < Price.MIN_PRICE) {
      setPriceFrom(minPrice);
    }
    if (debouncedPriceFrom && debouncedPriceTo && debouncedPriceFrom >= debouncedPriceTo) {
      setPriceTo(debouncedPriceFrom);
    }
    if (debouncedPriceTo && debouncedPriceTo > Price.MAX_PRICE) {
      setPriceTo(maxPrice);
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

  const handleFilterPriceInputChange = (evt: FormEvent<HTMLInputElement>) => {

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
                  value={priceFrom ?? ''}
                  onInput={handleFilterPriceInputChange}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder="до"
                  value={priceTo ?? ''}
                  onInput={handleFilterPriceInputChange}
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
