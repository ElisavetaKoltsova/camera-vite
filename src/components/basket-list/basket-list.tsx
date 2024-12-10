import { useAppSelector } from '../../hooks';
import { getOrderDataLoadingStatus } from '../../store/order-data/selectors';
import { Camera } from '../../types/camera';
import BasketItem from '../basket-item/basket-item';

type BasketListProps = {
  cameras: Camera[];
  onDeleteClick: (id: number) => void;
}

export default function BasketList({cameras, onDeleteClick}: BasketListProps): JSX.Element {
  const isOrderDataLoading = useAppSelector(getOrderDataLoadingStatus);
  return (
    <ul
      className="basket__list"
      style={{
        position: 'relative',
        pointerEvents: isOrderDataLoading ? 'none' : 'auto',
        opacity: isOrderDataLoading ? 0.5 : 1,
      }}
    >
      {cameras.map((camera) => <BasketItem camera={camera} onDeleteClick={onDeleteClick} key={camera.id + camera.price} />)}
    </ul>
  );
}
