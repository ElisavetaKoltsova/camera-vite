import { render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import CatalogCardList from './catalog-card-list';

describe('Component: CatalogCardList', () => {
  it('should render correctly', () => {
    const expectedTestId = 'catalog-card-list';
    const mockFunction = vi.fn();

    const { withStoreComponent } = withStore(
      withHistory(
        <CatalogCardList
          onClick={mockFunction}
          cameras={new Array(5).fill(null).map(() => makeFakeCamera())}
        />
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
