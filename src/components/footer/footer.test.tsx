import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../../utils/mock-components';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedTestId = 'footer';
    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
