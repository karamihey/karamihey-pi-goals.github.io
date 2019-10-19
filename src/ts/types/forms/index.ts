// types
import { InputValueTypes } from 'types/forms/input';

type CallbackParamsValueTypes = string;

export type FormControlValueTypes = InputValueTypes;

export type FormControlValidationResultTypes = boolean | string;

export type FormValuesType = { [key: string]: FormControlValueTypes };

export type FormErrorsType = { [key: string]: FormControlValidationResultTypes };

export interface FormControlValidationParams {
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  handleValidationCallback?: (value: CallbackParamsValueTypes) => any;
}

export interface FormControlProps extends FormControlValidationParams {
  id: string;
  label: string;
  name: string;
  errorText?: FormControlValidationResultTypes;
  handleValidation: (id: string) => any;
  handleBlurCallback?: (id: string) => any;
  handleChangeCallback?: (id: string, value: CallbackParamsValueTypes) => any;
}

export type FormControlSettingsType = FormControlValidationParams;

export type FormSettingsType = { [key: string]: FormControlSettingsType };
