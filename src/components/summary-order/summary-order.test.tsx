import { makeFakeStore } from '../../utils/mock';
import { withStore, withHistory } from '../../utils/mock-components';
import SummaryOrder from './summary-order';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Component: SummaryOrder', () => {
  it('should render correctly', () => {
    const expectedTestId = 'summary-order';

    const { withStoreComponent } = withStore(
      withHistory(<SummaryOrder camerasInBasket={[]} promos={[]} onOrderSuccessClick={vi.fn()} />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should change input value', () => {
    const { withStoreComponent } = withStore(
      withHistory(<SummaryOrder camerasInBasket={[]} promos={[]} onOrderSuccessClick={vi.fn()} />),
      makeFakeStore()
    );

    render(withStoreComponent);

    const input = screen.getByPlaceholderText('Введите промокод');
    const inputValue = 'Promo';

    fireEvent.input(input, { target: { value: inputValue } });

    expect((input as HTMLInputElement).value).toBe(inputValue);
  });
});

