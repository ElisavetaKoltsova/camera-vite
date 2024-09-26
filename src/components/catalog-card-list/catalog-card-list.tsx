import { Camera } from '../../types/camera';
import CatalogCardItem from '../catalog-card-item/catalog-card-item';

type CatalogCardListProps = {
  cameras: Camera[];
  onClick: (id: number) => void;
}

export default function CatalogCardList({cameras, onClick}: CatalogCardListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => <CatalogCardItem camera={camera} onClick={onClick} key={camera.id + camera.price} />)}
    </div>
  );
}
