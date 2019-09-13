// constants
import { VALIDATION_REGEXPS, VALIDATION_ERRORS } from 'constants/validation';

export const validateRequired = (value: string) => {
  if (value && value.length !== 0) {
    return false;
  }

  return VALIDATION_ERRORS.required;
};

export const validateMinLength = (value: string, minLength: number) => {
  if (value && value.length >= minLength) {
    return false;
  }

  return `${VALIDATION_ERRORS.minLength} ${minLength} ${VALIDATION_ERRORS.charactersLong}`;
};

export const validateMaxLength = (value: string, maxLength: number) => {
  if (value && value.length <= maxLength) {
    return false;
  }

  return `${VALIDATION_ERRORS.maxLength} ${maxLength} ${VALIDATION_ERRORS.charactersLong}`;
};

export const validateEmail = (email: string) => {
  if (VALIDATION_REGEXPS.email.test(email)) {
    return false;
  }

  return VALIDATION_ERRORS.email;
};

export const validatePassword = (password: string) => {
  if (VALIDATION_REGEXPS.password.test(password)) {
    return false;
  }

  return VALIDATION_ERRORS.password;
};
