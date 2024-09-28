import { useLocation } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasInBasket } from '../../store/product-data/selectors';
import BasketList from '../../components/basket-list/basket-list';
import { Camera } from '../../types/camera';
import { toggleOrderSuccessPopupOpen, toggleRemoveItemPopupOpenStatus } from '../../store/popup-process/popup-process';
import { getOrderSuccessPopupOpenStatus, getRemoveItemPopupOpenStatus } from '../../store/popup-process/selectors';
import RemoveItemPopup from '../../components/popups/remove-item-popup/remove-item-popup';
import OrderSuccessPopup from '../../components/popups/order-success-popup/order-success-popup';

export default function BasketPage(): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const camerasInBasket = useAppSelector(getCamerasInBasket);

  const isRemoveItemPopupOpenStatus = useAppSelector(getRemoveItemPopupOpenStatus);
  const isOrderSuccessPopupOpenStatus = useAppSelector(getOrderSuccessPopupOpenStatus);

  const handleRemoveItemPopupOpenClick = (id: number) => {
    const currentCamera = camerasInBasket.find((camera) => camera.id === id);

    if (currentCamera) {
      setSelectedCamera(currentCamera);
      dispatch(toggleRemoveItemPopupOpenStatus());
    }
  };

  const handleRemoveItemPopupCloseClick = () => {
    dispatch(toggleRemoveItemPopupOpenStatus());
  };

  const handleOrderSuccessPopupClick = () => {
    dispatch(toggleOrderSuccessPopupOpen());
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="catalog.html">Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <BasketList cameras={camerasInBasket} onDeleteClick={handleRemoveItemPopupOpenClick} />
              <div className="basket__summary">
                <div className="basket__promo">
                  {/* <!--<p className="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод">
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">Применить
                      </button>
                    </form>
                  </div>--> */}
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">111 390 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                  <button className="btn btn--purple" type="submit" onClick={handleOrderSuccessPopupClick}>Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        {
          isRemoveItemPopupOpenStatus
            ?
            <RemoveItemPopup selectedCamera={selectedCamera} onCloseClick={handleRemoveItemPopupCloseClick} />
            :
            ''
        }

        {
          isOrderSuccessPopupOpenStatus
            ?
            <OrderSuccessPopup onCloseClick={handleOrderSuccessPopupClick} />
            :
            ''
        }
      </main>
      <Footer />
    </div>
  );
}
