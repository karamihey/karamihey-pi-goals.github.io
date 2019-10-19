// types
import { FormControlValidationParams, FormControlValidationResultTypes } from 'types/forms';
// constants
import { VALIDATION_ERRORS } from 'constants/errors';
// utils
import { convertToString } from 'utils/converters';

const regExps = {
  email: /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
  password: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*[A-Z])(?=.*[.!@#$%^&*()_+=-]).+$/,
};

export const validateRequired = (value?: string) => {
  if (value && value.length !== 0) {
    return false;
  }

  return VALIDATION_ERRORS.required;
};

export const validateMinLength = (value: string, minLength: number) => {
  if (value.length >= minLength) {
    return false;
  }

  return `${VALIDATION_ERRORS.minLength} ${minLength} ${VALIDATION_ERRORS.charactersLong}`;
};

export const validateMaxLength = (value: string, maxLength: number) => {
  if (value.length <= maxLength) {
    return false;
  }

  return `${VALIDATION_ERRORS.maxLength} ${maxLength} ${VALIDATION_ERRORS.charactersLong}`;
};

export const validateEmail = (email?: string) => {
  if (email && regExps.email.test(email)) {
    return false;
  }

  return VALIDATION_ERRORS.email;
};

export const validatePassword = (password?: string) => {
  if (!!password && regExps.password.test(password)) {
    return false;
  }

  return VALIDATION_ERRORS.password;
};

export const validatePasswordConfirm = (password?: string, confirmPassword?: string) => {
  if (password === confirmPassword) {
    return false;
  }

  return VALIDATION_ERRORS.confirmPassword;
};

export const validateInput = (value: string | undefined, {
  isRequired, minLength, maxLength, handleValidationCallback,
}: FormControlValidationParams) => {
  let formattedValue = convertToString(value);
  formattedValue = formattedValue.trim();

  let validationResult: FormControlValidationResultTypes = '';

  if (isRequired) {
    validationResult = validateRequired(formattedValue);
  }

  if (!validationResult && minLength) {
    validationResult = validateMinLength(formattedValue, minLength);
  }

  if (!validationResult && maxLength) {
    validationResult = validateMaxLength(formattedValue, maxLength);
  }

  if (!validationResult && handleValidationCallback) {
    validationResult = handleValidationCallback(formattedValue);
  }

  return validationResult;
};
