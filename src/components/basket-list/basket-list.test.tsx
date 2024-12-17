import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mock';
import { withStore, withHistory } from '../../utils/mock-components';
import BasketList from './basket-list';

describe('Component: BasketList', () => {
  it('should render correctly', () => {
    const expectedTestId = 'basket-list';

    const { withStoreComponent } = withStore(
      withHistory(
        <BasketList
          cameras={[]}
          onDeleteClick={vi.fn()}
        />
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
