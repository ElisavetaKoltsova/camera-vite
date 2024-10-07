import { render, screen } from '@testing-library/react';
import { makeFakePromo, makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import BannerItem from './banner-item';

describe('Component: BannerItem', () => {
  it('should render correctly', () => {
    const expectedTestId = 'banner-item';
    const { withStoreComponent } = withStore(
      withHistory(<BannerItem promo={makeFakePromo()}/>),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
