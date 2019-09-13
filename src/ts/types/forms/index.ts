// types
import { InputComponentProps, InputValueTypes } from 'types/forms/input';
// components
import Input from 'components/shared/Input';

export type CallbackParamsTypes = string | number | null;

export type FormControlValueTypes = InputValueTypes;

export interface FormControlValidationParams {
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  handleValidationCallback?: (value: CallbackParamsTypes) => any;
}

export interface FormControlProps extends FormControlValidationParams {
  id: string;
  label: string;
  name: string;
  errorText?: string;
  handleBlurCallback?: (id: string) => any;
  handleChangeCallback?: (id: string, value: CallbackParamsTypes) => any;
  shouldErrorsBeVisible: boolean;
}

export interface FormControlSettings extends InputComponentProps {
  component: typeof Input;
}

export type FormSettingsType = FormControlSettings[];
