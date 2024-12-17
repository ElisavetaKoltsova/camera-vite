import { render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeStore } from '../../../utils/mock';
import { withHistory, withScrollProvider, withStore } from '../../../utils/mock-components';
import AddItemPopup from './add-item-popup';

describe('Component: AddItemPopup', () => {
  it('should render correctly', () => {
    const expectedTestId = 'add-item-popup';
    const mockFunction = vi.fn();

    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <AddItemPopup
            selectedCamera={makeFakeCamera()}
            onCloseClick={mockFunction}
            onAddToBasketClick={mockFunction}
          />
        )
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('the page behind popup should be darkened', () => {
    const expectedTestId = 'overlay-darkened';
    const mockFunction = vi.fn();

    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <AddItemPopup
            selectedCamera={makeFakeCamera()}
            onCloseClick={mockFunction}
            onAddToBasketClick={mockFunction}
          />
        )
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
