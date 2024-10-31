import { CameraCategory, CameraLevel, CameraType } from '../../const';

export default function CatalogFilter(): JSX.Element {
  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder="от" />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder="до" />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Категория</legend>
          {
            Object.entries(CameraCategory).map((category) => (
              <div className="custom-radio catalog-filter__item" key={category[0]}>
                <label>
                  <input type="radio" name="category" value={category[0]} />
                  <span className="custom-radio__icon" ></span>
                  <span className="custom-radio__label">{category[1]}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Тип камеры</legend>
          {
            // disabled если отключена
            Object.entries(CameraType).map((type) => (
              <div className="custom-checkbox catalog-filter__item" key={type[0]}>
                <label>
                  <input type="checkbox" name={type[0]} />
                  <span className="custom-checkbox__icon"></span>
                  <span className="custom-checkbox__label">{type[1]}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Уровень</legend>
          {
            Object.entries(CameraLevel).map((level) => (
              <div className="custom-checkbox catalog-filter__item" key={level[1]}>
                <label>
                  <input type="checkbox" name={level[1]} />
                  <span className="custom-checkbox__icon"></span>
                  <span className="custom-checkbox__label">{level[0]}</span>
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
