import { cameras } from '../../mock/cameras';
import CatalogCardItem from '../catalog-card-item/catalog-card-item';

export default function CatalogCardList(): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => <CatalogCardItem camera={camera} key={camera.id + camera.price} />)}
    </div>
  );
}
