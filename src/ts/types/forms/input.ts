// types
import { FormControlProps } from 'types/forms';

type InputTypes = 'text' | 'email' | 'password';
export type InputValueTypes = string | number | null;

export interface InputComponentProps extends FormControlProps {
  initialValue?: InputValueTypes;
  type?: InputTypes;
}

export interface InputComponentState {
  isValid: boolean | string;
  errorMessage: boolean | string;
}
