import { render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeStore } from '../../../utils/mock';
import { withHistory, withScrollProvider, withStore } from '../../../utils/mock-components';
import CallItemPopup from './call-item-popup';
import ScrollProvider from '../../scroll-provider/scroll-provider';

describe('Component: CallItemPopup', () => {
  it('should render correctly', () => {
    const expectedTestId = 'call-item-popup';
    const mockFunction = vi.fn();

    const { withStoreComponent } = withStore(
      withHistory(
        <ScrollProvider>
          <CallItemPopup onCloseClick={mockFunction} selectedCamera={makeFakeCamera()}/>
        </ScrollProvider>
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
          <CallItemPopup
            onCloseClick={mockFunction}
            selectedCamera={makeFakeCamera()}
          />
        )
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
