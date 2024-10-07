import { render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import CatalogCardItem from './catalog-card-item';

describe('Component: CatalogCardItem', () => {
  it('should render correctly', () => {
    const expectedTestId = 'catalog-card-item';
    const mockFunction = vi.fn();

    const { withStoreComponent } = withStore(
      withHistory(
        <CatalogCardItem
          onClick={mockFunction}
          camera={makeFakeCamera()}
        />
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
