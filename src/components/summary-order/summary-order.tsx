import { Camera } from '../../types/camera';
import { convertNumberIntoMoneyFormat } from '../../utils/list';

type SummaryOrderProps = {
  camerasInBasket: Camera[];
  onOrderSuccessClick: () => void;
}

export default function SummaryOrder({camerasInBasket, onOrderSuccessClick}: SummaryOrderProps): JSX.Element {
  let summaryPrice = 0;

  camerasInBasket.forEach((camera) => {
    const countOfCameras = camera.countInBasket ? camera.countInBasket : 1;
    summaryPrice += (countOfCameras * camera.price);
  });

  const convertedPrice = convertNumberIntoMoneyFormat(summaryPrice);

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#">
            <div className="custom-input">
              <label><span className="custom-input__label">Промокод</span>
                <input type="text" name="promo" placeholder="Введите промокод" />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit">Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{convertedPrice} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{convertedPrice} ₽</span></p>
        <button className="btn btn--purple" type="submit" onClick={onOrderSuccessClick}>Оформить заказ
        </button>
      </div>
    </div>
  );
}
