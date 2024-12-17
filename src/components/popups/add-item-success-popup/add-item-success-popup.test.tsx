import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../../utils/mock';
import { withHistory, withScrollProvider, withStore } from '../../../utils/mock-components';
import AddItemSuccessPopup from './add-item-success-popup';

describe('Component: AddItemSuccessPopup', () => {
  it('should render correctly', () => {
    const expectedTestId = 'add-item-success-popup';
    const mockFunction = vi.fn();

    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <AddItemSuccessPopup
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
          <AddItemSuccessPopup
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
