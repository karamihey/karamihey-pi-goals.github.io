// types
import { FormSettingsType, FormControlValueTypes, FormControlValidationParams } from 'types/forms';
import { InputValueTypes } from 'types/forms/input';
// components
import Input from 'components/shared/Input';

export const validateRequired = (value: string) => {
  if (value && value.length !== 0) {
    return false;
  }

  return 'should not be blank';
};

export const validateMinLength = (value: string, minLength: number) => {
  if (value && value.length >= minLength) {
    return false;
  }

  return `must be at least ${minLength} characters long`;
};

export const validateMaxLength = (value: string, maxLength: number) => {
  if (value && value.length <= maxLength) {
    return false;
  }

  return `must be no more than ${maxLength} characters long`;
};

export const validateInput = (val: InputValueTypes, validationRules: FormControlValidationParams = {}) => {
  const {
    isRequired, minLength, maxLength, handleValidationCallback,
  } = validationRules;

  let formattedValue = (val && val.toString()) || '';
  formattedValue = formattedValue.trim();

  let validationResult: boolean | string = '';

  if (isRequired) {
    validationResult = validateRequired(formattedValue);
  }

  if (!validationResult && minLength) {
    validationResult = validateMinLength(formattedValue, minLength);
  }

  if (!validationResult && maxLength) {
    validationResult = validateMaxLength(formattedValue, maxLength);
  }

  if (!validationResult && handleValidationCallback && formattedValue) {
    validationResult = handleValidationCallback(formattedValue);
  }

  return validationResult;
};

export const validateForm = (values: { [key: string]: FormControlValueTypes }, formSettings: FormSettingsType) => {
  const errors: { [key: string]: string | boolean } = {};

  Object.keys(values).forEach(key => {
    const fieldSettings = formSettings.find(elem => elem.id === key);
    const elem = values[key];

    const {
      id,
      component,
      isRequired,
      minLength,
      maxLength,
      handleValidationCallback,
    } = fieldSettings!;

    const validationParams = {
      isRequired,
      minLength,
      maxLength,
      handleValidationCallback,
    };

    let validationCallback;

    switch (component) {
      case Input:
        validationCallback = validateInput;
        break;
      default:
    }

    if (validationCallback) {
      errors[id] = validationCallback(elem, validationParams);
    }
  });

  return errors;
};
