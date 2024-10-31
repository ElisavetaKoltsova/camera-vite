import { useEffect, useState } from 'react';
import { CameraCategory, CameraLevel, CameraType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterCamerasCategory, filterCamerasLevel, filterCamerasType, resetFilters } from '../../store/product-data/product-data';
import { getCategoryFilter } from '../../store/product-data/selectors';

export default function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const [selectedTypes, setSelectedTypes] = useState<CameraType[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<CameraLevel[]>([]);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const categoryFilter = useAppSelector(getCategoryFilter);

  // const handleFilterPriceInputChange = (priceFrom: number | null, priceTo: number | null, type: CameraFilterPrice) => {
  //   dispatch(filterCamerasPrice({priceFrom, priceTo, type}));
  // };

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

  //console.log(priceFilter);

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
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder="до"
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
        <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
