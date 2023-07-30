import { InputError } from 'components/Game/enums/input-error.enum';
import { Dispatch, SetStateAction, useState } from 'react';

export function useInputError(): {
  error: InputError;
  setError: Dispatch<SetStateAction<InputError>>;
  resetError: () => void;
} {
  const [error, setError] = useState(InputError.NONE);

  return {
    error,
    setError,
    resetError: () => setError(InputError.NONE),
  };
}
