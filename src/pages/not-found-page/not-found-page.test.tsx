import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found-page';
import HistoryRouter from '../../components/history-route/history-route';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedTestId = 'not-found-page';

    render(
      <HistoryRouter history={createMemoryHistory()}>
        <HelmetProvider>
          <NotFoundPage />
        </HelmetProvider>
      </HistoryRouter>
    );

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
