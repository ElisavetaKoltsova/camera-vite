import { useContext } from 'react';
import { ScrollContext } from './scroll-provider';
import { render, screen, waitFor } from '@testing-library/react';
import { withHistory, withScrollProvider, withStore } from '../../utils/mock-components';
import { makeFakeStore } from '../../utils/mock';

describe('Component: ScrollProvider', () => {
  const ConsumerComponent = () => {
    const context = useContext(ScrollContext);
    if (!context) {
      return null;
    }

    return (
      <>
        <button onClick={context.disableScroll}>Disable Scroll</button>
        <button onClick={context.enableScroll}>Enable Scroll</button>
      </>
    );
  };

  it('should set overflow to "hidden" when disableScroll is called', async () => {
    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <ConsumerComponent />
        )
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    const disableScrollButton = screen.getByText('Disable Scroll');
    disableScrollButton.click();

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  it('should set overflow to "" when enableScroll is called', async () => {
    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <ConsumerComponent />
        )
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    const disableScrollButton = screen.getByText('Disable Scroll');
    const enableScrollButton = screen.getByText('Enable Scroll');

    disableScrollButton.click();
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });

    enableScrollButton.click();
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('');
    });
  });

  it('should reset document.body.style.overflow when component is unmounted', async () => {
    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <ConsumerComponent />
        )
      ),
      makeFakeStore()
    );

    const { unmount } = render(withStoreComponent);

    const disableScrollButton = screen.getByText('Disable Scroll');
    disableScrollButton.click();

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });

    unmount();
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('');
    });
  });
});
