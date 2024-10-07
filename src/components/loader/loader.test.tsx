import Loader from './loader';
import { render, screen } from '@testing-library/react';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const expectedTestId = 'loader';

    render(<Loader />);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
