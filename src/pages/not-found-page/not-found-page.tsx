import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function NotFoundPage(): JSX.Element {
  return (
    <div data-testid="not-found-page">
      <h1>Страница не найдена</h1>
      <h1>404</h1>
      <Link to={AppRoute.Catalog}>
        Вернуться в каталог
      </Link>
    </div>
  );
}
