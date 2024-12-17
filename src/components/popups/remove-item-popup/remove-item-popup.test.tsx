import { render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeStore } from '../../../utils/mock';
import { withHistory, withScrollProvider, withStore } from '../../../utils/mock-components';
import RemoveItemPopup from './remove-item-popup';

describe('Component: RemoveItemPopup', () => {
  it('should render correctly', () => {
    const expectedTestId = 'remove-item-popup';
    const mockFunction = vi.fn();

    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <RemoveItemPopup
            selectedCamera={makeFakeCamera()}
            onCloseClick={mockFunction}
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
          <RemoveItemPopup
            selectedCamera={makeFakeCamera()}
            onCloseClick={mockFunction}
          />
        )
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
