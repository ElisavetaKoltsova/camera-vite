import { fireEvent, render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeStore } from '../../utils/mock';
import { withStore, withHistory } from '../../utils/mock-components';
import BasketItem from './basket-item';

describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    const expectedTestId = 'basket-item';
    const { withStoreComponent } = withStore(
      withHistory(<BasketItem camera={makeFakeCamera()} onDeleteClick={vi.fn()} />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should change input value', () => {
    const { withStoreComponent } = withStore(
      withHistory(<BasketItem camera={makeFakeCamera()} onDeleteClick={vi.fn()} />),
      makeFakeStore()
    );

    render(withStoreComponent);

    const input = screen.getByPlaceholderText('0');
    const inputValue = '4';

    fireEvent.input(input, { target: { value: inputValue } });

    expect((input as HTMLInputElement).value).toBe(inputValue);
  });
});
