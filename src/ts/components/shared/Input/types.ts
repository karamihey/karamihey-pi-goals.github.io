type InputTypes = 'text' | 'email' | 'password';
type CallbackTypes = string | number | null;

export interface IProps {
  id: string;
  label: string;
  name: string;
  initialValue?: string | number | null;
  type?: InputTypes;
  minLength?: number;
  maxLength?: number;
  isRequired?: boolean;
  errorText?: string;
  handleChangeCallback?: (value: CallbackTypes) => any;
  handleValidationCallback?: (value: CallbackTypes) => any;
}

export interface IState {
  isValid: boolean;
  errorMessage: string;
}
