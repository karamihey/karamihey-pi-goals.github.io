// types
import { CallbackFunctionWithParams } from 'types';
// utils
import { validateEmail, validatePassword } from 'utils/validation';

export const EMAIL_INPUT_SETTINGS: { [key: string]: string | number | CallbackFunctionWithParams } = {
  type: 'email',
  handleValidationCallback: validateEmail,
};

export const PASSWORD_INPUT_SETTINGS: { [key: string]: string | number | CallbackFunctionWithParams } = {
  type: 'password',
  maxLength: 16,
  minLength: 8,
  handleValidationCallback: validatePassword,
};
