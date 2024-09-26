import { Camera } from '../../types/camera';
import CatalogCardItem from '../catalog-card-item/catalog-card-item';

type CatalogCardListProps = {
  cameras: Camera[];
}

export default function CatalogCardList({cameras}: CatalogCardListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => <CatalogCardItem camera={camera} key={camera.id + camera.price} />)}
    </div>
  );
}
