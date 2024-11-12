import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory, withStore } from '../../utils/mock-components';
import { makeFakeStore } from '../../utils/mock';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedTestId = 'header';
    const { withStoreComponent } = withStore(withHistory(<Header />), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
