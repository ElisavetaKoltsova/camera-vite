import { Camera } from '../../types/camera';
import BasketItem from '../basket-item/basket-item';

type BasketListProps = {
  cameras: Camera[];
  onDeleteClick: (id: number) => void;
}

export default function BasketList({cameras, onDeleteClick}: BasketListProps): JSX.Element {
  return (
    <ul className="basket__list">
      {cameras.map((camera) => <BasketItem camera={camera} onDeleteClick={onDeleteClick} key={camera.id + camera.price} />)}
    </ul>
  );
}
