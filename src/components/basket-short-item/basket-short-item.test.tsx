import { render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import BasketShortItem from './basket-short-item';

describe('Component: BasketShortItem', () => {
  it('should render correctly', () => {
    const expectedTestId = 'basket-short-item';
    const { withStoreComponent } = withStore(
      withHistory(
        <BasketShortItem selectedCamera={makeFakeCamera()} />
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
