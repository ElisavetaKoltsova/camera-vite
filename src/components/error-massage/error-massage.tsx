import { useAppSelector } from '../../hooks';
import { getErrorMessage } from '../../store/error-peocess/selectors';
import './error-massage.css';

export default function ErrorMessage(): JSX.Element {
  const errorMessage = useAppSelector(getErrorMessage);

  if (errorMessage) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    );
  }

  return <div></div>;
}
