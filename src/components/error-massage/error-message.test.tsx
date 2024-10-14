import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import ErrorMessage from './error-massage';

describe('Component: ErrorMessage', () => {
  it('should render correctly', () => {
    const expectedTestId = 'error-massage-visible';
    const { withStoreComponent } = withStore(
      withHistory(<ErrorMessage />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
