import { Link, useLocation } from 'react-router-dom';
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
import SummaryOrder from '../../components/summary-order/summary-order';
import { navigateToUpOfPage } from '../../utils/list';
import { AppRoute, Sorts } from '../../const';
import { sort } from '../../utils/sort';
import { postOrderAction } from '../../store/api-action';
import { Order } from '../../types/order';
import { getOrderDataLoadingStatus } from '../../store/order-data/selectors';
import { getPromos } from '../../store/promo-data/selectors';

export default function BasketPage(): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  useEffect(() => {
    navigateToUpOfPage();
  }, [pathname]);

  const camerasInBasket = useAppSelector(getCamerasInBasket);
  const promos = useAppSelector(getPromos);

  const seenIds = new Set<number>();
  const uniqueCameras = camerasInBasket.filter((camera) => {
    if (seenIds.has(camera.id)) {
      return false;
    }
    seenIds.add(camera.id);
    return true;
  });

  const camerasInBasketToShow = sort[Sorts.PRICE_LOW_TO_HIGH]([...uniqueCameras]);

  const removeItemPopupOpenStatus = useAppSelector(getRemoveItemPopupOpenStatus);
  const orderSuccessPopupOpenStatus = useAppSelector(getOrderSuccessPopupOpenStatus);

  const isOrderDataLoading = useAppSelector(getOrderDataLoadingStatus);

  const handleRemoveItemPopupOpenClick = (id: number) => {
    const currentCamera = camerasInBasketToShow.find((camera) => camera.id === id);

    if (currentCamera) {
      setSelectedCamera(currentCamera);
      dispatch(toggleRemoveItemPopupOpenStatus());
    }
  };

  const handleRemoveItemPopupCloseClick = () => {
    dispatch(toggleRemoveItemPopupOpenStatus());
  };

  const handleOrderSuccessPopupClick = (camerasToOrder?: Camera[]) => {
    if (camerasToOrder) {
      const orderCamerasId = camerasToOrder.map((cameraToOrder) => cameraToOrder.id);
      const order: Order = {
        camerasIds: orderCamerasId,
        coupon: null
      };
      dispatch(postOrderAction(order));
    }
    if (!isOrderDataLoading) {
      dispatch(toggleOrderSuccessPopupOpen());
    }
  };

  return (
    <div className="wrapper" data-testid="basket-page">
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              {
                camerasInBasketToShow.length
                  ?
                  <BasketList cameras={camerasInBasketToShow} onDeleteClick={handleRemoveItemPopupOpenClick} />
                  : <h2>Ваша карзина пуста</h2>
              }

              <SummaryOrder camerasInBasket={camerasInBasket} promos={promos} onOrderSuccessClick={handleOrderSuccessPopupClick} />
            </div>
          </section>
        </div>
        {
          removeItemPopupOpenStatus
            ?
            <RemoveItemPopup selectedCamera={selectedCamera} onCloseClick={handleRemoveItemPopupCloseClick} />
            :
            ''
        }

        {
          orderSuccessPopupOpenStatus
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
