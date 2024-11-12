import { fireEvent, render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import SearchForm from './search-form';

describe('Component: SearchForm', () => {
  it('should render correctly', () => {
    const expectedTestId = 'search-from';

    const { withStoreComponent } = withStore(
      withHistory(<SearchForm />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should change input value', () => {
    const { withStoreComponent } = withStore(
      withHistory(<SearchForm />),
      makeFakeStore()
    );

    render(withStoreComponent);

    const input = screen.getByPlaceholderText('Поиск по сайту');
    const inputValue = 'Camera';

    fireEvent.input(input, { target: { value: inputValue } });

    expect((input as HTMLInputElement).value).toBe(inputValue);
  });

  it('should change input value and find camera', () => {
    const { withStoreComponent } = withStore(
      withHistory(<SearchForm />),
      makeFakeStore()
    );

    render(withStoreComponent);

    const input = screen.getByPlaceholderText('Поиск по сайту');
    const inputValue = 'Camera1';

    fireEvent.input(input, { target: { value: inputValue } });

    expect((input as HTMLInputElement).value).toBe(inputValue);

    const cameraList = screen.getByTestId('search-results');
    expect(cameraList).toBeInTheDocument();
    expect(cameraList.getAttribute('data-opened')).toBe('true');
    expect(cameraList).toHaveTextContent('Camera1');
  });
});
