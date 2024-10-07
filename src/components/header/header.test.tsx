import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory } from '../../utils/mock-components';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedTestId = 'header';
    const preparedComponent = withHistory(<Header />);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
