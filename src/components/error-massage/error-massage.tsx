import { useAppSelector } from '../../hooks';
import { getErrorMessage } from '../../store/error-process/selectors';
import './error-massage.css';

export default function ErrorMessage(): JSX.Element {
  const errorMessage = useAppSelector(getErrorMessage);

  if (errorMessage) {
    return (
      <div className="error" data-testid="error-massage-visible">
        {errorMessage}
      </div>
    );
  }

  return <div data-testid="error-massage-invisible"></div>;
}
