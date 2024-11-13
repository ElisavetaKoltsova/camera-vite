import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it ('should render correctly', () => {
    const expectedTestId = 'pagination';

    const mockCountOfPage = 3;
    const mockCurrentPage = 1;

    const { withStoreComponent } = withStore(
      withHistory(<Pagination currentPage={mockCurrentPage} countOfPage={mockCountOfPage} />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it ('should render "Next" button when pages more than 3 and current page less than 3', () => {
    const expectedTestId = 'next';

    const mockCountOfPage = 4;
    const mockCurrentPage = 1;

    const { withStoreComponent } = withStore(
      withHistory(<Pagination currentPage={mockCurrentPage} countOfPage={mockCountOfPage} />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it ('should render "Back" button when pages more than 4 and current page more than 3', () => {
    const expectedTestId = 'back';

    const mockCountOfPage = 5;
    const mockCurrentPage = 4;

    const { withStoreComponent } = withStore(
      withHistory(<Pagination currentPage={mockCurrentPage} countOfPage={mockCountOfPage} />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
