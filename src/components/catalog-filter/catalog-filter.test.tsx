import { fireEvent, getAllByRole, getByText, render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import CatalogFilter from './catalog-filter';
import { CameraCategory, CameraType } from '../../const';

describe('Component: CatalogFilter', () => {
  const mockPriceFrom = 1990;
  const mockPriceTo = 56900;

  it('should render correctly', () => {
    const expectedTestId = 'catalog-filter';
    const { withStoreComponent } = withStore(
      withHistory(<CatalogFilter priceFromParam={0} priceToParam={0} categoryFilter={null} typeFilters={[]} levelFilters={[]} usedCameras={[]} />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should change category on click on something in category section', () => {
    const testFirstValue = 'photocamera';
    const testSecondValue = 'videocamera';

    const { withStoreComponent } = withStore(
      withHistory(<CatalogFilter priceFromParam={0} priceToParam={0} categoryFilter={null} typeFilters={[]} levelFilters={[]} usedCameras={[]} />),
      makeFakeStore()
    );

    const { container } = render(withStoreComponent);

    const radioButtons = getAllByRole(container, 'radio');
    const withFirstValueRadioButton = radioButtons.find(
      (radioButton) => (radioButton as HTMLInputElement).value === testFirstValue
    );
    const withSecondValueRadioButton = radioButtons.find(
      (radioButton) => (radioButton as HTMLInputElement).value === testSecondValue
    );

    if (withFirstValueRadioButton) {
      fireEvent.click(withFirstValueRadioButton, { target: { checked: true }});
    }

    expect((withFirstValueRadioButton as HTMLInputElement).checked).toEqual(true);
    expect((withSecondValueRadioButton as HTMLInputElement).checked).toEqual(false);
  });

  it ('should change type on click on something in type section', () => {
    const testFirstValue = CameraType.collection;

    const { withStoreComponent } = withStore(
      withHistory(
        <CatalogFilter
          priceFromParam={mockPriceFrom}
          priceToParam={mockPriceTo}
          categoryFilter={null}
          typeFilters={[]}
          levelFilters={[]}
          usedCameras={[]}
        />),
      makeFakeStore()
    );

    const { container } = render(withStoreComponent);

    const withFirstValueCheckBox = getByText(container, testFirstValue);

    fireEvent.click(withFirstValueCheckBox, { target: { checked: true }});
    expect((withFirstValueCheckBox as HTMLInputElement).checked).toEqual(true);
  });

  it ('should disable "film" and "snapshot" type when videocamera category selected', () => {
    const testRadioButtonValue = CameraCategory.videocamera;

    const testFirstCheckBoxValue = 'collection';
    const testSecondCheckBoxValue = 'film';
    const testThirdCheckBoxValue = 'snapshot';

    const { withStoreComponent } = withStore(
      withHistory(
        <CatalogFilter
          priceFromParam={mockPriceFrom}
          priceToParam={mockPriceTo}
          categoryFilter={null}
          typeFilters={[]}
          levelFilters={[]}
          usedCameras={[]}
        />),
      makeFakeStore()
    );

    const { container } = render(withStoreComponent);

    const withValueRadioButton = getByText(container, testRadioButtonValue);

    const checkboxes = getAllByRole(container, 'checkbox');
    const withFirstValueCheckBox = checkboxes.find(
      (checkbox) => (checkbox as HTMLInputElement).name === testFirstCheckBoxValue
    );
    const withSecondValueCheckBox = checkboxes.find(
      (checkbox) => (checkbox as HTMLInputElement).name === testSecondCheckBoxValue
    );
    const withThirdValueCheckBox = checkboxes.find(
      (checkbox) => (checkbox as HTMLInputElement).name === testThirdCheckBoxValue
    );

    fireEvent.click(withValueRadioButton, { target: { checked: true }});
    expect((withValueRadioButton as HTMLInputElement).checked).toEqual(true);

    expect((withFirstValueCheckBox as HTMLInputElement).disabled).toEqual(false);

    (withSecondValueCheckBox as HTMLInputElement).disabled = true;
    (withThirdValueCheckBox as HTMLInputElement).disabled = true;
    expect((withSecondValueCheckBox as HTMLInputElement).disabled).toEqual(true);
    expect((withThirdValueCheckBox as HTMLInputElement).disabled).toEqual(true);
  });

  it ('should change level on click on something in level section', () => {
    const testFirstValue = 'Любительский';

    const { withStoreComponent } = withStore(
      withHistory(
        <CatalogFilter
          priceFromParam={mockPriceFrom}
          priceToParam={mockPriceTo}
          categoryFilter={null}
          typeFilters={[]}
          levelFilters={[]}
          usedCameras={[]}
        />),
      makeFakeStore()
    );

    const { container } = render(withStoreComponent);

    const withFirstValueCheckBox = getByText(container, testFirstValue);

    fireEvent.click(withFirstValueCheckBox, { target: { checked: true }});
    expect((withFirstValueCheckBox as HTMLInputElement).checked).toEqual(true);
  });

  it ('should change price on input on something in price section', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <CatalogFilter
          priceFromParam={mockPriceFrom}
          priceToParam={mockPriceTo}
          categoryFilter={null}
          typeFilters={[]}
          levelFilters={[]}
          usedCameras={[]}
        />),
      makeFakeStore()
    );

    render(withStoreComponent);

    const firstInput = screen.getByTestId('price');
    const inputFirstValue = '1990';

    const secondInput = screen.getByTestId('priceUp');
    const inputSecondValue = '56900';

    fireEvent.input(firstInput, { target: { value: inputFirstValue } });
    expect((firstInput as HTMLInputElement).value).toBe(inputFirstValue);

    fireEvent.input(secondInput, { target: { value: inputSecondValue } });
    expect((secondInput as HTMLInputElement).value).toBe(inputSecondValue);
  });
});
