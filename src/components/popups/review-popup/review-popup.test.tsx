import { render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeStore } from '../../../utils/mock';
import { withHistory, withScrollProvider, withStore } from '../../../utils/mock-components';
import ReviewPopup from './review-popup';

describe('Component: ReviewPopup', () => {
  it('should render correctly', () => {
    const expectedTestId = 'review-popup';
    const mockFunction = vi.fn();

    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <ReviewPopup
            cameraId={makeFakeCamera().id}
            onCloseClick={mockFunction}
            onSubmitClick={mockFunction}
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
          <ReviewPopup
            cameraId={makeFakeCamera().id}
            onCloseClick={mockFunction}
            onSubmitClick={mockFunction}
          />
        )
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
