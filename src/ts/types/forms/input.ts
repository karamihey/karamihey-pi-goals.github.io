// libraries
import { RefObject } from 'react';
// types
import { CallbackTypes } from 'types/forms';
// components
import Input from 'components/shared/Input';

type InputTypes = 'text' | 'email' | 'password';
export type InputValueTypes = string | number;

export type InputComponentType = RefObject<typeof Input>;

export interface InputComponentProps {
  ref?: InputComponentType;
  id: string;
  label: string;
  name: string;
  initialValue?: InputValueTypes;
  type?: InputTypes;
  minLength?: number;
  maxLength?: number;
  isRequired?: boolean;
  errorText?: string;
  handleChangeCallback?: (value: CallbackTypes) => any;
  handleValidationCallback?: (value: CallbackTypes) => any;
}

export interface InputComponentState {
  isValid: boolean | string;
  errorMessage: boolean | string;
}
