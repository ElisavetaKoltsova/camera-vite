import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import Banner from './banner';

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const expectedTestId = 'banner';
    const { withStoreComponent } = withStore(withHistory(<Banner />), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
